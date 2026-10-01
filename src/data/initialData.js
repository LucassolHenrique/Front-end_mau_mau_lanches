// Dados iniciais estruturados com ficha tecnica de ingredientes (pao, carne, queijo, salada, molhos)

export const initialCategories = [
  { 
    id: 1, 
    name: 'Combos e Promocoes', 
    active: true, 
    isCombo: true,
    description: 'Combinacoes completas com lanche, acompanhamento e bebida' 
  },
  { 
    id: 2, 
    name: 'Xis Gaucho Tradicional', 
    active: true, 
    isCombo: false,
    description: 'Prensados na chapa com composicao completa de ingredientes' 
  },
  { 
    id: 3, 
    name: 'Cachorro-quente', 
    active: true, 
    isCombo: false,
    description: 'Pao especial, salsicha ao molho caseiro e acompanhamentos' 
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
    description: 'Refrigerantes em lata e garrafa, cervejas e sucos' 
  },
];

export const initialProducts = [
  // COMBOS
  {
    id: 101,
    catId: 1,
    name: 'Combo Mau Mau Supremo',
    price: 44.90,
    desc: '1x Xis Salada Especial, 1x Batata Frita individual 200g e 1x Refrigerante Lata 350ml',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    stockQuantity: 15,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Xis Tradicional',
      carne: 'Hamburguer Bovino Artesanal 200g',
      queijo: 'Queijo Prato Fatiado',
      frios: 'Presunto Cozido',
      salada: 'Alface Americana e Tomate',
      molho: 'Maionese Temperada da Casa',
      acompanhamento: 'Batata Frita 200g e Refrigerante Lata'
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
    desc: '2x Xis Tradicionais, 1x Batata Grande 400g com Cheddar e Bacon e 1x Refrigerante 2L',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    stockQuantity: 10,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Xis Tradicional (2 un)',
      carne: 'Hamburguer Bovino Artesanal (2 un)',
      queijo: 'Queijo Prato e Cheddar Cremoso',
      frios: 'Bacon em Cubos',
      salada: 'Alface e Tomate',
      molho: 'Maionese da Casa',
      acompanhamento: 'Batata Frita 400g e Refrigerante 2L'
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
    desc: 'Pao prensado gigante, hamburguer bovino 200g, queijo prato, presunto, tomate, alface e maionese',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 12,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Xis Prensado',
      carne: 'Hamburguer Bovino 200g',
      queijo: 'Queijo Prato',
      frios: 'Presunto',
      salada: 'Tomate e Alface',
      molho: 'Maionese Caseira',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Tomate', 'Sem Alface', 'Sem Maionese', 'Sem Presunto', 'Sem Milho e Ervilha'],
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
    desc: 'Pao prensado, coracao de frango grelhado no alho, fatias de bacon, queijo prato duplo e maionese',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 8,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Xis Prensado',
      carne: 'Coracao de Frango 220g ao Alho',
      queijo: 'Queijo Prato Duplo',
      frios: 'Bacon Fatiado Grelhado',
      salada: 'Tomate e Alface',
      molho: 'Maionese Caseira',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Alho', 'Sem Bacon', 'Sem Tomate', 'Sem Alface', 'Sem Maionese'],
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
    desc: 'Hamburguer bovino, file de frango, bacon fatiado, calabresa, ovo frito, queijo duplo, presunto e salada',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 6,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Xis Prensado',
      carne: 'Hamburguer 150g e File de Frango',
      queijo: 'Queijo Prato Duplo',
      frios: 'Bacon, Calabresa e Presunto',
      salada: 'Alface, Tomate e Ovo Frito',
      molho: 'Maionese Especial',
      acompanhamento: 'Nenhum'
    },
    removableIngredients: ['Sem Calabresa', 'Sem Frango', 'Sem Bacon', 'Sem Ovo', 'Sem Tomate', 'Sem Alface'],
    additionals: [
      { id: 'cheddar', name: 'Cheddar cremoso', price: 4.50 },
      { id: 'cebola_caramelizada', name: 'Cebola caramelizada', price: 4.00 }
    ]
  },

  // CACHORRO-QUENTE
  {
    id: 301,
    catId: 3,
    name: 'Cachorro-quente Especial Prensado',
    price: 22.00,
    desc: 'Pao tradicional levemente prensado, 2 salsichas ao molho caseiro, queijo derretido, milho, ervilha e batata palha',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 20,
    hasStockLimit: true,
    composition: {
      pao: 'Pao de Cachorro-quente',
      carne: '2 Salsichas ao Molho Vermelho',
      queijo: 'Queijo Prato Ralado',
      frios: 'Nenhum',
      salada: 'Milho e Ervilha',
      molho: 'Molho de Tomate Caseiro e Maionese',
      acompanhamento: 'Batata Palha Crocante'
    },
    removableIngredients: ['Sem Batata Palha', 'Sem Milho', 'Sem Ervilha', 'Sem Molho'],
    additionals: [
      { id: 'salsicha_extra', name: '1 Salsicha extra', price: 3.50 },
      { id: 'bacon', name: 'Bacon em cubos', price: 4.50 },
      { id: 'queijo_ralado', name: 'Queijo ralado extra', price: 3.00 }
    ]
  },

  // PORCOES
  {
    id: 401,
    catId: 4,
    name: 'Batata Frita Suprema 500g',
    price: 28.00,
    desc: '500g de batatas selecionadas cobertas com molho cheddar cremoso e bacon frito em cubos',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 15,
    hasStockLimit: true,
    composition: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Molho Cheddar Cremoso',
      frios: 'Bacon Frito em Cubos',
      salada: 'Nao se aplica',
      molho: 'Cheddar',
      acompanhamento: '500g de Batata Frita Palito'
    },
    removableIngredients: ['Sem Cheddar', 'Sem Bacon'],
    additionals: [
      { id: 'molho_alho', name: 'Molho especial de alho', price: 3.50 },
      { id: 'barbecue', name: 'Molho Barbecue defumado', price: 3.00 }
    ]
  },
  {
    id: 402,
    catId: 4,
    name: 'Espeto de Alcatra com Queijo Coalho',
    price: 18.00,
    desc: 'Cortes nobres de alcatra grelhados com queijo coalho tostado na brasa, farofa e vinagrete',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 10,
    hasStockLimit: true,
    composition: {
      pao: 'Nao se aplica',
      carne: 'Alcatra Grelhada 180g',
      queijo: 'Queijo Coalho Grelhado',
      frios: 'Nao se aplica',
      salada: 'Vinagrete de Tomate e Cebola',
      molho: 'Nenhum',
      acompanhamento: 'Farofa Temperada'
    },
    removableIngredients: ['Sem Farofa', 'Sem Vinagrete'],
    additionals: [
      { id: 'pao_alho', name: 'Pao de alho grelhado', price: 6.00 }
    ]
  },

  // BEBIDAS
  {
    id: 501,
    catId: 5,
    name: 'Refrigerante Lata 350ml',
    price: 6.00,
    desc: 'Coca-Cola Tradicional, Coca Zero, Guarana Antarctica ou Fanta Laranja',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    active: true,
    stockQuantity: 40,
    hasStockLimit: true,
    composition: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Nao se aplica',
      frios: 'Nao se aplica',
      salada: 'Nao se aplica',
      molho: 'Nao se aplica',
      acompanhamento: 'Lata 350ml Gelada'
    },
    removableIngredients: [],
    additionals: [
      { id: 'copo_gelo', name: 'Copo descartavel com gelo e limao', price: 1.50 }
    ]
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
    composition: {
      pao: 'Nao se aplica',
      carne: 'Nao se aplica',
      queijo: 'Nao se aplica',
      frios: 'Nao se aplica',
      salada: 'Nao se aplica',
      molho: 'Nao se aplica',
      acompanhamento: 'Garrafa 330ml Gelada'
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
