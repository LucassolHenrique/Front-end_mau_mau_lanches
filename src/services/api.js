// Camada de serviço preparada para integrar com o backend Node.js / PostgreSQL da Sprint 2
// Atualmente persiste no localStorage para salvar criações, edições e exclusões mesmo atualizando a tela.

import { initialCategories, initialProducts, neighborhoods } from '../data/initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'komanda_categories_v2',
  PRODUCTS: 'komanda_products_v2',
  ORDERS: 'komanda_orders_v2'
};

// Inicialização com dados padrão caso o localStorage esteja vazio
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    // Adiciona campo de controle de estoque diário para cada produto
    const productsWithStock = initialProducts.map(p => ({
      ...p,
      stockQuantity: p.isCombo ? 15 : (p.catId === 2 ? 10 : 20), // Ex: restam 10 lanches de carne
      hasStockLimit: true
    }));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsWithStock));
  }
}

initStorage();

export const api = {
  // --- CATEGORIAS ---
  async getCategories() {
    initStorage();
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return JSON.parse(data) || [];
  },

  async toggleCategory(id) {
    const categories = await api.getCategories();
    const updated = categories.map(c => c.id === id ? { ...c, active: !c.active } : c);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    return updated;
  },

  // --- PRODUTOS (CRUD COMPLETO) ---
  async getProducts() {
    initStorage();
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return JSON.parse(data) || [];
  },

  async createProduct(newProductData) {
    const products = await api.getProducts();
    const newProduct = {
      ...newProductData,
      id: Date.now(),
      active: true,
      price: parseFloat(newProductData.price) || 0,
      stockQuantity: parseInt(newProductData.stockQuantity, 10) || 10,
      hasStockLimit: newProductData.hasStockLimit ?? true,
      ingredients: newProductData.ingredients || [],
      removableIngredients: newProductData.removableIngredients || [],
      additionals: newProductData.additionals || [
        { id: 'bacon', name: 'Bacon fatiado crocante', price: 5.00 },
        { id: 'queijo', name: 'Queijo duplo', price: 4.50 },
        { id: 'ovo', name: 'Ovo frito na chapa', price: 3.00 }
      ],
      image: newProductData.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  async updateProduct(id, updatedData) {
    const products = await api.getProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedData,
          price: parseFloat(updatedData.price) ?? p.price,
          stockQuantity: parseInt(updatedData.stockQuantity, 10) ?? p.stockQuantity
        };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  async deleteProduct(id) {
    const products = await api.getProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  async toggleProductStatus(id) {
    const products = await api.getProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, active: !p.active };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  // Dá baixa no estoque ao concluir pedidos
  async decrementProductStock(orderItems) {
    const products = await api.getProducts();
    const updated = products.map(p => {
      const orderItem = orderItems.find(item => item.id === p.id);
      if (orderItem && p.hasStockLimit) {
        const remaining = Math.max(0, (p.stockQuantity || 0) - orderItem.quantity);
        return {
          ...p,
          stockQuantity: remaining,
          active: remaining === 0 ? false : p.active // Desativa automaticamente se esgotar a carne/insumo!
        };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  // Reset para dados de fábrica
  async resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    initStorage();
    return {
      categories: await api.getCategories(),
      products: await api.getProducts()
    };
  }
};
