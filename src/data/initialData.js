// Dados iniciais com pre-cadastro de ingredientes e produtos

export const preRegisteredIngredients = {
  pao: [
    'Pao de Xis Tradicional',
    'Pao de Cachorro-quente',
    'Pao Brioche de Hamburguer',
    'Pao Frances',
    'Nao se aplica'
  ],
  carne: [
    'Hamburguer Bovino 200g',
    'Hamburguer Bovino 150g',
    'Coracao de Frango ao Alho',
    '2 Salsichas Especiais',
    'File de Frango Grelhado',
    'Alcatra Grelhada 180g',
    'Nao se aplica'
  ],
  queijo: [
    'Queijo Prato',
    'Queijo Prato Duplo',
    'Queijo Mussarela',
    'Queijo Coalho Grelhado',
    'Cheddar Cremoso',
    'Catupiry Original',
    'Nenhum'
  ],
  frios: [
    'Presunto',
    'Bacon Fatiado',
    'Bacon em Cubos',
    'Calabresa Fatiada',
    'Bacon, Calabresa e Presunto',
    'Nenhum'
  ],
  salada: [
    'Alface e Tomate',
    'Alface, Tomate, Milho e Ervilha',
    'Vinagrete',
    'Nenhuma'
  ],
  molho: [
    'Maionese Caseira',
    'Maionese Temperada Verde',
    'Molho de Tomate Caseiro',
    'Molho Barbecue',
    'Molho de Alho',
    'Nenhum'
  ],
  acompanhamento: [
    'Nenhum',
    'Batata Frita 200g',
    'Batata Frita 500g',
    'Farofa Temperada',
    'Batata Frita e Refrigerante'
  ]
};

export const initialCategories = [
  { 
    id: 1, 
    name: 'Combos e Promocoes', 
    active: true, 
    isCombo: true,
    description: 'Combinacoes de lanche, acompanhamento e bebida' 
  },
  { 
    id: 2, 
    name: 'Xis Gaucho Tradicional', 
    active: true, 
    isCombo: false,
    description: 'Prensados na chapa com ingredientes padrao' 
  },
  { 
    id: 3, 
    name: 'Cachorro-quente', 
    active: true, 
    isCombo: false,
    description: 'Pao especial, salsicha ao molho e complementos' 
  },
  { 
    id: 4, 
    name: 'Porcoes e Acompanhamentos', 
    active: true, 
    isCombo: false,
    description: 'Porcoes para compartilhar ou adicionar ao pedido' 
  },
  { 
    id: 5, 
    name: 'Bebidas', 
    active: true, 
    isCombo: false,
    description: 'Refrigerantes e cervejas geladas' 
  },
];

