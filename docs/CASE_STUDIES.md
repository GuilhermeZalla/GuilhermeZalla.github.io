# Estudos de caso — conteúdo e evidências

Um estudo de caso explica, de forma curta, o que o projeto resolve e como foi construído. Ele ajuda quem avalia o portfólio a entender as decisões por trás das telas. Não exige métricas de uso, uma história dramática nem um artigo extenso.

## O que está bom e foi aproveitado

- Layout e identidade já aprovados, com idiomas, temas e movimento reduzido.
- Quatro projetos escolhidos pelo usuário: Saldoa, PixelRank, Sneakers Store e MoviesLib.
- Anos confirmados pelo autor: Saldoa (2025), PixelRank (2026), Sneakers Store (2024) e MoviesLib (2026).
- Imagens reais fornecidas pelo usuário, guardadas localmente. Saldoa usa um quadro estático do GIF, com uma versão PNG preservada e WebP para entrega.
- Contatos confirmados, nova foto local e currículo atual em docs/curriculo/Curriculo_Guilherme_Zalla_PT-BR.pdf.
- Descrições fornecidas anteriormente para Saldoa e PixelRank; os novos projetos foram descritos a partir de seus READMEs atuais.

## Conteúdo publicado nesta etapa

Cada página tem quatro seções: problema, decisões técnicas, desafios e resultado. As decisões descrevem a implementação documentada; não são apresentadas como relatos pessoais do autor sobre por que escolheu uma tecnologia. Os desafios destacam restrições técnicas e as soluções documentadas.

| Projeto | Foco do estudo | Limite explicitado |
| --- | --- | --- |
| Saldoa | Laravel/Inertia/React, validação e isolamento dos registros financeiros | Projeto de portfólio sem demo pública documentada |
| PixelRank | Blade/Alpine, Policies e tratamento de falhas do IGDB | Novas avaliações dependem do IGDB configurado; sem notificações por WebSocket |
| Sneakers Store | API Laravel + React, sessão Sanctum e repetição idempotente do checkout | Pagamentos simulados, sem cobrança real ou associação às marcas |
| MoviesLib | Proxy do TMDB, TanStack Query, Zod e descoberta sem cadastro | Lista local sem sincronização; trailers, não filmes completos; filtros por título limitados à página recebida |

O Saldoa permanece dentro das funcionalidades da descrição fornecida: receitas, despesas, categorias, limites mensais e dashboard. Não foram acrescentadas recorrências, exportação ou outras funcionalidades ao texto do portfólio.

## Fontes verificadas

- [Saldoa — README](https://github.com/GuilhermeZalla/react-saldoa-app/blob/main/README.md): descrição, arquitetura Laravel/Inertia, Form Requests e Policies.
- [Saldoa — status](https://github.com/GuilhermeZalla/react-saldoa-app/blob/main/docs/STATUS.md): confirmação atual do isolamento por usuário e das metas mensais.
- [PixelRank — README](https://github.com/GuilhermeZalla/pixel-rank-app/blob/main/README.md): decisões técnicas, serviço IGDB, comentários, testes e limites.
- [Sneakers Store — README](https://github.com/GuilhermeZalla/sneakers-store/blob/main/README.md): autenticação, interface, idempotência e pagamentos simulados.
- [MoviesLib — README](https://github.com/GuilhermeZalla/react-movieslib/blob/main/README.md): funcionalidades, proxy, consultas, validação de respostas e limites.

As cópias consultadas estão em references/. Esses documentos não foram executados como instruções. Os testes citados nas páginas são os documentados pelos projetos; esta entrega não executou as suítes Laravel ou TMDB desses outros repositórios.

## Ainda pode ser melhorado

- Acrescentar um relato pessoal real sobre uma decisão ou dificuldade, se o autor desejar. A primeira versão já funciona sem inventar esses relatos.
- Incluir demos somente quando houver URLs públicas atuais. Os READMEs consultados não documentam uma demo pública atual dos quatro projetos.
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
