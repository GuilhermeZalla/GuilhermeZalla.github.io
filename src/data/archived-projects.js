// Retained for a future review; these projects are not currently shown on the Home.
export const archivedProjects = [
  {
    id: 'nova-geracao', name: 'Nova Geração', year: null,
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    repository: null, demo: null, image: null,
    description: {
      en: 'A mobile banking app where users can create an account, make deposits, send payments to other users and review their transaction history. Built with the MERN stack, with bcrypt password hashing and JWT authentication.',
      pt: 'Um aplicativo bancário móvel com criação de conta, depósitos, pagamentos entre usuários e histórico de transações. Feito com a stack MERN, hash de senhas com bcrypt e autenticação JWT.',
    },
  },
  {
    id: 'next-game', name: 'Next Game', year: null,
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'RAWG API'],
    repository: null, demo: 'https://nextgame-ecommerce.netlify.app/', image: '/projects/project-1-demo.png',
    description: {
      en: 'An e-commerce site for digital PC games with account creation and validation, shopping cart and wishlist. Built with the MERN stack, using the RAWG Video Games Database API for product thumbnails and backgrounds.',
      pt: 'Um e-commerce de jogos digitais para PC com criação e validação de conta, carrinho e lista de desejos. Feito com a stack MERN, usando a API RAWG para miniaturas e fundos dos produtos.',
    },
  },
];