export const initialProducts = [
  // COMBOS
  {
    id: 101,
    catId: 1,
    name: 'Combo Mau Mau Supremo',
    price: 44.90,
    desc: '1x Xis Salada Especial, 1x Batata Frita 200g e 1x Refrigerante Lata 350ml',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    stockQuantity: 15,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Hamburguer Bovino 200g',
      queijo: 'Queijo Prato',
      frios: 'Presunto',
      salada: 'Alface e Tomate',
      molho: 'Maionese Caseira',
      acompanhamento: 'Batata Frita e Refrigerante'
    },
    removableIngredients: ['Sem Tomate', 'Sem Alface', 'Sem Maionese', 'Sem Presunto'],
    additionals: [
      { id: 'bacon', name: 'Bacon fatiado crocante', price: 5.00 },
      { id: 'queijo', name: 'Queijo duplo', price: 4.50 },
      { id: 'ovo', name: 'Ovo frito na chapa', price: 3.00 },
      { id: 'molho', name: 'Pote extra de Maionese Temperada', price: 3.50 }
    ]
  },
  {
    id: 102,
    catId: 1,
    name: 'Combo Casal',
    price: 78.00,
    desc: '2x Xis Tradicionais, 1x Batata Grande 500g com Cheddar e Bacon e 1x Refrigerante',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    stockQuantity: 10,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Hamburguer Bovino 200g',
      queijo: 'Cheddar Cremoso',
      frios: 'Bacon em Cubos',
      salada: 'Alface e Tomate',
      molho: 'Maionese Caseira',
      acompanhamento: 'Batata Frita 500g'
    },
    removableIngredients: ['Sem Cheddar na Batata', 'Sem Bacon na Batata'],
    additionals: [
      { id: 'bacon', name: 'Bacon extra', price: 5.00 },
      { id: 'queijo', name: 'Queijo extra nos xis', price: 6.00 }
    ]
  },

  // XIS GAUCHO
  {
    id: 201,
    catId: 2,
    name: 'Xis Salada Tradicional',
    price: 28.00,
    desc: 'Pao prensado, hamburguer bovino 200g, queijo prato, presunto, tomate, alface e maionese',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 12,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Hamburguer Bovino 200g',
      queijo: 'Queijo Prato',
      frios: 'Presunto',
      salada: 'Alface e Tomate',
      molho: 'Maionese Caseira',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Tomate', 'Sem Alface', 'Sem Maionese', 'Sem Presunto'],
    additionals: [
      { id: 'bacon', name: 'Bacon crocante', price: 5.00 },
      { id: 'queijo', name: 'Queijo duplo', price: 4.50 },
      { id: 'ovo', name: 'Ovo frito', price: 3.00 },
      { id: 'burger_extra', name: 'Hamburguer extra 150g', price: 8.00 },
      { id: 'maionese_extra', name: 'Maionese verde extra', price: 3.00 }
    ]
  },
  {
    id: 202,
    catId: 2,
    name: 'Xis Coracao com Bacon',
    price: 34.00,
    desc: 'Pao prensado, coracao de frango ao alho, bacon fatiado, queijo prato duplo e maionese',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 8,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Coracao de Frango ao Alho',
      queijo: 'Queijo Prato Duplo',
      frios: 'Bacon Fatiado',
      salada: 'Alface e Tomate',
      molho: 'Maionese Caseira',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Bacon', 'Sem Tomate', 'Sem Alface', 'Sem Maionese'],
    additionals: [
      { id: 'queijo', name: 'Queijo adicional', price: 4.50 },
      { id: 'ovo', name: 'Ovo frito', price: 3.00 },
      { id: 'catupiry', name: 'Catupiry original', price: 5.50 }
    ]
  },
  {
    id: 203,
    catId: 2,
    name: 'Xis Tudo Mau Mau',
    price: 38.00,
    desc: 'Hamburguer 150g, file de frango, bacon fatiado, calabresa, queijo duplo, presunto e salada',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 6,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Hamburguer Bovino 150g',
      queijo: 'Queijo Prato Duplo',
      frios: 'Bacon, Calabresa e Presunto',
      salada: 'Alface e Tomate',
      molho: 'Maionese Caseira',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Calabresa', 'Sem Bacon', 'Sem Tomate', 'Sem Alface'],
    additionals: [
      { id: 'cheddar', name: 'Cheddar cremoso', price: 4.50 }
    ]
  },

  // CACHORRO-QUENTE
  {
    id: 301,
    catId: 3,
    name: 'Cachorro-quente Especial Prensado',
    price: 22.00,
    desc: 'Pao tradicional, 2 salsichas ao molho caseiro, queijo derretido, milho e ervilha',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 20,
    hasStockLimit: true,
    ingredients: {
      pao: 'Pao de Cachorro-quente',
      carne: '2 Salsichas Especiais',
      queijo: 'Queijo Prato',
      frios: 'Nenhum',
      salada: 'Alface, Tomate, Milho e Ervilha',
      molho: 'Molho de Tomate Caseiro',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Milho e Ervilha', 'Sem Molho'],
    additionals: [
      { id: 'salsicha_extra', name: '1 Salsicha extra', price: 3.50 },
      { id: 'bacon', name: 'Bacon em cubos', price: 4.50 }
    ]
  },

  // PORCOES
  {
    id: 401,
    catId: 4,
    name: 'Batata Frita Suprema 500g',
    price: 28.00,
    desc: '500g de batata palito coberta com molho cheddar e bacon frito em cubos',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 15,
    hasStockLimit: true,
    ingredients: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Cheddar Cremoso',
      frios: 'Bacon em Cubos',
      salada: 'Nenhuma',
      molho: 'Nenhum',
      acompanhamento: 'Batata Frita 500g'
    },
    removableIngredients: ['Sem Cheddar', 'Sem Bacon'],
    additionals: [
      { id: 'molho_alho', name: 'Molho especial de alho', price: 3.50 }
    ]
  },
  {
    id: 402,
    catId: 4,
    name: 'Espeto de Alcatra com Queijo Coalho',
    price: 18.00,
    desc: 'Alcatra grelhada com queijo coalho tostado na brasa, farofa e vinagrete',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 10,
    hasStockLimit: true,
    ingredients: {
      pao: 'Nao se aplica',
      carne: 'Alcatra Grelhada 180g',
      queijo: 'Queijo Coalho Grelhado',
      frios: 'Nenhum',
      salada: 'Vinagrete',
      molho: 'Nenhum',
      acompanhamento: 'Farofa Temperada'
    },
    removableIngredients: ['Sem Farofa', 'Sem Vinagrete'],
    additionals: []
  },

  // BEBIDAS
  {
    id: 501,
    catId: 5,
    name: 'Refrigerante Lata 350ml',
    price: 6.00,
    desc: 'Coca-Cola, Guarana Antarctica ou Fanta Laranja',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 40,
    hasStockLimit: true,
    ingredients: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Nenhum',
      frios: 'Nenhum',
      salada: 'Nenhuma',
      molho: 'Nenhum',
      acompanhamento: 'Lata 350ml'
    },
    removableIngredients: [],
    additionals: []
  },
  {
    id: 502,
    catId: 5,
    name: 'Cerveja Long Neck 330ml',
    price: 9.00,
    desc: 'Heineken, Stella Artois ou Corona Extra',
    image: 'https://images.unsplash.com/photo-1608270146313-bf1516e0f340?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 25,
    hasStockLimit: true,
    ingredients: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Nenhum',
      frios: 'Nenhum',
      salada: 'Nenhuma',
      molho: 'Nenhum',
      acompanhamento: 'Garrafa 330ml'
    },
    removableIngredients: [],
    additionals: []
  }
];

export const neighborhoods = [
  { name: 'Parque 35', fee: 4.00 },
  { name: 'Centro', fee: 5.00 },
  { name: 'Colina', fee: 7.00 },
  { name: 'Ermo', fee: 6.00 },
  { name: 'Cohab', fee: 7.00 },
  { name: 'Fatima', fee: 8.00 },
  { name: 'Santa Rita', fee: 9.00 },
  { name: 'Jardim dos Lagos', fee: 8.00 }
];

export const initialMotoboys = [
  { id: 1, name: 'Cleber Ribeiro', baseFee: 40.00, phone: '(51) 98765-4321', active: true, deliveries: 4, deliveryFeesTotal: 26.00 },
  { id: 2, name: 'Rodrigo Silveira', baseFee: 40.00, phone: '(51) 99123-4567', active: true, deliveries: 3, deliveryFeesTotal: 21.00 }
];

