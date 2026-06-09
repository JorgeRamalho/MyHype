# Tratamento da logomarca My Hype (globo):
# 1. Remove o fundo branco (flood fill a partir das bordas) -> PNG transparente
# 2. Suaviza o contorno (alpha parcial em pixels de borda quase brancos)
# 3. Gera favicon 64x64 e 32x32 com redimensionamento de alta qualidade

param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$OutDir
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::new($Source)
$bmp = $src.Clone([System.Drawing.Rectangle]::new(0, 0, $src.Width, $src.Height), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$src.Dispose()

$w = $bmp.Width
$h = $bmp.Height
$threshold = 232

# Flood fill a partir das bordas; coordenada codificada como y * w + x
$visited = New-Object 'bool[]' ($w * $h)
$queue = [System.Collections.Generic.Queue[int]]::new()

for ($x = 0; $x -lt $w; $x++) {
    $queue.Enqueue($x)
    $queue.Enqueue(($h - 1) * $w + $x)
}
for ($y = 0; $y -lt $h; $y++) {
    $queue.Enqueue($y * $w)
    $queue.Enqueue($y * $w + ($w - 1))
}

$transparent = [System.Drawing.Color]::FromArgb(0, 255, 255, 255)

while ($queue.Count -gt 0) {
    $idx = $queue.Dequeue()
    if ($visited[$idx]) { continue }
    $visited[$idx] = $true

    $x = $idx % $w
    $y = [int][Math]::Floor($idx / $w)

    $c = $bmp.GetPixel($x, $y)
    if ($c.A -eq 0) { continue }
    if ($c.R -ge $threshold -and $c.G -ge $threshold -and $c.B -ge $threshold) {
        $bmp.SetPixel($x, $y, $transparent)
        if ($x + 1 -lt $w) { $queue.Enqueue($idx + 1) }
        if ($x - 1 -ge 0)  { $queue.Enqueue($idx - 1) }
        if ($y + 1 -lt $h) { $queue.Enqueue($idx + $w) }
        if ($y - 1 -ge 0)  { $queue.Enqueue($idx - $w) }
    }
}

# Suaviza o halo: pixels claros encostados em área transparente recebem alpha parcial
for ($y = 1; $y -lt $h - 1; $y++) {
    for ($x = 1; $x -lt $w - 1; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -eq 0) { continue }
        $brightness = ($c.R + $c.G + $c.B) / 3
        if ($brightness -lt 200) { continue }
        $nearTransparent =
            ($bmp.GetPixel($x + 1, $y).A -eq 0) -or
            ($bmp.GetPixel($x - 1, $y).A -eq 0) -or
            ($bmp.GetPixel($x, $y + 1).A -eq 0) -or
            ($bmp.GetPixel($x, $y - 1).A -eq 0)
        if ($nearTransparent) {
            $alpha = [int][Math]::Max(0, 255 - ($brightness - 180) * 3)
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        }
    }
}

$logoPath = Join-Path $OutDir 'logo-globe.png'
$bmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Logo tratada salva em: $logoPath ($w x $h)"

function Save-Resized($size, $name) {
    $out = [System.Drawing.Bitmap]::new($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($bmp, [System.Drawing.Rectangle]::new(0, 0, $size, $size))
    $g.Dispose()
    $path = Join-Path $OutDir $name
    $out.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $out.Dispose()
    Write-Host "Gerado: $path ($size x $size)"
}

Save-Resized 64 'favicon.png'
Save-Resized 32 'favicon-32.png'

# Verificação: alpha dos cantos deve ser 0 (transparente) e centro 255 (opaco)
$check = [System.Drawing.Bitmap]::new($logoPath)
Write-Host ("Verificacao alpha -> canto(2,2)={0} canto({1},2)={2} canto(2,{3})={4} centro={5}" -f `
    $check.GetPixel(2, 2).A, ($w - 3), $check.GetPixel($w - 3, 2).A, ($h - 3), `
    $check.GetPixel(2, $h - 3).A, $check.GetPixel([int]($w / 2), [int]($h / 2)).A)
$check.Dispose()

$bmp.Dispose()
