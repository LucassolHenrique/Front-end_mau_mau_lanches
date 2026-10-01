// Dados iniciais com fotos, grupos de complementos e combos no modelo iFood

export const initialCategories = [
  { 
    id: 1, 
    name: 'Combos & Promoções', 
    active: true, 
    isCombo: true,
    description: 'Ofertas completas com lanche, acompanhamento e bebida' 
  },
  { 
    id: 2, 
    name: 'Xis Gaúcho Tradicional', 
    active: true, 
    isCombo: false,
    description: 'Prensados na chapa com maionese caseira e ingredientes selecionados' 
  },
  { 
    id: 3, 
    name: 'Cachorro-quente', 
    active: true, 
    isCombo: false,
    description: 'Pão fofinho com molho especial de tomate e tempero caseiro' 
  },
  { 
    id: 4, 
    name: 'Porções & Acompanhamentos', 
    active: true, 
    isCombo: false,
    description: 'Porções para compartilhar ou turbinar seu lanche' 
  },
  { 
    id: 5, 
    name: 'Bebidas Geladas', 
    active: true, 
    isCombo: false,
    description: 'Refrigerantes, cervejas e sucos' 
  },
];

export const initialProducts = [
  // COMBOS
  {
    id: 101,
    catId: 1,
    name: 'Combo Mau Mau Supremo',
    price: 44.90,
    desc: '1x Xis Salada Especial + 1x Batata Frita individual 200g + 1x Coca-Cola Lata 350ml',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    ingredients: ['Pão de Xis', 'Hambúrguer 200g', 'Queijo', 'Presunto', 'Alface', 'Tomate', 'Maionese', 'Batata Frita', 'Refrigerante Lata'],
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
    name: 'Combo Casal Gaúcho',
    price: 78.00,
    desc: '2x Xis à sua escolha + 1x Batata Frita Grande 400g com Cheddar & Bacon + 1x Guaraná 2L',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCombo: true,
    ingredients: ['2x Xis', 'Batata 400g', 'Cheddar', 'Bacon', 'Guaraná 2L'],
    removableIngredients: ['Sem Cheddar na Batata', 'Sem Bacon na Batata'],
    additionals: [
      { id: 'bacon', name: 'Bacon extra', price: 5.00 },
      { id: 'queijo', name: 'Queijo extra nos xis', price: 6.00 }
    ]
  },

  // XIS GAÚCHO
  {
    id: 201,
    catId: 2,
    name: 'Xis Salada Tradicional',
    price: 28.00,
    desc: 'Pão prensado gigante, hambúrguer artesanal 200g, queijo prato derretido, presunto, tomate, alface e maionese especial da casa',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Pão de Xis', 'Hambúrguer 200g', 'Queijo', 'Presunto', 'Tomate', 'Alface', 'Maionese'],
    removableIngredients: ['Sem Tomate', 'Sem Alface', 'Sem Maionese', 'Sem Presunto', 'Sem Milho/Ervilha'],
    additionals: [
      { id: 'bacon', name: 'Bacon crocante', price: 5.00 },
      { id: 'queijo', name: 'Queijo duplo', price: 4.50 },
      { id: 'ovo', name: 'Ovo frito', price: 3.00 },
      { id: 'burger_extra', name: 'Hambúrguer extra 150g', price: 8.00 },
      { id: 'maionese_extra', name: 'Maionese verde extra', price: 3.00 }
    ]
  },
  {
    id: 202,
    catId: 2,
    name: 'Xis Coração com Bacon',
    price: 34.00,
    desc: 'Pão prensado, coração de frango grelhado no alho, fatias generosas de bacon, queijo prato duplo e maionese',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Pão de Xis', 'Coração de Frango 220g', 'Bacon Fatiado', 'Queijo Duplo', 'Maionese', 'Tomate', 'Alface'],
    removableIngredients: ['Sem Alho', 'Sem Tomate', 'Sem Alface', 'Sem Maionese'],
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
    desc: 'Hambúrguer artesanal, iscas de filé de frango, bacon fatiado, calabresa fatiada, ovo, queijo duplo, presunto, alface e tomate',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Pão de Xis', 'Carne 150g', 'Frango', 'Calabresa', 'Bacon', 'Ovo', 'Queijo', 'Presunto', 'Salada', 'Maionese'],
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
    desc: 'Pão tradicional levemente prensado, 2 salsichas ao molho caseiro de tomate, queijo derretido, milho, ervilha e batata palha crocante',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Pão de Hot Dog', '2 Salsichas', 'Molho Vermelho', 'Queijo', 'Milho', 'Ervilha', 'Batata Palha'],
    removableIngredients: ['Sem Batata Palha', 'Sem Milho', 'Sem Ervilha', 'Sem Molho'],
    additionals: [
      { id: 'salsicha_extra', name: '1 Salsicha extra', price: 3.50 },
      { id: 'bacon', name: 'Bacon em cubos', price: 4.50 },
      { id: 'queijo_ralado', name: 'Queijo ralado extra', price: 3.00 }
    ]
  },

  // PORÇÕES
  {
    id: 401,
    catId: 4,
    name: 'Batata Frita Suprema 500g',
    price: 28.00,
    desc: '500g de batatas selecionadas bem sequinhas e crocantes, cobertas com molho cheddar cremoso e bacon frito em cubos',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Batata 500g', 'Cheddar Cremoso', 'Bacon em Cubos'],
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
    desc: 'Cortes nobres de alcatra grelhados com queijo coalho tostado na brasa, acompanha farofa artesanal e vinagrete',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Alcatra 180g', 'Queijo Coalho', 'Farofa', 'Vinagrete'],
    removableIngredients: ['Sem Farofa', 'Sem Vinagrete'],
    additionals: [
      { id: 'pao_alho', name: '1x Pão de alho na chapa', price: 6.00 }
    ]
  },

  // BEBIDAS
  {
    id: 501,
    catId: 5,
    name: 'Refrigerante Lata 350ml',
    price: 6.00,
    desc: 'Coca-Cola Tradicional, Coca Zero, Guaraná Antarctica ou Fanta Laranja (geladíssimo)',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    active: true,
    ingredients: ['Refrigerante Lata'],
    removableIngredients: [],
    additionals: [
      { id: 'copo_gelo', name: 'Copo descartável com gelo e limão', price: 1.50 }
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
    ingredients: ['Cerveja Long Neck'],
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
  { name: 'Fátima', fee: 8.00 },
  { name: 'Santa Rita', fee: 9.00 },
  { name: 'Jardim dos Lagos', fee: 8.00 }
];
