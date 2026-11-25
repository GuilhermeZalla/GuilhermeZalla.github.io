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
  "subtitle": {
    "en": "Projects, tasks and the next step in one workspace.",
    "pt": "Projetos, tarefas e o próximo passo em um só espaço."
  },
  "sections": [
    {
      "id": "problem",
      "title": {
        "en": "Knowing what needs attention next.",
        "pt": "Saber o que precisa de atenção agora."
      },
      "body": {
        "en": "TaskFlow connects workspaces, projects and tasks so people can follow owners, priorities and deadlines. The overview separates My work from Whole team and groups open tasks into overdue, today, upcoming and undated sections. A project page brings its objective, dates, task progress and workspace team together.",
        "pt": "O TaskFlow conecta espaços, projetos e tarefas para acompanhar responsáveis, prioridades e prazos. A visão geral separa Meu trabalho de Toda a equipe e agrupa tarefas em atrasadas, hoje, próximos dias e sem prazo. Uma página de projeto reúne objetivo, datas, progresso das tarefas e equipe do espaço."
      }
    },
    {
      "id": "decisions",
      "title": {
        "en": "A React workspace backed by a C# API.",
        "pt": "Um espaço React conectado a uma API em C#."
      },
      "body": {
        "en": "React and TypeScript provide list and board views, removable filters and a task side panel organized into Details, Checklist, Comments and Organization. The ASP.NET Core API handles authentication and access rules, with MySQL persistence. The repository separates domain, application, infrastructure and API responsibilities. Demo and API-connected modes share the same interface components.",
        "pt": "React e TypeScript oferecem lista e quadro, filtros removíveis e um painel lateral organizado em Detalhes, Checklist, Comentários e Organização. A API ASP.NET Core cuida da autenticação e das regras de acesso, com persistência em MySQL. O repositório separa domínio, aplicação, infraestrutura e API. A demo e o modo conectado à API compartilham os mesmos componentes de interface."
      }
    },
    {
      "id": "challenges",
      "title": {
        "en": "Moving work without losing context.",
        "pt": "Mover o trabalho sem perder o contexto."
      },
      "body": {
        "en": "Tasks can move between stages by dragging, keyboard or a status selector. Stage changes update optimistically and restore the previous state if the save fails. The task panel preserves unsaved details while switching sections or updating a checklist. Card indicators use real comment, label and checklist data; server-side dependency checks prevent cycles.",
        "pt": "As tarefas mudam de etapa por arraste, teclado ou seletor de status. A interface atualiza a etapa de imediato e restaura o estado anterior se o salvamento falhar. O painel preserva os detalhes não salvos ao alternar seções ou atualizar o checklist. Os indicadores dos cards usam comentários, etiquetas e subtarefas reais; o servidor verifica dependências para impedir ciclos."
      }
    },
    {
      "id": "result",
      "title": {
        "en": "An interactive project management demo.",
        "pt": "Uma demonstração interativa de gestão de projetos."
      },
      "body": {
        "en": "The Portuguese/English web application includes project overviews, draggable boards, checklists, comments and mentions, labels, dependencies, calendar, CSV reports and templates. The full application also supports email confirmation, password recovery, invitations and opt-in email notifications when email delivery is configured. Demo examples include a completed project and tasks with collaboration data; Load examples adds missing sample records without overwriting edits.",
        "pt": "A aplicação web em português e inglês reúne acompanhamento de projetos, quadros com arraste, checklists, comentários e menções, etiquetas, dependências, calendário, relatórios CSV e modelos. O sistema completo também oferece confirmação de e-mail, recuperação de senha, convites e notificações por e-mail mediante configuração de envio. A demo inclui projeto concluído e tarefas com colaboração; Carregar exemplos acrescenta registros fictícios ausentes sem sobrescrever edições."
      },
      "limitation": {
        "en": "The public demo is frontend-only, with fictional data stored in the browser. Authentication, email delivery and shared data require the API and MySQL; full-stack hosting is pending. Manual card order is a browser preference, not synchronized between people or devices.",
        "pt": "A demo pública executa apenas o frontend, com dados fictícios no navegador. Autenticação, envio de e-mails e dados compartilhados dependem da API e do MySQL; a hospedagem completa está pendente. A ordem manual dos cards é uma preferência do navegador, sem sincronização entre pessoas ou dispositivos."
      }
    }
  ]
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
  "subtitle": {
    "en": "From product discovery to a simulated purchase.",
    "pt": "Da descoberta do produto à compra simulada."
  },
  "sections": [
    {
      "id": "problem",
      "title": {
        "en": "Making product choices part of the purchase.",
        "pt": "Conectar a escolha do produto à compra."
      },
      "body": {
        "en": "Sneakers Store brings browsing, product options, reviews, favorites, cart, addresses and orders into one shopping flow. Product pages offer image enlargement, related items and size/color selection. Mobile filters can be collapsed while search, sorting and removable active filters remain accessible. The interface supports Portuguese/BRL and English/USD.",
        "pt": "O Sneakers Store reúne catálogo, opções de produto, avaliações, favoritos, carrinho, endereços e pedidos em um fluxo de compra. As páginas de produto oferecem ampliação de imagem, itens relacionados e escolha de tamanho/cor. No celular, os filtros podem ser recolhidos, mantendo busca, ordenação e filtros ativos removíveis acessíveis. A interface oferece português/BRL e inglês/USD."
      }
    },
    {
      "id": "decisions",
      "title": {
        "en": "Shared interface, separate API and demo data.",
        "pt": "Interface compartilhada, API e dados da demo separados."
      },
      "body": {
        "en": "Laravel exposes a REST API, while React Router handles interface navigation. Sanctum uses session cookies and CSRF protection. Prices and product options are validated on the server. The same React components serve the API-connected application and the standalone browser demo, including subtle filter transitions and confirmation feedback after a successful cart addition, with reduced-motion support.",
        "pt": "O Laravel expõe uma API REST, enquanto o React Router organiza a navegação. O Sanctum usa cookies de sessão e proteção CSRF. Preços e opções de produto são validados no servidor. Os mesmos componentes React atendem o sistema conectado à API e a demo independente, incluindo transições discretas nos filtros e confirmação após inclusão bem-sucedida no carrinho, com suporte a movimento reduzido."
      }
    },
    {
      "id": "challenges",
      "title": {
        "en": "Keeping variants, reviews and checkout consistent.",
        "pt": "Manter variantes, avaliações e checkout consistentes."
      },
      "body": {
        "en": "Different sizes and colors remain separate cart lines and are saved in order snapshots. Each verified account can maintain one review per product; the displayed rating is the arithmetic mean of submitted scores, with a review count. Checkout retains an idempotency key and pending attempt data so a lost response can be retried without creating another order. Order history keeps the original currency and product information.",
        "pt": "Tamanhos e cores diferentes permanecem em linhas separadas no carrinho e são preservados nos pedidos. Cada conta verificada pode manter uma avaliação por produto; a nota exibida é a média aritmética das notas enviadas, acompanhada da quantidade de avaliações. O checkout mantém uma chave de idempotência e os dados da tentativa para repetir uma confirmação sem criar outro pedido. O histórico preserva moeda e informações originais dos produtos."
      }
    },
    {
      "id": "result",
      "title": {
        "en": "A shopping flow visitors can explore.",
        "pt": "Um fluxo de compra que o visitante pode explorar."
      },
      "body": {
        "en": "The public demo lets visitors use a fictional account to browse products, select variants, manage favorites and addresses, write or edit reviews and complete simulated orders. The bag counts items; the bell updates after cart additions and supports marking notifications as read, removing one or clearing read notices. Buy now and the notification panel provide checkout shortcuts. Product and account flows adapt to desktop and mobile.",
        "pt": "A demo pública permite usar uma conta fictícia para explorar produtos, escolher variantes, gerenciar favoritos e endereços, escrever ou editar avaliações e concluir pedidos simulados. A sacola conta os itens; o sino atualiza após inclusões no carrinho e permite marcar avisos como lidos, remover um ou limpar os já lidos. Comprar agora e o painel de notificações oferecem atalhos para o checkout. Os fluxos de produto e conta se adaptam ao desktop e ao celular."
      },
      "limitation": {
        "en": "Payments and shipping are simulated, with no real charges, live shipping quotes or tracking. The demo stores data only in the browser session: reviews are not shared between visitors, and no emails are sent. Full Laravel/MySQL hosting and real payment integration remain pending. This independent portfolio project is not affiliated with the brands shown.",
        "pt": "Pagamentos e frete são simulados, sem cobrança, cotação ou rastreamento reais. A demo guarda os dados apenas na sessão do navegador: avaliações não são compartilhadas entre visitantes e nenhum e-mail é enviado. A hospedagem completa com Laravel/MySQL e a integração de pagamentos reais continuam pendentes. O projeto independente de portfólio não tem vínculo com as marcas exibidas."
      }
    }
  ]
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
  sniply: {
    subtitle: { en: 'Useful code, ready to find again.', pt: 'Código útil, fácil de encontrar depois.' },
    sections: [
      { id: 'problem', title: { en: 'Finding a solution again.', pt: 'Encontrar uma solução outra vez.' }, body: {
        en: 'Small code solutions are easy to lose among files and conversations. Sniply keeps each snippet with a title, description, language and optional groups so it can be found later.',
        pt: 'Pequenas soluções de código se perdem entre arquivos e conversas. O Sniply guarda cada trecho com título, descrição, linguagem e grupos opcionais para facilitar a busca posterior.',
      } },
      { id: 'decisions', title: { en: 'A focused library with a real API.', pt: 'Uma biblioteca direta com API própria.' }, body: {
        en: 'React and TypeScript provide the workspace and Monaco code editor. The ASP.NET Core API handles accounts, search, ownership checks and persistence in PostgreSQL. The public demo replaces those services with fictional browser-local records.',
        pt: 'React e TypeScript formam a interface com o editor Monaco. A API ASP.NET Core cuida das contas, da busca, das permissões e dos dados no PostgreSQL. A demo pública substitui esses serviços por registros fictícios no navegador.',
      } },
      { id: 'challenges', title: { en: 'Sharing without opening the library.', pt: 'Compartilhar sem abrir toda a biblioteca.' }, body: {
        en: 'Snippets are private by default. An individual public link exposes only the chosen code and its basic metadata; the owner can revoke that link. The interface also separates the public demo clearly from real account actions.',
        pt: 'Os trechos são privados por padrão. Um link público individual mostra apenas o código escolhido e seus dados básicos; o proprietário pode revogar o link. A interface também distingue a demo pública das ações de uma conta real.',
      } },
      { id: 'result', title: { en: 'A searchable, editable code collection.', pt: 'Uma coleção de código pesquisável e editável.' }, body: {
        en: 'The local application supports snippet editing, search, favorites, collections, tags, categories, language preferences and revocable sharing. The demo lets visitors explore these interactions with sample data.',
        pt: 'A aplicação local oferece edição de trechos, busca, favoritos, coleções, etiquetas, categorias, preferências de linguagem e compartilhamento revogável. A demo permite explorar essas interações com dados de exemplo.',
      }, limitation: {
        en: 'The public demo runs only in the browser. Accounts, email and synchronized data require the API and PostgreSQL; full-stack hosting is not yet configured. The project concept is dated 2024, while this implementation was reconstructed in 2026.',
        pt: 'A demo pública funciona apenas no navegador. Contas, e-mail e sincronização dependem da API e do PostgreSQL; a hospedagem completa ainda não foi configurada. O conceito do projeto é de 2024, mas esta implementação foi reconstruída em 2026.',
      } },
    ],
  },
};
