# SoundSphere

Plataforma web para descoberta musical com interface moderna, busca em tempo real e navegação por faixas, artistas, albuns e playlists.

## Acesso online

- Site oficial: https://sound-sphere-omega.vercel.app/

## Sobre o projeto

O SoundSphere foi desenvolvido para oferecer uma experiencia fluida de exploracao musical. O usuario pode acessar conteudos populares, buscar novos artistas e montar sua jornada de audio com recursos de player e favoritos.

### Principais funcionalidades

- Tela inicial de autenticacao
- Home com conteudos em alta (charts)
- Busca por musicas, artistas, albuns e playlists
- Paginas dedicadas para artistas, albuns, playlists e tracks
- Sistema de favoritos com persistencia local
- Fila de reproducao e player de musica
- Alternancia de tema (claro/escuro)
- Interface responsiva para desktop e mobile

## Tecnologias utilizadas

- Next.js 16
- React 19
- TypeScript
- SWR
- NextAuth (estrutura pronta para OAuth)
- IndexedDB (persistencia local)
- ESLint + Vitest

## Estrutura principal

Arquivos e pastas mais importantes:

- src/app: rotas e paginas da aplicacao
- src/components: componentes reutilizaveis de UI e player
- src/hooks: hooks de dados, Deezer, favoritos e IndexedDB
- src/lib: servicos, DTOs, enums e infraestrutura
- public/assets: recursos estaticos de marca e imagem

## Como instalar e rodar localmente

### 1. Pre-requisitos

- Node.js 20+
- npm 10+

### 2. Clonar o repositorio

```bash
git clone https://github.com/mateusw12/sound-sphere.git
cd sound-sphere
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variaveis de ambiente

Crie um arquivo .env na raiz com base no .env.example:

```env
AUTH_SECRET=your-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Observacao: as variaveis de OAuth ficam prontas para quando o login social estiver habilitado no fluxo em uso.

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Depois, abra no navegador:

- http://localhost:3000

## Scripts disponiveis

- npm run dev: inicia o ambiente de desenvolvimento
- npm run build: gera build de producao
- npm run start: executa a build em modo producao
- npm run lint: analisa padrao e qualidade de codigo
- npm run test: executa os testes com Vitest
- npm run test:watch: executa testes em modo observacao

## Qualidade e testes

Para validar o projeto antes de publicar:

```bash
npm run lint
npm run test
```

## Deploy

Aplicacao publicada na Vercel:

- https://sound-sphere-omega.vercel.app/

## Licenca

Este projeto esta sob a licenca definida no arquivo LICENSE.
