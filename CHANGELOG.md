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

- Globo do Hero transformado em **link externo** (nova aba, `noopener`),
  com feedback visual de hover e foco acessível por teclado
- URL de destino centralizada em `typescript/data/content.ts` (`GLOBE_LINK`)

## [1.1.0] — 2026-06-10

### Fase 8 — Portfólio & Parcerias em três blocos

- Seção **Portfólio & Parcerias** reorganizada em **três blocos individuais**,
  cada um com cor de identidade própria na borda, ícone com glow e cabeçalho:
  💎 *Aplicações Sofisticadas* (violeta), 🎨 *Layout Marcante* (magenta) e
  ⚙️ *Recursos Tecnológicos* (ciano)
- Cada projeto do carrossel classificado em um dos três grupos
  (`PORTFOLIO_GROUPS` em `typescript/data/content.ts`)

### Fase 9 — Conteúdo do formulário de matrícula

- **Preenchimento de conteúdo** do formulário: títulos, textos e legendas
  ajustados em `EnrollSection` e `EnrollmentForm`, com benefícios da
  comunidade (feed personalizado, alertas de hype, comunidade ativa e
  número de matrícula exclusivo)

### Fase 10 — Correção do servidor de desenvolvimento

- **Fix no `vite.config.ts`**: o `index.html` (raiz `html5/`) importa
  `../typescript/main.tsx`, fora da raiz do Vite; a URL colapsava para
  `/typescript/main.tsx` e a página ficava em branco. Plugin dev-only
  reescreve o entry para o caminho absoluto `/@fs/`

### Fase 11 — Centralização dos títulos de seção

- Cabeçalhos das seções **Destaques**, **Categorias** e **Portfólio &
  Parcerias** (tag, título e subtítulo) centralizados ao meio da página
- Cabeçalhos dos três blocos do portfólio também centralizados
- Exceção preservada: na **Matrícula** o texto segue alinhado à esquerda,
  ao lado do formulário

## [1.2.0] — 2026-06-10

### Fase 12 — Matrícula no topo com hero integrado

- Seção de **matrícula movida para o topo** da página, acima do carrossel
  e do portfólio
- Conteúdo do **Hero integrado à coluna esquerda** da matrícula: slogan,
  título "Tudo que está bombando", botões de ação e estatísticas (120k+ /
  6 / 24/7), com o formulário ocupando toda a altura da coluna direita
- Componente `Hero.tsx` removido — conteúdo consolidado em `EnrollSection`
- **Refinamentos visuais**: linha divisória acima do slogan removida e
  globo retirado do bloco integrado (mantido apenas no cabeçalho)
