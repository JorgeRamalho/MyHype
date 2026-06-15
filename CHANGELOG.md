# Changelog — My Hype

Registro histórico de todas as alterações do projeto, em ordem cronológica.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [1.0.0] — 2026-06-09

### Fase 1 — Fundação do projeto

- Estrutura criada com **Vite + React 18 + TypeScript**, organizada por pastas
  de tecnologia: `html5/` (index.html), `css3/` (style.css), `typescript/`
  (componentes e dados), `javascript/` (utilitários puros), `assets/` (imagens)
- **Design system** completo em CSS3: paleta (violeta `#7c3aed`, magenta
  `#ec4899`, âmbar `#f59e0b`, ciano `#22d3ee`, fundo escuro), gradientes,
  tipografia Sora + Inter com escala de 12–60 px
- **Identidade da marca**: slogan "Seu portal, sua vibe, seu hype.", logomarca
  inicial (raio em degradê) e favicon SVG
- **Portal completo**: Hero com estatísticas, 6 categorias de conteúdo, grade
  de destaques (títulos, textos e legendas), rodapé institucional
- **Formulário de matrícula** com todos os dados básicos: nome, nascimento,
  CPF (validação oficial), e-mail, telefone, CEP, cidade, estado, interesse,
  senha com medidor de força e aceite de termos; matrícula gerada no formato
  `MH-ANO-XXXXXX`
- **Login** com e-mail + senha, sessão no cabeçalho e persistência local
- Servidor de desenvolvimento com acesso por localhost e IP de rede

### Fase 2 — Logomarca do globo

- Adicionada a imagem do globo terrestre "My Hype" como figura do cabeçalho
  e favicon
- **Tratamento de imagem** via script PowerShell (`tools/process-logo.ps1`):
  remoção do fundo branco por flood fill, suavização de contorno e geração
  de favicons 64/32 px com interpolação bicúbica

### Fase 3 — Publicação para o cliente

- Build de produção gerado e servido via `vite preview`
- Site publicado na web por **Cloudflare Tunnel** (`npm run tunnel`),
  com link público HTTPS acessível de qualquer lugar
- Domínio `.trycloudflare.com` liberado no `vite.config.ts`

### Fase 4 — Evolução do Hero

- Imagem do raio substituída pelo **globo** no lado direito do Hero,
  com halo em degradê e animação de flutuação
- **Retoque de qualidade**: globo recriado em alta resolução (1024 px) a
  partir do original, recorte quadrado central, otimização para 512 px e
  regeneração dos favicons sem distorção

### Fase 5 — Refinamentos do cabeçalho

- Anel da logomarca alterado de degradê (rosa) para **círculo azul** (`#2563eb`)
- Nome "My Hype" do cabeçalho alterado de degradê para **branco puro**

### Fase 6 — Tema espacial em alta performance

- **Fundo de espaço profundo no site inteiro**: camada fixa de tela cheia
  com nebulosas e 3 camadas de estrelas em parallax (efeito 3D), animadas
  apenas com `transform`/`opacity` (GPU) e respeito a `prefers-reduced-motion`
- Rodapé translúcido para integração com o céu estrelado

### Fase 7 — Interatividade do globo

- Globo do Hero transformado em **link** com feedback visual de hover e foco
  acessível por teclado; URL centralizada em `GLOBE_LINK`

## [1.1.0] — 2026-06-10

### Fase 8 — Portfólio & Parcerias em três blocos

- Seção reorganizada em três blocos individuais: *Aplicações Sofisticadas*,
  *Layout Marcante* e *Recursos Tecnológicos*
- Projetos classificados em `PORTFOLIO_GROUPS`

### Fase 9 — Conteúdo do formulário de matrícula

- Títulos, textos e legendas ajustados em `EnrollSection` e `EnrollmentForm`

### Fase 10 — Correção do servidor de desenvolvimento

- Fix no `vite.config.ts` para `main.tsx` fora da raiz do Vite (plugin `/@fs/`)

### Fase 11 — Centralização dos títulos de seção

- Cabeçalhos de Destaques, Categorias e Portfólio centralizados

> **Nota:** versões 1.1.0 e 1.2.0 foram revertidas da `main` no commit `6461870`
> a pedido do usuário; o histórico permanece registrado nesta branch.

## [1.2.0] — 2026-06-10

### Fase 12 — Matrícula no topo com hero integrado

- Matrícula movida para o topo; hero integrado na coluna esquerda do formulário
- Componente `Hero.tsx` removido (conteúdo em `EnrollSection`)
- Refinamentos: sem linha divisória e sem globo no bloco integrado

