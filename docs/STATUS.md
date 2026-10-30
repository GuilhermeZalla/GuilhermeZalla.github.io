# Status — 30/10/2026

## Autorizado

- Etapa 1: migração de CRA para Vite e correção de bugs.
- Paleta clara/escura aprovada.
- Protótipos estáticos para revisão antes de iniciar a etapa 2.
- Mockup aprovado pelo usuário, com autorização para integrar o layout e adicionar animações sutis.

## Documentação e demonstrações — 30/10/2026

- README reescrito em português seguindo a estrutura do exemplo fornecido: demonstrações, screenshots, estrutura/stack, execução, interface, idiomas/temas/acessibilidade, conteúdo, limites, verificação, decisões e publicação.
- 28 screenshots reais do build atual em 1440 × 1000 e 390 × 844, incluindo páginas completas, temas claro/escuro da Home, quatro estudos e contato aberto. Arquivos em screenshots/.
- Quatro GIFs reais em demo/: navegação da Home, estudo do Saldoa, idiomas/temas/contato e fluxo mobile. Exibição mobile limitada a 280 px no README; imagens do site continuam estáticas.
- Captura reproduzível com demo/record.mjs e demo/encode_gifs.py. Pillow é ferramenta de documentação, instalada na pasta temporária ignorada, sem mudanças em package.json ou package-lock.json.
- Guia PERGUNTAS_ENTREVISTA.md com apresentação de 30 segundos, 30 perguntas e respostas, roteiro de demonstração, fontes no código e limites explícitos.
- Build e oito testes executados com sucesso nesta atualização; captura sem erros de página ou overflow nas larguras documentadas. Requisitos de Node documentados conforme a toolchain atual, validada em 24.15.0. Relatórios Lighthouse anteriores preservados e identificados como históricos, sem nova medição.
- Nenhuma alteração na interface, publicação, commit ou push nesta atualização documental.

## Etapa 1

- React mantido; entrada adaptada ao Vite e scripts atualizados.
- HashRouter preservado, com deploy preparado para GitHub Pages na raiz do domínio.
- Dois loops incorretos do filtro substituídos por estado derivado da rota.
- URL antiga da categoria com erro de grafia continua aceita; rótulo corrigido para “Institutional Website”.
- Categorias Logos/Banners removidas dos filtros e da lista exibida.
- Título “Some of my works.” sem escrita imperativa, com altura de linha normal.
- Layout do portfólio com altura natural, imagens proporcionais e sem corte no segundo projeto.
- Imagens usadas pela aplicação agora são locais, com alt, dimensões, lazy loading e acesso aos links por foco/toque.
- Download do currículo usa importação de asset compatível com Vite.
- Removidos handlers duplicados de window.onload e timers de digitação sem limpeza; os subtítulos passam a ser texto estático confiável ao navegar.
- Título e descrição básicos atualizados para Software Engineer; scripts React externos redundantes e reset remoto removidos.
- Teste padrão do CRA substituído por três verificações de filtro, compatibilidade de URL e currículo.
- Build gerado em dist; método gh-pages mantido. Publicação não executada.

## Limitação das imagens antigas

Os onze endereços do Imgur retornam a imagem de indisponibilidade, não as capturas originais. Cinco capturas reais foram recuperadas das demos existentes: Next Game, MoviesLib, Windbnb, Where in the World? e Snap.

As demais entradas usam SVGs locais identificados como “Preview unavailable”. As duas entradas TODO possuem URLs de outros projetos, agora desativadas na interface e preservadas em sourceUrl; Weather não exibiu conteúdo suficiente; os itens de Figma não tinham captura recuperável. Os detalhes estão em project-assets.json. Nenhuma captura de outro site foi mantida como se fosse trabalho do autor.

## Protótipos aprovados

Abrir mockups/index.html diretamente no navegador:

- Home desktop clara e escura.
- Home com viewport fixo de 390 × 844 px.
- Estudo de caso do Saldoa em desktop e 390 px.
- Cabeçalho com EN/PT, seletor de tema e contato flutuante aberto.
- Estrutura de seções, paleta, tipografia e espaçamento na galeria.

Os protótipos usam a foto e o PDF locais. Imagens dos novos projetos, anos e links ausentes ficam marcados. Justificativas técnicas e desafios do Saldoa aguardam informações confirmadas. O exemplo não inventa métricas, funcionalidades adicionais nem projeto C#.

## Pendentes

- Revisar os textos dos estudos de caso.
- Relatos pessoais de decisões/desafios são opcionais; a primeira versão usa fatos documentados.
- Publicação no GitHub Pages após revisão; nenhuma publicação ou commit executado.

## Etapa 3 — estudos de caso e dados confirmados

