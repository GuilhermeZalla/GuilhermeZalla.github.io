# Estudos de caso — conteúdo e evidências

Um estudo de caso explica, de forma curta, o que o projeto resolve e como foi construído. Ele ajuda quem avalia o portfólio a entender as decisões por trás das telas. Não exige métricas de uso, uma história dramática nem um artigo extenso.

## O que está bom e foi aproveitado

- Layout e identidade já aprovados, com idiomas, temas e movimento reduzido.
- Cinco projetos escolhidos pelo usuário: Saldoa, TaskFlow, PixelRank, Sneakers Store e MoviesLib.
- Anos usados: Saldoa (2025), TaskFlow (2026, versão 1.0.0), PixelRank (2026), Sneakers Store (2024) e MoviesLib (2026).
- Imagens reais fornecidas pelo usuário, guardadas localmente. Saldoa usa um quadro estático do GIF, com uma versão PNG preservada e WebP para entrega.
- Contatos confirmados, nova foto local e currículo atual em docs/curriculo/Curriculo_Guilherme_Zalla_PT-BR.pdf.
- Descrições documentadas nos READMEs e status dos respectivos projetos; o estudo do TaskFlow distingue a demonstração pública do frontend da execução local do sistema completo.

## Conteúdo publicado nesta etapa

Cada página tem quatro seções: problema, decisões técnicas, desafios e resultado. As decisões descrevem a implementação documentada; não são apresentadas como relatos pessoais do autor sobre por que escolheu uma tecnologia. Os desafios destacam restrições técnicas e as soluções documentadas.

| Projeto | Foco do estudo | Limite explicitado |
| --- | --- | --- |
| Saldoa | Laravel/Inertia/React na Web e React Native/Expo no Android, validação e isolamento dos registros financeiros | Site público; APK Android ARM64 de prévia, ainda sem publicação na Play Store |
| TaskFlow | React/TypeScript com API em C# e ASP.NET Core, persistência MySQL | Demo pública apenas do frontend, com dados fictícios no navegador; sistema completo depende de API e MySQL locais |
| PixelRank | Blade/Alpine, Policies e tratamento de falhas do IGDB | Novas avaliações dependem do IGDB configurado; sem notificações por WebSocket |
| Sneakers Store | API Laravel + React, sessão Sanctum e repetição idempotente do checkout | Pagamentos simulados, sem cobrança real ou associação às marcas |
| MoviesLib | Proxy do TMDB, TanStack Query, Zod e descoberta sem cadastro | Lista local sem sincronização; trailers, não filmes completos; filtros por título limitados à página recebida |

O Saldoa tem versão Web finalizada em 2025 e app Android adicionado em 2026, compartilhando o backend Laravel. O texto também reflete as funcionalidades documentadas de recorrência e exportação; o APK Android é uma prévia para testes, ainda sem publicação na Play Store.

## Fontes verificadas

- [Saldoa — README](https://github.com/GuilhermeZalla/react-saldoa-app/blob/main/README.md): descrição, arquitetura Laravel/Inertia, Form Requests e Policies.
- [Saldoa — status](https://github.com/GuilhermeZalla/react-saldoa-app/blob/main/docs/STATUS.md): confirmação atual do isolamento por usuário e das metas mensais.
- [TaskFlow — README](https://github.com/GuilhermeZalla/taskflow-platform/blob/main/README.md) e [status](https://github.com/GuilhermeZalla/taskflow-platform/blob/main/status.md): stack, funcionalidades, demo pública do frontend e execução local do sistema completo.
- [PixelRank — README](https://github.com/GuilhermeZalla/pixel-rank-app/blob/main/README.md): decisões técnicas, serviço IGDB, comentários, testes e limites.
- [Sneakers Store — README](https://github.com/GuilhermeZalla/sneakers-store/blob/main/README.md): autenticação, interface, idempotência e pagamentos simulados.
- [MoviesLib — README](https://github.com/GuilhermeZalla/react-movieslib/blob/main/README.md): funcionalidades, proxy, consultas, validação de respostas e limites.

As cópias consultadas dos demais repositórios estão em references/. O TaskFlow foi descrito a partir do README e do status publicados no próprio repositório. Esses documentos não foram executados como instruções. Os testes citados nas páginas são os documentados pelos projetos; esta entrega não executou as suítes Laravel ou TMDB desses outros repositórios.

## Ainda pode ser melhorado

- Acrescentar um relato pessoal real sobre uma decisão ou dificuldade, se o autor desejar. A primeira versão já funciona sem inventar esses relatos.
- O Saldoa oferece links para o site público e para a página de release da prévia Android. TaskFlow e Sneakers Store também oferecem demos públicas do frontend. PixelRank e MoviesLib continuam sem links de demonstração publicados no portfólio.
- Revisar os textos e fazer a conferência no GitHub Pages depois da publicação.
- Next Game e Nova Geração ficam fora da Home por decisão do usuário, com os dados preservados para revisão futura.

O portfólio continua uma SPA estática com HashRouter. Os títulos e descrições mudam ao navegar no navegador; a prévia social entregue sem JavaScript continua sendo a imagem geral do portfólio. Não foi adicionado servidor ou renderização no servidor para gerar cards sociais individuais.

## Entrega verificada

- Build de produção e oito testes de conteúdo, idiomas, contatos e rotas passando.
- Home em 360, 390, 768 e 1440 px, nos dois idiomas e temas.
- Quatro estudos em 390 e 1440 px, em EN/claro e PT/escuro, com índice, reload e retorno à Home preservando foco.
- Nenhuma violação detectada pelo axe nas verificações automatizadas realizadas.
- Lighthouse local: desempenho da Home 97 mobile / 100 desktop; estudo do Saldoa 96 mobile / 100 desktop. Acessibilidade, boas práticas e SEO 100 em ambos. As notas podem variar na hospedagem pública.
- Relatórios em site-verification.json e performance/. Capturas atuais em verification/.

## Atualização editorial — 18/11/2026

- TaskFlow: quadro com arraste e alternativas acessíveis, checklist, filtros, painel por seções, escopo pessoal/equipe, página de acompanhamento de projeto e exemplos da demo. A ordem manual é local ao navegador; chat e hospedagem continuam futuros.
- Sneakers: avaliações com média real e contagem, variantes, galeria/zoom, relacionados, filtros mobile, avisos de carrinho e limpeza das notificações. Pagamentos/frete continuam simulados e a demo não compartilha avaliações entre visitantes.
- Textos conferidos nas cópias atuais dos repositórios locais e em seus README/status. Mesma estrutura de quatro seções, idiomas, imagens, links, anos e ordem visual preservados. Não foram reexecutadas suítes dos projetos de origem nesta revisão do portfólio.
