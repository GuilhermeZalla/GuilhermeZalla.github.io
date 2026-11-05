// Years and screenshots were supplied by the author; project facts were supplied or verified.
export const projects = [
  {
    id: 'saldoa', name: 'Saldoa', year: 2025, yearLabel: { en: '2025 web · 2026 app', pt: 'Web 2025 · App 2026' }, featured: true,
    type: ['app'],
    languages: ['pt'],
    stack: ['Laravel', 'Sanctum', 'React', 'Inertia', 'TypeScript', 'Tailwind CSS', 'Expo', 'React Native'],
    repository: 'https://github.com/GuilhermeZalla/react-saldoa-app',
    website: 'https://saldoa-app.duckdns.org',
    androidApp: 'https://github.com/GuilhermeZalla/react-saldoa-app/releases/tag/mobile-v1.0.0-preview.1',
    demo: null,
    image: '/projects/saldoa-home.svg', preview: '/projects/saldoa-portfolio-cover.svg',
    category: { en: 'Personal finance', pt: 'Finanças pessoais' },
    description: {
      en: 'A personal finance app for web and Android. Track income and expenses, organize them by category, set monthly limits and review your finances on the dashboard. The Android app is built with React Native and Expo and shares the Laravel backend.',
      pt: 'Um aplicativo de finanças pessoais para web e Android. Acompanhe receitas e despesas, organize por categoria, defina limites mensais e veja um resumo das finanças no dashboard. O app Android é feito com React Native e Expo e compartilha o backend Laravel.',
    },
  },
  {
    id: 'pixelrank', name: 'PixelRank', year: 2026, featured: true,
    type: ['entertainment'],
    languages: ['pt', 'en'],
    stack: ['Laravel', 'Blade', 'Tailwind CSS', 'Alpine.js', 'MySQL/SQLite', 'Pest'],
    repository: 'https://github.com/GuilhermeZalla/pixel-rank-app', demo: null,
    image: '/projects/pixelrank-home.webp', preview: '/projects/pixelrank-preview.webp',
    category: { en: 'Game reviews', pt: 'Avaliações de jogos' },
    description: {
      en: 'A community platform for game reviews, inspired by Letterboxd. Features scored reviews, threaded comments with likes, notifications and a user dashboard. Integrates with the IGDB API with caching and graceful failure handling, uses policy-based authorization, supports Portuguese and English, and is covered by automated tests (Pest).',
      pt: 'Uma plataforma de avaliações de jogos em comunidade, inspirada no Letterboxd. Inclui avaliações com notas, comentários encadeados com curtidas, notificações e painel do usuário. Integra a API do IGDB com cache e tratamento de falhas, usa autorização por policies, oferece português e inglês e possui testes automatizados com Pest.',
    },
  },
  {
    id: 'sneakers', name: 'Sneakers Store', year: 2024, featured: false,
    type: ['ecommerce'],
    languages: ['pt', 'en'],
    stack: ['Laravel', 'React', 'TypeScript', 'React Router', 'Sanctum', 'Pest'],
    repository: 'https://github.com/GuilhermeZalla/sneakers-store', demo: null,
    image: '/projects/sneakers-home.webp', preview: '/projects/sneakers-preview.webp',
    category: { en: 'E-commerce', pt: 'E-commerce' },
    description: {
      en: 'An online store with a Laravel API and a React interface. Includes a product catalog, favorites, cart, addresses and order history, with a simulated checkout that does not charge real money. Supports Portuguese/BRL and English/USD.',
      pt: 'Uma loja online com API Laravel e interface React. Reúne catálogo, favoritos, carrinho, endereços e histórico de pedidos, com checkout simulado, sem cobrança real. Oferece português/BRL e inglês/USD.',
    },
  },
  {
    id: 'movieslib', name: 'MoviesLib', year: 2026, featured: false,
    type: ['spa', 'entertainment'],
    languages: ['pt', 'en'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zod', 'TMDB API'],
    repository: 'https://github.com/GuilhermeZalla/react-movieslib', demo: null,
    image: '/projects/movieslib-home.webp', preview: '/projects/movieslib-preview.webp',
    category: { en: 'Movie discovery', pt: 'Descoberta de filmes' },
    description: {
      en: 'A movie discovery app with search, filters, trailers, cast details and filmographies. Uses TMDB data through a server-side proxy, with Portuguese and English interfaces. A watchlist is saved in the browser without an account.',
      pt: 'Um aplicativo para descobrir filmes, com busca, filtros, trailers, elenco e filmografias. Usa dados do TMDB por um proxy no servidor, com interface em português e inglês. A lista de filmes fica salva no navegador, sem cadastro.',
    },
  },
];
