# Recorta a logo tratada para o quadrado central (globo centralizado)
# e regenera os favicons sem distorção de proporção.

param(
    [Parameter(Mandatory = $true)][string]$AssetsDir
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$logoPath = Join-Path $AssetsDir 'logo-globe.png'
$src = [System.Drawing.Bitmap]::new($logoPath)

$side = [Math]::Min($src.Width, $src.Height)
$x = [int](($src.Width - $side) / 2)
$y = [int](($src.Height - $side) / 2)

$cropped = $src.Clone([System.Drawing.Rectangle]::new($x, $y, $side, $side), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$src.Dispose()

$cropped.Save((Join-Path $AssetsDir 'logo-globe-sq.png'), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Quadrado central salvo: logo-globe-sq.png ($side x $side)"

function Save-Resized($size, $name) {
    $out = [System.Drawing.Bitmap]::new($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($cropped, [System.Drawing.Rectangle]::new(0, 0, $size, $size))
    $g.Dispose()
    $path = Join-Path $AssetsDir $name
    $out.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $out.Dispose()
    Write-Host "Gerado: $path ($size x $size)"
}

Save-Resized 512 'logo-globe-512.png'
Save-Resized 64 'favicon.png'
Save-Resized 32 'favicon-32.png'

$cropped.Dispose()

# Substitui a logo principal pelo recorte quadrado
Move-Item -Force (Join-Path $AssetsDir 'logo-globe-sq.png') $logoPath
Write-Host "logo-globe.png atualizada para o recorte quadrado ($side x $side)"
