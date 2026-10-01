// Camada de servico com persistencia local e metodos REST assincronos
import { initialCategories, initialProducts, initialMotoboys, neighborhoods } from '../data/initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'komanda_categories_v3',
  PRODUCTS: 'komanda_products_v3',
  ORDERS: 'komanda_orders_v3',
  MOTOBOYS: 'komanda_motoboys_v3'
};

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    const productsWithStock = initialProducts.map(p => ({
      ...p,
      stockQuantity: p.stockQuantity ?? (p.isCombo ? 15 : (p.catId === 2 ? 10 : 20)),
      hasStockLimit: true
    }));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsWithStock));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MOTOBOYS)) {
    localStorage.setItem(STORAGE_KEYS.MOTOBOYS, JSON.stringify(initialMotoboys));
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

  // --- PRODUTOS ---
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
      ingredients: newProductData.ingredients || {},
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

  async decrementProductStock(orderItems) {
    const products = await api.getProducts();
    const updated = products.map(p => {
      const orderItem = orderItems.find(item => item.id === p.id);
      if (orderItem && p.hasStockLimit) {
        const remaining = Math.max(0, (p.stockQuantity || 0) - orderItem.quantity);
        return {
          ...p,
          stockQuantity: remaining,
          active: remaining === 0 ? false : p.active
        };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  // --- MOTOBOYS (GESTAO E ACERTO) ---
  async getMotoboys() {
    initStorage();
    const data = localStorage.getItem(STORAGE_KEYS.MOTOBOYS);
    return JSON.parse(data) || [];
  },

  async createMotoboy(motoboyData) {
    const motoboys = await api.getMotoboys();
    const newMotoboy = {
      id: Date.now(),
      name: motoboyData.name.trim(),
      phone: motoboyData.phone ? motoboyData.phone.trim() : '',
      baseFee: parseFloat(motoboyData.baseFee) || 40.00,
      active: true,
      deliveries: 0,
      deliveryFeesTotal: 0.00
    };
    const updated = [newMotoboy, ...motoboys];
    localStorage.setItem(STORAGE_KEYS.MOTOBOYS, JSON.stringify(updated));
    return updated;
  },

  async toggleMotoboy(id) {
    const motoboys = await api.getMotoboys();
    const updated = motoboys.map(m => m.id === id ? { ...m, active: !m.active } : m);
    localStorage.setItem(STORAGE_KEYS.MOTOBOYS, JSON.stringify(updated));
    return updated;
  },

  async deleteMotoboy(id) {
    const motoboys = await api.getMotoboys();
    const updated = motoboys.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MOTOBOYS, JSON.stringify(updated));
    return updated;
  },

  async recordMotoboyDelivery(motoboyId, deliveryFee) {
    const motoboys = await api.getMotoboys();
    const updated = motoboys.map(m => {
      if (m.id === Number(motoboyId)) {
        return {
          ...m,
          deliveries: (m.deliveries || 0) + 1,
          deliveryFeesTotal: (m.deliveryFeesTotal || 0) + deliveryFee
        };
      }
      return m;
    });
    localStorage.setItem(STORAGE_KEYS.MOTOBOYS, JSON.stringify(updated));
    return updated;
  },

  // Reset para padrao de fabrica
  async resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.MOTOBOYS);
    initStorage();
    return {
      categories: await api.getCategories(),
      products: await api.getProducts(),
      motoboys: await api.getMotoboys()
    };
  }
};
