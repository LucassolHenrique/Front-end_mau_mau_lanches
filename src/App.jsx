import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag,
  Boxes, 
  Bike, 
  BarChart3, 
  Plus, 
  RotateCcw,
  CheckCircle,
  Clock
} from 'lucide-react';

import { api } from './services/api';
import { neighborhoods } from './data/initialData';
import AccessibilityBar from './components/AccessibilityBar';
import CategorySection from './components/CategorySection';
import ProductModal from './components/ProductModal';
import ProductEditModal from './components/ProductEditModal';
import OrderSummary from './components/OrderSummary';

export default function App() {
  // Ajustes de Visualizacao e Acessibilidade (posicionados discretamente no cabecalho)
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);

  // Navegacao: Cardapio sozinho ou Pedidos com comanda ao lado
  const [activeTab, setActiveTab] = useState('cardapio');
  const [deliveryTime, setDeliveryTime] = useState('40 min');
  const [dashPeriod, setDashPeriod] = useState('hoje');

  // Estado dos dados (persistidos via camada de API)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modais
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Comanda e Pedidos
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('delivery');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Parque 35');
  const [clientStreet, setClientStreet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [cashGiven, setCashGiven] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  // Historico de Pedidos Fechados
  const [closedOrders, setClosedOrders] = useState([
    { id: 101, date: '24/09', time: '18:45', type: 'Entrega (Parque 35)', items: '1x Xis Salada Especial, 1x Refri Lata', total: 38.00, payment: 'PIX' },
    { id: 102, date: '24/09', time: '19:20', type: 'Balcao', items: '1x Combo Mau Mau Supremo', total: 44.90, payment: 'Debito' },
    { id: 103, date: '24/09', time: '20:05', type: 'Entrega (Centro)', items: '1x Xis Coracao com Bacon', total: 39.00, payment: 'Dinheiro' }
  ]);

  // Carregamento de dados assincronos
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts()
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const showFeedback = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // 1. Toggle Categoria
  const handleToggleCategory = async (catId) => {
    const updated = await api.toggleCategory(catId);
    setCategories(updated);
    const cat = updated.find(c => c.id === catId);
    showFeedback(cat?.active ? `Categoria "${cat.name}" ativada.` : `Categoria "${cat.name}" pausada.`);
  };

  // 2. Toggle Produto
  const handleToggleProduct = async (prodId) => {
    const updated = await api.toggleProductStatus(prodId);
    setProducts(updated);
    const prod = updated.find(p => p.id === prodId);
    showFeedback(prod?.active ? `Item "${prod.name}" liberado para venda.` : `Item "${prod.name}" pausado.`);
  };

  // 3. Duplicar Alimento
  const handleDuplicateProduct = async (prod) => {
    const newProductData = {
      ...prod,
      name: `${prod.name} (Copia)`,
      active: true
    };
    const updated = await api.createProduct(newProductData);
    setProducts(updated);
    showFeedback(`Item "${prod.name}" clonado no cardapio.`);
  };

  // 4. Salvar Produto (Novo ou Edicao)
  const handleSaveProduct = async (productData) => {
    if (isCreatingProduct) {
      const updated = await api.createProduct(productData);
      setProducts(updated);
      setIsCreatingProduct(false);
      showFeedback(`Item "${productData.name}" cadastrado com sucesso.`);
    } else {
      const updated = await api.updateProduct(productData.id, productData);
      setProducts(updated);
      setEditingProduct(null);
      showFeedback(`Item "${productData.name}" atualizado.`);
    }
  };

  // 5. Salvar como Novo Prato (Variacao independente)
  const handleSaveAsNewProduct = async (newProductData) => {
    const updated = await api.createProduct(newProductData);
    setProducts(updated);
    setEditingProduct(null);
    showFeedback(`Novo item "${newProductData.name}" adicionado ao cardapio.`);
  };

  // 6. Excluir Produto
  const handleDeleteProduct = async (prodId) => {
    const updated = await api.deleteProduct(prodId);
    setProducts(updated);
    setEditingProduct(null);
    showFeedback('Item excluido do cardapio.');
  };

  // 7. Abrir modal para novo produto
  const handleOpenAddProduct = (defaultCatId = 2) => {
    setIsCreatingProduct(true);
    setEditingProduct({ catId: defaultCatId });
  };

  // 8. Confirmar item personalizado na comanda
  const handleConfirmItemToOrder = (customizedItem) => {
    setOrderItems(prev => [customizedItem, ...prev]);
    showFeedback(`${customizedItem.quantity}x ${customizedItem.name} adicionado a comanda.`);
  };

  // 9. Remover item da comanda
  const handleRemoveItem = (cartItemId) => {
    setOrderItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  // 10. Fechar Comanda e dar baixa de estoque
  const handleFinishOrder = async () => {
    if (orderItems.length === 0) return alert('Selecione itens para o pedido.');

    const itemsSubtotal = orderItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const deliveryFee = orderType === 'delivery'
      ? (neighborhoods.find(n => n.name === selectedNeighborhood)?.fee || 0)
      : 0;
    const orderTotal = itemsSubtotal + deliveryFee;

    const updatedProducts = await api.decrementProductStock(orderItems);
    setProducts(updatedProducts);

    const newOrder = {
      id: Math.floor(100 + Math.random() * 900),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: orderType === 'delivery' ? `Entrega (${selectedNeighborhood})` : 'Balcao',
      items: orderItems.map(i => `${i.quantity}x ${i.name}`).join(', '),
      total: orderTotal,
      payment: paymentMethod
    };

    setClosedOrders([newOrder, ...closedOrders]);
    setOrderItems([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3500);
  };

  const handleResetDefaults = async () => {
    if (confirm('Confirma restaurar os dados originais do cardapio?')) {
      const data = await api.resetToDefaults();
      setCategories(data.categories);
      setProducts(data.products);
      showFeedback('Cardapio restaurado para o padrao.');
    }
  };

  const fontSizeClass = `font-${fontSize}`;
  const totalRevenue = closedOrders.reduce((acc, o) => acc + o.total, 0);

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando dados do sistema...</div>;
  }

  return (
    <div className={`${fontSizeClass} ${highContrast ? 'high-contrast-mode' : ''}`} style={{ minHeight: '100vh', padding: '16px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* CABECALHO SOBRIO COM ACESSIBILIDADE NO CANTO DESCRITIVO CORRETO */}
        <header style={{
          background: '#ffffff',
          border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* Identificacao da Lancheria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              background: '#0f172a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '0.5px'
            }}>
              MM
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25em', fontWeight: '700', color: '#0f172a' }}>
                  Mau Mau Lanches
                </h1>
                <span style={{ 
                  fontSize: '0.7em', 
                  color: '#475569', 
                  background: '#f1f5f9', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  Komanda
                </span>
              </div>
              <p style={{ fontSize: '0.8em', color: '#64748b' }}>
                Rua Vinte de Setembro, 1151 · Parque 35, Guaiba - RS
              </p>
            </div>
          </div>

          {/* Canto Direito: Acessibilidade Discreta + Tempo de Entrega */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Campo de Acessibilidade Discreto no Canto */}
            <AccessibilityBar 
              fontSize={fontSize}
              setFontSize={setFontSize}
              highContrast={highContrast}
              setHighContrast={setHighContrast}
            />

            {/* Tempo Medio de Espera */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid #e2e8f0' }}>
              <Clock size={16} color="#64748b" />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7em', color: '#64748b', display: 'block' }}>Tempo Estimado</span>
                <span style={{ fontSize: '0.9em', fontWeight: '700', color: '#0f172a' }}>{deliveryTime}</span>
              </div>
              <button 
                onClick={() => {
                  const n = prompt('Novo tempo medio de espera:', deliveryTime);
                  if (n) setDeliveryTime(n);
                }}
                style={{ 
                  background: '#f1f5f9', 
                  color: '#334155', 
                  border: '1px solid #cbd5e1', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.75em',
                  fontWeight: '600'
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </header>

        {/* FEEDBACK VISUAL TOAST DISCRETO */}
        {notification && (
          <div style={{
            background: '#0f172a',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '6px',
            marginBottom: '14px',
            fontWeight: '600',
            fontSize: '0.9em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} color="#4ade80" />
            <span>{notification}</span>
          </div>
        )}

        {/* NAVEGACAO DE ABAS SOBRIA */}
        <nav style={{ 
          display: 'flex', 
          gap: '4px', 
          marginBottom: '18px', 
          borderBottom: '1px solid #e2e8f0', 
          paddingBottom: '6px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'cardapio', label: 'Cardapio (Produtos e Ficha Tecnica)' },
            { id: 'pedido', label: 'Nova Comanda / Pedido' },
            { id: 'estoque', label: 'Estoque de Insumos' },
            { id: 'motoboy', label: 'Acerto Motoboys' },
            { id: 'caixa', label: 'Dashboard e Relatorios' }
          ].map(t => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.9em',
                  fontWeight: isActive ? '700' : '500',
                  background: isActive ? '#0f172a' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  whiteSpace: 'nowrap'
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* ============================================================== */}
        {/* 1. ABA DE CARDAPIO (SOZINHO, SEM COMANDA AO LADO)             */}
        {/* ============================================================== */}
        {activeTab === 'cardapio' && (
          <div>
            {/* Barra de Acoes do Cardapio */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.2em', fontWeight: '700', color: '#0f172a' }}>
                  Gestao de Cardapio e Ficha Tecnica
                </h2>
                <p style={{ fontSize: '0.85em', color: '#64748b' }}>
                  Visualize os ingredientes detalhados (pao, carne, queijo), ative/pause itens e crie novas variacoes.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpenAddProduct(2)}
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.85em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={15} />
                  <span>Novo Item no Cardapio</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  title="Restaurar cardapio inicial"
                  style={{
                    background: '#ffffff',
                    color: '#64748b',
                    border: '1px solid #cbd5e1',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8em',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Restaurar Padrao</span>
                </button>
              </div>
            </div>

            {/* Lista das Categorias em Tela Inteira */}
            <div>
              {categories.map(cat => {
                const catProducts = products.filter(p => p.catId === cat.id);
                return (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    products={catProducts}
                    onToggleCategory={handleToggleCategory}
                    onSelectProduct={(p) => setSelectedProductForModal(p)}
                    onToggleProduct={handleToggleProduct}
                    onDuplicateProduct={handleDuplicateProduct}
                    onEditProduct={(p) => {
                      setIsCreatingProduct(false);
                      setEditingProduct(p);
                    }}
                    onAddNewProduct={(catId) => handleOpenAddProduct(catId)}
                    highContrast={highContrast}
                    fontSizeClass={fontSizeClass}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. ABA DE NOVO PEDIDO (CARDAPIO ESQUERDA + COMANDA DIREITA)   */}
        {/* ============================================================== */}
        {activeTab === 'pedido' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(340px, 1fr)', gap: '20px', alignItems: 'start' }}>
            
            {/* LADO ESQUERDO: SELECAO RAPIDA DE ITENS PARA O PEDIDO */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
              <div style={{ marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                <h2 style={{ fontSize: '1.15em', fontWeight: '700', color: '#0f172a' }}>
                  Selecione os Itens para o Pedido
                </h2>
                <p style={{ fontSize: '0.8em', color: '#64748b' }}>
                  Clique em "Pedir" para personalizar os ingredientes ou adicionar diretamente.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {categories.filter(c => c.active).map(cat => {
                  const catProducts = products.filter(p => p.catId === cat.id && p.active);
                  if (catProducts.length === 0) return null;

                  return (
                    <div key={cat.id}>
                      <span style={{
                        display: 'block',
                        fontSize: '0.8em',
                        fontWeight: '700',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px'
                      }}>
                        {cat.name}
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {catProducts.map(p => {
                          const isOutOfStock = p.stockQuantity !== undefined && p.stockQuantity === 0;
                          return (
                            <div 
                              key={p.id}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 12px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                background: '#fafafa'
                              }}
                            >
                              <div style={{ flex: 1, paddingRight: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '0.95em', fontWeight: '600', color: '#0f172a' }}>
                                    {p.name}
                                  </span>
                                  {p.stockQuantity !== undefined && p.stockQuantity <= 3 && !isOutOfStock && (
                                    <span style={{ fontSize: '0.7em', color: '#b45309', background: '#fef3c7', padding: '1px 6px', borderRadius: '4px', fontWeight: '600' }}>
                                      Restam {p.stockQuantity} un
                                    </span>
                                  )}
                                  {isOutOfStock && (
                                    <span style={{ fontSize: '0.7em', color: '#b91c1c', background: '#fee2e2', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                      Esgotado
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontSize: '0.85em', color: '#059669', fontWeight: '700' }}>
                                  R$ {p.price.toFixed(2)}
                                </span>
                              </div>

                              <button
                                onClick={() => setSelectedProductForModal(p)}
                                disabled={isOutOfStock}
                                style={{
                                  background: isOutOfStock ? '#cbd5e1' : '#0f172a',
                                  color: isOutOfStock ? '#64748b' : '#ffffff',
                                  padding: '6px 14px',
                                  borderRadius: '4px',
                                  fontSize: '0.85em',
                                  fontWeight: '600',
                                  cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                                }}
                              >
                                {isOutOfStock ? 'Indisponivel' : 'Pedir'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LADO DIREITO: COMANDA ABERTA DO PEDIDO */}
            <OrderSummary
              orderItems={orderItems}
              onRemoveItem={handleRemoveItem}
              orderType={orderType}
              setOrderType={setOrderType}
              selectedNeighborhood={selectedNeighborhood}
              setSelectedNeighborhood={setSelectedNeighborhood}
              neighborhoods={neighborhoods}
              clientStreet={clientStreet}
              setClientStreet={setClientStreet}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cashGiven={cashGiven}
              setCashGiven={setCashGiven}
              onFinishOrder={handleFinishOrder}
              orderSuccess={orderSuccess}
              highContrast={highContrast}
              fontSizeClass={fontSizeClass}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. ABA DE ESTOQUE                                             */}
        {/* ============================================================== */}
        {activeTab === 'estoque' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.2em', fontWeight: '700', marginBottom: '6px' }}>
              Controle de Saldo e Limite de Vendas
            </h2>
            <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '16px' }}>
              Ao finalizar comandas, as porcoes de lanches sao deduzidas automaticamente. Itens zerados sao pausados para evitar pedidos sem insumo.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9em' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '8px' }}>Item</th>
                  <th style={{ padding: '8px' }}>Categoria</th>
                  <th style={{ padding: '8px' }}>Porcoes Restantes Hoje</th>
                  <th style={{ padding: '8px' }}>Situacao</th>
                  <th style={{ padding: '8px' }}>Ajuste</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const isOut = p.stockQuantity !== undefined && p.stockQuantity === 0;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 8px', fontWeight: '600' }}>{p.name}</td>
                      <td style={{ padding: '10px 8px', color: '#64748b' }}>
                        {categories.find(c => c.id === p.catId)?.name}
                      </td>
                      <td style={{ padding: '10px 8px', fontWeight: '700' }}>
                        {p.stockQuantity !== undefined ? `${p.stockQuantity} un` : 'Ilimitado'}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        {isOut ? (
                          <span style={{ color: '#b91c1c', fontSize: '0.8em', fontWeight: '700', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                            Esgotado
                          </span>
                        ) : !p.active ? (
                          <span style={{ color: '#64748b', fontSize: '0.8em', fontWeight: '600', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                            Pausado
                          </span>
                        ) : (
                          <span style={{ color: '#15803d', fontSize: '0.8em', fontWeight: '600', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>
                            Disponivel
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        <button
                          onClick={() => {
                            const q = prompt(`Nova quantidade disponivel hoje para "${p.name}":`, p.stockQuantity || 10);
                            if (q !== null) {
                              api.updateProduct(p.id, { stockQuantity: parseInt(q, 10) || 0, active: parseInt(q, 10) > 0 }).then(setProducts);
                            }
                          }}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8em',
                            fontWeight: '600'
                          }}
                        >
                          Ajustar Saldo
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. ABA DE MOTOBOYS                                            */}
        {/* ============================================================== */}
        {activeTab === 'motoboy' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.2em', fontWeight: '700', marginBottom: '4px' }}>Acerto dos Motoboys</h2>
            <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '16px' }}>
              Diaria fixa da noite (R$ 40,00) somada a taxa integral dos bairros atendidos.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {[
                { name: 'Cleber Ribeiro', base: 40, trips: 4, fees: 26 },
                { name: 'Rodrigo Silveira', base: 40, trips: 3, fees: 21 }
              ].map((m, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '14px', background: '#fafafa' }}>
                  <h3 style={{ fontSize: '1em', fontWeight: '700', marginBottom: '8px' }}>{m.name}</h3>
                  <div style={{ fontSize: '0.85em', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>Diaria fixa: R$ {m.base.toFixed(2)}</div>
                    <div>Viagens realizadas: {m.trips}</div>
                    <div>Taxas acumuladas: R$ {m.fees.toFixed(2)}</div>
                    <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #e2e8f0', fontWeight: '700', fontSize: '1em', color: '#059669' }}>
                      Total a pagar: R$ {(m.base + m.fees).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. ABA DE DASHBOARD                                           */}
        {/* ============================================================== */}
        {activeTab === 'caixa' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.8em', color: '#64748b' }}>Faturamento Total</div>
                <div style={{ fontSize: '1.4em', fontWeight: '800', color: '#059669', marginTop: '2px' }}>
                  R$ {totalRevenue.toFixed(2)}
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.8em', color: '#64748b' }}>Pedidos Registrados</div>
                <div style={{ fontSize: '1.4em', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
                  {closedOrders.length}
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.8em', color: '#64748b' }}>Ticket Medio</div>
                <div style={{ fontSize: '1.4em', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
                  R$ {(totalRevenue / (closedOrders.length || 1)).toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontSize: '1em', fontWeight: '700', marginBottom: '10px' }}>Extrato de Pedidos</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85em' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px' }}>#</th>
                    <th style={{ padding: '8px' }}>Horario</th>
                    <th style={{ padding: '8px' }}>Tipo</th>
                    <th style={{ padding: '8px' }}>Itens</th>
                    <th style={{ padding: '8px' }}>Pagamento</th>
                    <th style={{ padding: '8px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {closedOrders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '8px', fontWeight: '600' }}>#{o.id}</td>
                      <td style={{ padding: '8px', color: '#64748b' }}>{o.time}</td>
                      <td style={{ padding: '8px' }}>{o.type}</td>
                      <td style={{ padding: '8px' }}>{o.items}</td>
                      <td style={{ padding: '8px', color: '#64748b' }}>{o.payment}</td>
                      <td style={{ padding: '8px', fontWeight: '700' }}>R$ {o.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL DE PERSONALIZACAO DE LANCHE */}
        {selectedProductForModal && (
          <ProductModal
            product={selectedProductForModal}
            onClose={() => setSelectedProductForModal(null)}
            onConfirm={handleConfirmItemToOrder}
            highContrast={highContrast}
            fontSizeClass={fontSizeClass}
          />
        )}

        {/* MODAL DE EDICAO / CRIACAO / SALVAR COMO NOVO / EXCLUSAO */}
        {(editingProduct || isCreatingProduct) && (
          <ProductEditModal
            product={isCreatingProduct ? null : editingProduct}
            categories={categories}
            onClose={() => {
              setEditingProduct(null);
              setIsCreatingProduct(false);
            }}
            onSave={handleSaveProduct}
            onSaveAsNew={handleSaveAsNewProduct}
            onDelete={handleDeleteProduct}
            highContrast={highContrast}
            fontSizeClass={fontSizeClass}
          />
        )}

      </div>
    </div>
  );
}