- Anos corrigidos e confirmados pelo autor: Saldoa 2025, PixelRank 2026, Sneakers Store 2024 e MoviesLib 2026, na Home e nos estudos de caso.
- Foto exibida em cores; texto da stack esclarece que a lista é uma seleção parcial em EN/PT.
- Após esclarecimento com captura do autor, os quatro projetos (Saldoa, PixelRank, Sneakers e MoviesLib) preenchem os cartões da Home com object-fit: cover, sem faixas vazias. Captura do Sneakers recortada somente nos 15 px da barra lateral, mantendo o conteúdo original. PNG limpo em references/sneakers-home-clean.png e versões WebP da Home e do estudo atualizadas; recorte reproduzível nos scripts de assets.
- Imagens dos quatro estudos de caso também preenchem a moldura com object-fit: cover, sem faixas vazias em desktop e celular. O link para abrir a captura completa permanece disponível.
- Após esses ajustes: build aprovado e verificação em navegador repetida com sucesso na Home (360/390/768/1440 px, EN/PT, claro/escuro) e nos quatro estudos (desktop/celular), incluindo acessibilidade, navegação, preferências e movimento reduzido. Capturas atualizadas em verification/; Lighthouse abaixo é a medição anterior, sem nova execução para esses ajustes.
- Usuário confirmou e-mail, LinkedIn, manutenção do WhatsApp, nova foto e currículo de docs/mockups.
- Saldoa, PixelRank, Sneakers Store e MoviesLib substituem a seleção anterior; Next Game e Nova Geração ficam preservados em src/data/archived-projects.js.
- As quatro imagens fornecidas foram baixadas e otimizadas em arquivos locais. O GIF do Saldoa foi convertido em um quadro estático, sem GIF no site.
- A nova foto foi salva localmente; profile.png e profile.webp antigos foram removidos. Referências dos protótipos e do componente antigo foram ajustadas.
- Currículo atual importado de docs/mockups/Currículo_Guilherme_Zalla.pdf.
- Quatro rotas de estudo de caso com estrutura aprovada, índice navegável, imagens ampliáveis e conteúdo EN/PT. Código na entrada principal e imagem antecipada nas visitas diretas para reduzir a cascata de carregamento.
- Home ligada aos estudos de caso. Título e descrição acompanham a página no navegador.
- Conteúdo escrito a partir das descrições fornecidas e dos READMEs atuais, sem experiências inventadas. Fontes e limites em CASE_STUDIES.md.
- Implementação validada inicialmente com build de produção e oito testes de conteúdo, idiomas, temas e rotas.
- Resultados de navegador e desempenho atualizados em site-verification.json e performance/.
- Inter mantida, com arquivo variável latino de 48.256 bytes em vez do arquivo completo de 352.240 bytes; inglês e português preservados. Imagens das visitas diretas aos estudos são antecipadas no HTML.
- Verificação final: build e oito testes passando; 16 combinações da Home e 16 dos estudos de caso conferidas, com abertura direta, reload, navegação por índice, foco, imagens estáticas locais e acessibilidade automatizada sem violações detectadas.
- Lighthouse final da etapa 3: Home 97 mobile / 100 desktop; estudo Saldoa 96 mobile / 100 desktop em desempenho. Acessibilidade, boas práticas e SEO 100 nos dois perfis das duas páginas. Medição local com throttling simulado; resultados publicados podem variar.

## Histórico da verificação inicial

O relatório inicial de conferência em navegador fica em browser-verification.json. As capturas dos protótipos ficam em mockups/screenshots/.

Na etapa 1, foram verificados build de produção, três testes de componentes e navegação/filtros/ausência de cortes em 360, 390, 768 e 1440 px. Nos protótipos foram conferidos abertura direta por arquivo, EN/PT, tema, contato e ausência de transbordamento em desktop e 390 px. As combinações de texto e botões da paleta têm contraste calculado superior a 4,5:1. A verificação do React atual está registrada abaixo.

## Etapa 2 — layout aprovado integrado

- Home React com hero, Saldoa/PixelRank em destaque, Nova Geração/Next Game compactos, sobre com foto, stack curta e contato.
- Mesma paleta e composição dos mockups, sem a moldura, glitch, fontes e efeitos antigos.
- Dados dos quatro projetos centralizados em src/data/projects.js, com conteúdo EN/PT fornecido e sem projetos C# inventados.
- Contatos e currículo centralizados em src/data/profile.js. Dados não confirmados continuam placeholders sem links fictícios.
- Inglês padrão e português via react-i18next. Preferência explícita salva no navegador.
- Tema automático do sistema, com menu Sistema/Claro/Escuro, persistência e atualização quando o sistema muda. Tema aplicado antes do primeiro render para evitar flash.
- Entrada do hero em 400 ms, com pequeno deslocamento e sequência discreta. Seções/projetos aparecem uma única vez ao rolar. Transições curtas nos controles e abertura do contato. Zoom discreto preparado para imagens reais dos projetos.
- prefers-reduced-motion desativa animações e rolagem suave. Sem IntersectionObserver, conteúdo permanece visível.
- Navegação móvel nativa, link para pular ao conteúdo, foco visível, foco na seção após navegação e fechamento de menus/contato por Escape e clique externo.
- Rotas antigas de portfólio continuam abrindo os projetos. Estudos de caso seguem na etapa 3; a Home não contém links para páginas ainda não implementadas.
- Metadados Open Graph/Twitter, imagem social PNG própria, favicon GZ, ícone Apple, manifesto e cores do navegador atualizados.
- Inter local. Foto convertida em derivação WebP de 45.422 bytes; PNG original de 837.305 bytes preservado.

### Verificação da etapa 2

- Build de produção e quatro testes de conteúdo, idioma, tema e navegação/contato.
- Navegador: 360, 390, 768 e 1440 px, EN/PT e claro/escuro; sem transbordamento horizontal ou erros de página.
- axe: nenhuma violação detectada nos testes WCAG A/AA em desktop e celular nos dois idiomas e temas, além do contato aberto.
- Preferências persistidas, resposta ao tema do sistema, rolagem/foco, navegação móvel, currículo, Escape, animação única e movimento reduzido conferidos.
- Relatório atual: site-verification.json. Capturas do React: verification/.
- Lighthouse: relatórios mobile/desktop em performance/, medidos sobre build local com throttling simulado. A hospedagem pública pode produzir resultados diferentes.
- Resultado final do Lighthouse: desempenho 95 no mobile e 100 no desktop; acessibilidade, boas práticas e SEO 100 nos dois perfis. CLS medido: 0. Detalhes em performance/summary.json e nos relatórios HTML.
