// Technical accounts grounded in each repository's README, not invented personal anecdotes.
// Evidence links and remaining content questions are recorded in docs/CASE_STUDIES.md.
export const caseStudies = {
  saldoa: {
    subtitle: { en: 'A clearer picture of personal finances.', pt: 'Uma visão mais clara das finanças pessoais.' },
    sections: [
      { id: 'problem', title: { en: 'Keeping track of everyday finances.', pt: 'Acompanhar as finanças do dia a dia.' }, body: {
        en: 'Income, expenses and category limits are easier to follow when they share a single overview. Saldoa brings these records together with a dashboard, as a personal finance portfolio project.',
        pt: 'Receitas, despesas e limites por categoria ficam mais fáceis de acompanhar em uma visão conjunta. O Saldoa reúne esses registros em um dashboard, como projeto de portfólio de finanças pessoais.',
      } },
      { id: 'decisions', title: { en: 'Laravel routes, React pages.', pt: 'Rotas Laravel, páginas React.' }, body: {
        en: 'Laravel prepares page data and handles requests. Inertia connects those routes to React pages, while shared components keep the interface consistent. The repository separates input validation into Form Requests and access rules into Policies.',
        pt: 'O Laravel prepara os dados das páginas e trata as requisições. O Inertia conecta essas rotas às páginas React, enquanto componentes compartilhados mantêm a interface consistente. O repositório separa a validação em Form Requests e as regras de acesso em Policies.',
      } },
      { id: 'challenges', title: { en: 'Keeping financial records private.', pt: 'Manter registros financeiros privados.' }, body: {
        en: 'A finance interface must keep each person’s records separate. Ownership checks and server-side validation are important here: access rules belong alongside the data, rather than relying on which controls the interface happens to display.',
        pt: 'Uma interface financeira precisa manter os registros de cada pessoa separados. Verificações de propriedade e validação no servidor são cuidados importantes: as regras de acesso ficam junto aos dados, sem depender apenas dos controles que a interface exibe.',
      } },
      { id: 'result', title: { en: 'Records and a financial overview.', pt: 'Registros e uma visão das finanças.' }, body: {
        en: 'The web app brings together income and expense records, categories, monthly limits, recurring transactions, exports and a financial dashboard. The Android app uses React Native and Expo with the same Laravel backend.',
        pt: 'A aplicação web reúne receitas e despesas, categorias, limites mensais, lançamentos recorrentes, exportação e um dashboard financeiro. O app Android usa React Native e Expo com o mesmo backend Laravel.',
      }, limitation: { en: 'The website is publicly available. The Android APK is an ARM64 pre-release signed with a debug key, not distributed through Google Play. Email delivery for password recovery and account-deletion confirmation is not yet configured.', pt: 'O site está disponível publicamente. O APK Android é uma prévia para ARM64 assinada com chave de depuração, ainda sem distribuição pela Google Play. O envio de e-mails para recuperação de senha e confirmação da exclusão da conta ainda não está configurado.' } },
    ],
  },
  taskflow: {
    subtitle: { en: 'A collaborative workspace for projects and tasks.', pt: 'Um espaço colaborativo para projetos e tarefas.' },
    sections: [
      { id: 'problem', title: { en: 'Keeping shared work in view.', pt: 'Manter o trabalho compartilhado à vista.' }, body: {
        en: 'TaskFlow brings workspaces, projects and task tracking together so a team can follow priorities, owners, deadlines and progress from one place.',
        pt: 'O TaskFlow reúne espaços, projetos e tarefas para que a equipe acompanhe prioridades, responsáveis, prazos e progresso em um só lugar.',
      } },
      { id: 'decisions', title: { en: 'A React client and a C# API.', pt: 'Cliente React e API em C#.' }, body: {
        en: 'The interface uses React and TypeScript. A C# API built with ASP.NET Core handles authentication and application requests; Entity Framework Core persists data in MySQL. The repository separates domain, application, infrastructure and API responsibilities.',
        pt: 'A interface usa React e TypeScript. Uma API em C# com ASP.NET Core cuida da autenticação e das requisições; o Entity Framework Core persiste os dados no MySQL. O repositório separa as responsabilidades de domínio, aplicação, infraestrutura e API.',
      } },
      { id: 'challenges', title: { en: 'Keeping collaboration and demo data distinct.', pt: 'Separar colaboração real dos dados de demonstração.' }, body: {
        en: 'The browser demo uses fictional data stored locally, while authenticated work uses the API and MySQL. Server-side access rules protect workspace data, and task dependencies are checked to prevent cycles.',
        pt: 'A demonstração no navegador usa dados fictícios salvos localmente; o uso autenticado passa pela API e pelo MySQL. Regras no servidor protegem os dados dos espaços, e dependências entre tarefas são verificadas para evitar ciclos.',
      } },
      { id: 'result', title: { en: 'Planning, tracking and collaboration in one web app.', pt: 'Planejamento, acompanhamento e colaboração em uma aplicação web.' }, body: {
        en: 'The application includes workspaces, projects, task lists and boards, a calendar, comments and mentions, internal notifications, CSV reports, labels, dependencies and project templates. Its interface is available in Portuguese and English.',
        pt: 'A aplicação inclui espaços, projetos, tarefas em lista e quadro, calendário, comentários e menções, notificações internas, relatórios CSV, etiquetas, dependências e modelos de projeto. A interface está disponível em português e inglês.',
      }, limitation: { en: 'Version 1.0.0 is published on GitHub for local setup; there is no hosted demo. Account confirmation and password recovery by email, email invitations and external notifications are planned for version 1.1.', pt: 'A versão 1.0.0 está publicada no GitHub para execução local; não há demonstração hospedada. Confirmação e recuperação de conta por e-mail, convites e notificações externas estão planejados para a versão 1.1.' } },
    ],
  },
  pixelrank: {
    subtitle: { en: 'Game reviews with a community around them.', pt: 'Avaliações de jogos com uma comunidade ao redor.' },
    sections: [
      { id: 'problem', title: { en: 'From a score to a conversation.', pt: 'Da nota à conversa.' }, body: {
        en: 'PixelRank provides a place to publish game reviews, read other opinions and discuss them. Scored reviews, threaded comments, likes and notifications connect the editorial content to community participation.',
        pt: 'O PixelRank oferece um espaço para publicar avaliações de jogos, ler outras opiniões e conversar sobre elas. Avaliações com notas, comentários encadeados, curtidas e notificações conectam o conteúdo à participação da comunidade.',
      } },
      { id: 'decisions', title: { en: 'Server-rendered pages and clear boundaries.', pt: 'Páginas no servidor e responsabilidades claras.' }, body: {
        en: 'Laravel and Blade render the pages, with Alpine.js for interface interactions. Policies restrict changes to the resource owner. GameApiService centralizes the IGDB integration, including OAuth, cached tokens, timeouts and retries.',
        pt: 'Laravel e Blade renderizam as páginas, com Alpine.js nas interações da interface. Policies restringem alterações ao proprietário do recurso. O GameApiService centraliza a integração com o IGDB, incluindo OAuth, cache de tokens, timeout e novas tentativas.',
      } },
      { id: 'challenges', title: { en: 'Handling unavailable game data.', pt: 'Lidar com dados de jogos indisponíveis.' }, body: {
        en: 'The external game API can be unavailable. The service returns empty results when it fails so that saved reviews remain readable. Comment replies are constrained to the same review, and each user can like a comment only once.',
        pt: 'A API externa de jogos pode ficar indisponível. O serviço retorna resultados vazios em caso de falha, preservando a leitura das avaliações salvas. As respostas ficam vinculadas à mesma avaliação, e cada usuário pode curtir um comentário apenas uma vez.',
      } },
      { id: 'result', title: { en: 'A review platform with tested behavior.', pt: 'Uma plataforma de avaliações com comportamento testado.' }, body: {
        en: 'The repository includes Portuguese and English interfaces and Pest tests covering permissions, game API resilience and comment interactions. The supplied screenshot shows the application with demonstration data.',
        pt: 'O repositório inclui interfaces em português e inglês e testes Pest para permissões, resiliência da API e interações nos comentários. A captura fornecida mostra a aplicação com dados de demonstração.',
      }, limitation: { en: 'Selecting a game for a new review requires the Twitch/IGDB integration to be configured. Notifications are not delivered by WebSocket.', pt: 'Selecionar um jogo para uma nova avaliação exige a integração Twitch/IGDB configurada. As notificações não são entregues por WebSocket.' } },
    ],
  },
  sneakers: {
    subtitle: { en: 'A storefront backed by a Laravel API.', pt: 'Uma loja conectada a uma API Laravel.' },
    sections: [
      { id: 'problem', title: { en: 'Connecting the shopping journey.', pt: 'Conectar a jornada de compra.' }, body: {
        en: 'Sneakers Store brings product discovery, favorites, cart, addresses and orders into one shopping flow. It is an independent study project with a React interface and a Laravel API, rather than a live commercial store.',
        pt: 'O Sneakers Store reúne descoberta de produtos, favoritos, carrinho, endereços e pedidos em um fluxo de compra. É um projeto de estudo independente com interface React e API Laravel, em vez de uma loja comercial em operação.',
      } },
      { id: 'decisions', title: { en: 'An API and a separate React interface.', pt: 'API e interface React separadas.' }, body: {
        en: 'Laravel exposes the application API, while React Router organizes the interface. Sanctum uses session cookies and CSRF protection. Catalog filters stay in the URL, and the language selector links Portuguese to BRL and English to USD.',
        pt: 'O Laravel expõe a API da aplicação, enquanto o React Router organiza a interface. O Sanctum usa cookies de sessão e proteção CSRF. Os filtros do catálogo ficam na URL, e o seletor de idioma vincula português a BRL e inglês a USD.',
      } },
      { id: 'challenges', title: { en: 'Making checkout retries predictable.', pt: 'Tornar as novas tentativas de checkout previsíveis.' }, body: {
        en: 'A checkout response can be lost even after an operation is processed. The documented flow keeps an idempotency key and pending attempt data in sessionStorage, allowing confirmation to be retried. Order history retains the currency recorded with the order.',
        pt: 'A resposta do checkout pode se perder mesmo após uma operação ser processada. O fluxo documentado mantém uma chave de idempotência e os dados da tentativa no sessionStorage, permitindo repetir a confirmação. O histórico preserva a moeda registrada no pedido.',
      } },
      { id: 'result', title: { en: 'A demonstrable shopping flow.', pt: 'Um fluxo de compra demonstrável.' }, body: {
        en: 'The application connects browsing, account features and order history, with automated tests documented in the repository. The screenshots use demonstration records in an isolated database.',
        pt: 'A aplicação conecta navegação pelo catálogo, recursos da conta e histórico de pedidos, com testes automatizados documentados no repositório. As capturas usam registros de demonstração em um banco isolado.',
      }, limitation: { en: 'Wallet payments are simulated: no real money is charged. This independent project is not affiliated with the brands shown.', pt: 'Os pagamentos por Wallet são simulados: não há cobrança real. O projeto independente não tem vínculo com as marcas exibidas.' } },
    ],
  },
  movieslib: {
    subtitle: { en: 'Discover a film and save it for later.', pt: 'Descobrir um filme e guardar para depois.' },
    sections: [
      { id: 'problem', title: { en: 'Exploring beyond a movie title.', pt: 'Explorar além do título do filme.' }, body: {
        en: 'MoviesLib combines discovery, search, filters, movie details and filmographies. A browser-local watchlist lets visitors keep track of what they want to watch without creating an account.',
        pt: 'O MoviesLib combina descoberta, busca, filtros, detalhes de filmes e filmografias. Uma lista local permite guardar o que o visitante quer assistir sem criar uma conta.',
      } },
      { id: 'decisions', title: { en: 'Typed data and a server-side API proxy.', pt: 'Dados tipados e um proxy para a API.' }, body: {
        en: 'React and TypeScript provide the interface. TMDB requests pass through a server-side proxy, keeping its read token out of browser code. TanStack Query manages queries and Zod checks responses. The trailer player loads only after a click.',
        pt: 'React e TypeScript compõem a interface. As consultas ao TMDB passam por um proxy no servidor, mantendo o token de leitura fora do código do navegador. TanStack Query gerencia consultas e Zod confere respostas. O player de trailer carrega somente após um clique.',
      } },
      { id: 'challenges', title: { en: 'Working with external catalog limits.', pt: 'Trabalhar com os limites de um catálogo externo.' }, body: {
        en: 'Search results, translations and trailers depend on external services. The interface supports Portuguese and English, but some source content may lack a translation. During title searches, local filters refine the returned page rather than the entire TMDB catalog.',
        pt: 'Resultados de busca, traduções e trailers dependem de serviços externos. A interface oferece português e inglês, mas parte do conteúdo pode não ter tradução. Nas buscas por título, os filtros locais refinam a página recebida, e não todo o catálogo do TMDB.',
      } },
      { id: 'result', title: { en: 'Discovery without account setup.', pt: 'Descoberta sem precisar de cadastro.' }, body: {
        en: 'Visitors can browse films, explore people and save a watchlist in either interface language. The repository documents component, server and browser checks. The supplied screenshot uses real TMDB data.',
        pt: 'Visitantes podem explorar filmes e pessoas e guardar uma lista nos dois idiomas da interface. O repositório documenta verificações de componentes, servidor e navegador. A captura fornecida usa dados reais do TMDB.',
      }, limitation: { en: 'The watchlist is local to the browser and does not sync across devices. The player offers trailers, not full movies.', pt: 'A lista fica neste navegador e não sincroniza entre dispositivos. O player oferece trailers, e não filmes completos.' } },
    ],
  },
};
