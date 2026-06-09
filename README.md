# ⚡ My Hype — Portal de Tendências

> **Slogan:** Seu portal, sua vibe, seu hype.

Portal estruturado para alto acesso e demanda de dados, reunindo tendências de
música, games, cinema & séries, moda & street, tecnologia e creators — com
sistema de matrícula, cadastro de usuários e login.

## 🚀 Tecnologias

- **React 18** + **TypeScript** (componentes e tipagem)
- **JavaScript** puro (máscaras e validações reutilizáveis)
- **Vite** (servidor de desenvolvimento e build)
- **HTML5** semântico e **CSS3** com design system completo

## 📁 Estrutura de pastas

```
Projeto-MyHype/
├── html5/          → index.html (página principal)
├── css3/           → style.css (design system: cores, tipografia, gradientes)
├── typescript/     → código React + TypeScript
│   ├── main.tsx        → ponto de entrada
│   ├── App.tsx         → composição do portal
│   ├── types.ts        → tipos compartilhados
│   ├── data/           → conteúdo (categorias, destaques, slogan)
│   └── components/     → Header, Hero, Categories, Trending,
│                         EnrollSection, EnrollmentForm, LoginModal, Footer, Logo
├── javascript/     → masks.js (máscaras de CPF, telefone, CEP + validações)
├── assets/         → logo-myhype.png, favicon.svg (arquivos públicos)
├── vite.config.ts  → configuração do servidor e aliases
└── package.json    → dependências e scripts
```

## ▶️ Como rodar (link de visualização)

```bash
npm install
npm run dev
```

O servidor sobe com acesso local **e** na rede (host habilitado):

- **Localhost:** http://localhost:5173
- **Rede local (IP):** exibido no terminal como `Network: http://SEU-IP:5173`
  — qualquer dispositivo na mesma rede (celular, outro PC) consegue visualizar
  o site antes mesmo de ser publicado.

Para gerar a versão de produção: `npm run build` (saída em `dist/`)
e pré-visualizar com `npm run preview`.

## 🎨 Identidade visual

| Elemento | Valor | Sensibilidade / propósito |
| --- | --- | --- |
| Violeta `#7c3aed` | Cor primária | Criatividade, modernidade, cultura digital |
| Magenta `#ec4899` | Cor secundária | Energia, juventude, paixão |
| Âmbar `#f59e0b` | Acento | Destaque, calor, urgência (o "hype") |
| Ciano `#22d3ee` | Apoio | Tecnologia, frescor, interatividade |
| Fundo `#0f0b1e` | Base escura | Profundidade, foco no conteúdo |

- **Gradiente principal (degradê hype):** `linear-gradient(135deg, #7c3aed → #ec4899 → #f59e0b)`
- **Tipografia de títulos:** Sora (geométrica, forte, contemporânea)
- **Tipografia de textos e legendas:** Inter (alta legibilidade em telas)
- **Escala tipográfica:** 12 / 14 / 16 / 18 / 24 / 32 / 44 / 60 px
- **Logomarca:** raio em degradê — energia instantânea da tendência

## 📝 Funcionalidades

- **Formulário de matrícula completo:** nome, nascimento, CPF, e-mail,
  telefone, CEP, cidade, estado, interesse principal, senha + confirmação e
  aceite de termos — com máscaras automáticas, validação de CPF pelo algoritmo
  oficial, medidor de força de senha e geração de número de matrícula
  (`MH-ANO-XXXXXX`).
- **Login:** e-mail + senha com feedback de erro/sucesso e sessão ativa no
  cabeçalho (os cadastros ficam no `localStorage` para demonstração — em
  produção, conectar a uma API/back-end).
- **Portal:** hero com slogan e estatísticas, 6 categorias, grade de destaques
  com títulos, textos e legendas, e rodapé institucional.