## [1.3.0] — 2026-06-10

### Fase 13 — Expansão do carrossel e portfólio

- **6 novos projetos** adicionados: Point Celular, Auto Layout Lab, MyNotebook,
  Game Book, ArtMusic e Distribar (`carousel-10` a `carousel-15`)
- Dados separados em `PORTFOLIO_SLIDES` (9 parcerias) e `CAROUSEL_ONLY_SLIDES`
  (6 novos); carrossel com 15 slides no total
- Portfólio em **grid unificado** com Distribar em **posição aleatória** a cada
  carregamento

### Fase 14 — Globo do Hero → Portfólio interno

- `GLOBE_LINK` alterado de Google para `#portfolio` (navegação interna)
- Removidos `target="_blank"` e `rel="noopener"` do link do globo

### Fase 15 — Correção do dev server (reaplicada)

- Plugin dev-only no `vite.config.ts` reaplicado após revert da sessão anterior

### Fase 16 — Logomarca responsiva no header

- Variáveis CSS `--brand-logo-size`, `--brand-name-size` e `--brand-ring`
- `object-fit: contain` no globo; escala proporcional em tablet e mobile
- Header em 2 colunas quando o menu some (≤ 900px)

### Fase 17 — Texto da matrícula centralizado

- Coluna `enroll-info` centralizada na metade esquerda (`justify-self: center`)
- Grid da matrícula equilibrado em `1fr / 1fr`

### Fase 18 — Simplificação do cabeçalho

- **Links de navegação removidos**: Início, Categorias, Destaques, Portfólio e Matrícula
- Header focado apenas na marca e ações do usuário (Entrar e Matricule-se)
- **Arquivos starfield adicionados**: demo de fundo estrelado em HTML5 puro
  (`html5/starfield.css`, `html5/starfield.html`, `html5/starfield.js`)

## [1.4.0] — 2026-06-11

### Fase 19 — Validação HTML5 e Live Server

- Correção de tags void (`<meta>`, `<link>`) em HTML5 nos arquivos do projeto
- **`html5/index.html` acessível pelo Live Server**: carrega bundle de `dist/` via
  `live-manifest.json` gerado no build; script `npm run live`
- Utilitário **`publicAsset()`** para resolver imagens no Live Server (`../dist/`)
  e no Vite dev/build (`/`)

### Fase 20 — Portfólio em fieldsets nomeados

- Seção reorganizada em **quatro grupos** com legendas: *Design Inovador*,
  *Case de Sucesso*, *Office Business* e *Hi-Tech* (3 cards cada)
- Removida a inserção aleatória da Distribar no grid unificado

### Fase 21 — Favicon com globo terrestre

- Favicon atualizado para o **globo My Hype** (SVG e PNG 32/64 px)
- Removida moldura rosa do `favicon-32.png`; script `tools/crop-logo.ps1` ajustado
- Asset `logo-globe-512.png` em alta resolução

### Fase 22 — Carrossel com links externos

- Slides clicáveis abrem o **site do parceiro** em nova aba (`href`, legenda
  “Visitar site →”)
- URLs públicas dos parceiros (Vercel e Netlify): Banco Yona, Padocafé,
  Colégio Hiperativo, Saúde Mais, Up Service Tech, Mundo News, Baden Power,
  Auto Layout Lab, MyNotebook, Game Book e Mercadolar

### Fase 23 — Curadoria do carrossel

- **Removidos** do carrossel e portfólio: BetShow, Super Car, Point Celular,
  ArtMusic e Distribar (dados e imagens `carousel-6`, `9`, `10`, `14`, `15`)
- **Adicionado** Mercadolar (`carousel-17.png`)
- Auto Layout Lab restaurado com imagem e link público
- Tentativa Locar+ revertida por solicitação do usuário
- CategoryShowcase (fieldset entre Categorias e Destaques) criado e revertido

## [1.6.0] — 2026-06-15

### Fase 24 — Novos parceiros no carrossel e portfólio

- **ArtMusic** (`carousel-20.png`) — instrumentos premium; link
  [jorgeramalho.github.io/Artmusic](https://jorgeramalho.github.io/Artmusic/)
- **Auto Service Mecânica** (`carousel-21.png`) — oficina com cadastro digital;
  slide no carrossel aguardando URL pública na Vercel
- **Locar+** (`carousel-19.png`) — locação de veículos; link
  [locar-three.vercel.app](https://locar-three.vercel.app/)
- Novo fieldset no portfólio: **Mobilidade & Lifestyle** (5 grupos de 3 cards)
