import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Boxes, 
  Bike, 
  BarChart3, 
  PlusCircle, 
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

import { api } from './services/api';
import { neighborhoods } from './data/initialData';
import AccessibilityBar from './components/AccessibilityBar';
import CategorySection from './components/CategorySection';
import ProductModal from './components/ProductModal';
import ProductEditModal from './components/ProductEditModal';
import OrderSummary from './components/OrderSummary';
import SeniorGuideBanner from './components/SeniorGuideBanner';

export default function App() {
  // Acessibilidade e Facilidade Visual
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);
  const [seniorGuide, setSeniorGuide] = useState(true);

  // Navegação
  const [activeTab, setActiveTab] = useState('cardapio');
  const [deliveryTime, setDeliveryTime] = useState('40 min');
  const [dashPeriod, setDashPeriod] = useState('hoje');

  // Estado das Categorias e Produtos (persistidos via API mock)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modais
  const [selectedProductForModal, setSelectedProductForModal] = useState(null); // Montar lanche (iFood)
  const [editingProduct, setEditingProduct] = useState(null); // Editar produto
  const [isCreatingProduct, setIsCreatingProduct] = useState(false); // Criar novo produto

  // Comanda do Pedido
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('delivery');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Parque 35');
  const [clientStreet, setClientStreet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [cashGiven, setCashGiven] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  // Histórico de Pedidos Fechados
  const [closedOrders, setClosedOrders] = useState([
    { id: 101, date: '24/09', time: '18:45', type: 'Entrega (Parque 35)', items: '1x Xis Salada Especial, 1x Refri Lata', total: 38.00, payment: 'PIX' },
    { id: 102, date: '24/09', time: '19:20', type: 'Balcão', items: '1x Combo Mau Mau Supremo', total: 44.90, payment: 'Débito' },
    { id: 103, date: '24/09', time: '20:05', type: 'Entrega (Centro)', items: '1x Xis Coração com Bacon', total: 39.00, payment: 'Dinheiro' }
  ]);

  // Carrega dados iniciais da API
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

  // Helper de Notificação Visual Rápida
  const showFeedback = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Toggle Categoria Inteira (Ativar / Pausar)
  const handleToggleCategory = async (catId) => {
    const updated = await api.toggleCategory(catId);
    setCategories(updated);
    const cat = updated.find(c => c.id === catId);
    showFeedback(cat?.active 
      ? `Categoria "${cat.name}" foi ATIVADA!` 
      : `Categoria "${cat.name}" foi PAUSADA!`
    );
  };

  // 2. Toggle Produto Individual (Ativar / Pausar)
  const handleToggleProduct = async (prodId) => {
    const updated = await api.toggleProductStatus(prodId);
    setProducts(updated);
    const prod = updated.find(p => p.id === prodId);
    showFeedback(prod?.active 
      ? `"${prod.name}" está ATIVO para vendas!` 
      : `"${prod.name}" foi PAUSADO temporariamente!`
    );
  };

  // 3. Duplicar / Copiar Alimento no Cardápio
  const handleDuplicateProduct = async (prod) => {
    const newProductData = {
      ...prod,
      name: `${prod.name} (Cópia)`,
      active: true
    };
    const updated = await api.createProduct(newProductData);
    setProducts(updated);
    showFeedback(`Alimento "${prod.name}" foi clonado com sucesso!`);
  };

  // 4. Salvar Edição de Produto Existente
  const handleSaveProduct = async (productData) => {
    if (isCreatingProduct) {
      const updated = await api.createProduct(productData);
      setProducts(updated);
      setIsCreatingProduct(false);
      showFeedback(`Novo prato "${productData.name}" cadastrado com sucesso!`);
    } else {
      const updated = await api.updateProduct(productData.id, productData);
      setProducts(updated);
      setEditingProduct(null);
      showFeedback(`Prato "${productData.name}" atualizado com sucesso!`);
    }
  };

  // 5. Salvar como Novo Prato (Cria variação sem alterar o original)
  const handleSaveAsNewProduct = async (newProductData) => {
    const updated = await api.createProduct(newProductData);
    setProducts(updated);
    setEditingProduct(null);
    showFeedback(`Novo prato "${newProductData.name}" salvo no cardápio!`);
  };

  // 6. Excluir Produto Definitivamente
  const handleDeleteProduct = async (prodId) => {
    const updated = await api.deleteProduct(prodId);
    setProducts(updated);
    setEditingProduct(null);
    showFeedback('Prato excluído do cardápio com sucesso!');
  };

  // 7. Abrir formulário para adicionar novo prato em uma categoria
  const handleOpenAddProduct = (defaultCatId = 2) => {
    setIsCreatingProduct(true);
    setEditingProduct({ catId: defaultCatId });
  };

  // 8. Confirmar Item Personalizado do Modal no Pedido
  const handleConfirmItemToOrder = (customizedItem) => {
    setOrderItems(prev => [customizedItem, ...prev]);
    showFeedback(`${customizedItem.quantity}x ${customizedItem.name} adicionado à comanda!`);
  };

  // 9. Remover Item da Comanda
  const handleRemoveItem = (cartItemId) => {
    setOrderItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  // 10. Fechar Comanda e Baixar Estoque Automático
  const handleFinishOrder = async () => {
    if (orderItems.length === 0) return alert('Selecione itens para o pedido.');

    const itemsSubtotal = orderItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const deliveryFee = orderType === 'delivery'
      ? (neighborhoods.find(n => n.name === selectedNeighborhood)?.fee || 0)
      : 0;
    const orderTotal = itemsSubtotal + deliveryFee;

    // Baixa automática nas porções de estoque diário (ex: carnes)
    const updatedProducts = await api.decrementProductStock(orderItems);
    setProducts(updatedProducts);

    const newOrder = {
      id: Math.floor(100 + Math.random() * 900),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: orderType === 'delivery' ? `Entrega (${selectedNeighborhood})` : 'Balcão',
      items: orderItems.map(i => `${i.quantity}x ${i.name}`).join(', '),
      total: orderTotal,
      payment: paymentMethod
    };

    setClosedOrders([newOrder, ...closedOrders]);
    setOrderItems([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  // Restaurar dados originais de fábrica
  const handleResetDefaults = async () => {
    if (confirm('Deseja restaurar o cardápio original de fábrica?')) {
      const data = await api.resetToDefaults();
      setCategories(data.categories);
      setProducts(data.products);
      showFeedback('Cardápio restaurado com sucesso!');
    }
  };

  const fontSizeClass = `font-${fontSize}`;
  const totalRevenue = closedOrders.reduce((acc, o) => acc + o.total, 0);

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando sistema Komanda...</div>;
  }

  return (
    <div className={`${fontSizeClass} ${highContrast ? 'high-contrast-mode' : ''}`} style={{ minHeight: '100vh', padding: '16px' }}>
      <div style={{ maxWidth: '1260px', margin: '0 auto' }}>
        
        {/* BARRA DE ACESSIBILIDADE E AJUSTES VISUAIS */}
        <AccessibilityBar 
          fontSize={fontSize}
          setFontSize={setFontSize}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          seniorGuide={seniorGuide}
          setSeniorGuide={setSeniorGuide}
        />

        {/* NOTIFICAÇÃO VISUAL TOAST */}
        {notification && (
          <div style={{
            background: highContrast ? '#facc15' : '#0f172a',
            color: highContrast ? '#000000' : '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontWeight: '700',
            fontSize: '1em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: highContrast ? '2px solid #000' : 'none'
          }}>
            <Sparkles size={18} />
            <span>{notification}</span>
          </div>
        )}

        {/* GUIA DE DICAS VISUAIS PARA IDOSOS / INICIANTES */}
        {seniorGuide && (
          <SeniorGuideBanner 
            highContrast={highContrast} 
            onClose={() => setSeniorGuide(false)} 
          />
        )}

        {/* TOPO COM LOGO E BOTÃO DE NOVO PRATO */}
        <header style={{
          background: '#ffffff',
          border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: highContrast ? '#000000' : '#0f172a',
              color: highContrast ? '#facc15' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '15px'
            }}>
              MM
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.35em', fontWeight: '800', color: '#0f172a' }}>
                  Mau Mau Lanches
                </h1>
                <span style={{ 
                  fontSize: '0.75em', 
                  color: '#475569', 
                  background: '#f1f5f9', 
                  padding: '3px 8px', 
                  borderRadius: '6px',
                  fontWeight: '600'
                }}>
                  Komanda · Modelo iFood
                </span>
              </div>
              <p style={{ fontSize: '0.85em', color: '#64748b' }}>
                Rua Vinte de Setembro, 1151 · Parque 35, Guaíba - RS
              </p>
            </div>
          </div>

          {/* Botões Rápidos do Cabeçalho */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => handleOpenAddProduct(2)}
              style={{
                background: highContrast ? '#000000' : '#15803d',
                color: highContrast ? '#facc15' : '#ffffff',
                border: highContrast ? '2px solid #facc15' : 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '0.95em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(21, 128, 61, 0.2)'
              }}
            >
              <PlusCircle size={18} />
              <span>+ Criar Novo Prato</span>
            </button>

            <button
              onClick={handleResetDefaults}
              title="Restaurar lanches padrão"
              style={{
                background: '#f1f5f9',
                color: '#64748b',
                border: '1px solid #cbd5e1',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8em',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={14} />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </header>

        {/* NAVEGAÇÃO DE ABAS */}
        <nav style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '20px', 
          borderBottom: '2px solid #e2e8f0', 
          paddingBottom: '8px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'cardapio', label: '🍔 Cardápio & Pedidos (iFood)' },
            { id: 'estoque', label: '🥩 Controle de Estoque & Carnes' },
            { id: 'motoboy', label: '🛵 Fechamento Motoboys' },
            { id: 'caixa', label: '📊 Dashboard & Vendas' }
          ].map(t => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '0.95em',
                  fontWeight: isActive ? '800' : '600',
                  background: isActive 
                    ? (highContrast ? '#000000' : '#0f172a') 
                    : 'transparent',
                  color: isActive 
                    ? (highContrast ? '#facc15' : '#ffffff') 
                    : '#64748b',
                  border: isActive && highContrast ? '2px solid #facc15' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* ============================================================== */}
        {/* 1. ABA DE CARDÁPIO & PEDIDOS (MODELO IFOOD)                    */}
        {/* ============================================================== */}
        {activeTab === 'cardapio' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px', alignItems: 'start' }}>
            
            {/* LADO ESQUERDO: SEÇÕES DO CARDÁPIO */}
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

            {/* LADO DIREITO: COMANDA / CARRINHO FIXO */}
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
        {/* 2. ABA DE ESTOQUE DE CARNES E PRODUTOS                        */}
        {/* ============================================================== */}
        {activeTab === 'estoque' && (
          <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '1.25em', fontWeight: '800' }}>Controle de Vendas por Estoque Disponível</h2>
                <p style={{ fontSize: '0.9em', color: '#64748b' }}>
                  Quando a carne ou porção acaba (saldo 0), o lanche é pausado automaticamente para evitar vender o que não tem.
                </p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95em' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Prato / Lanche</th>
                  <th style={{ padding: '10px' }}>Categoria</th>
                  <th style={{ padding: '10px' }}>Porções Restantes Hoje</th>
                  <th style={{ padding: '10px' }}>Situação</th>
                  <th style={{ padding: '10px' }}>Ações Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const isOut = p.stockQuantity !== undefined && p.stockQuantity === 0;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: '700' }}>{p.name}</td>
                      <td style={{ padding: '12px 10px', color: '#64748b' }}>
                        {categories.find(c => c.id === p.catId)?.name}
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: '800' }}>
                        {p.stockQuantity !== undefined ? `${p.stockQuantity} porções` : 'Ilimitado'}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        {isOut ? (
                          <span style={{ color: '#b91c1c', fontSize: '0.85em', fontWeight: '800', background: '#fee2e2', padding: '4px 8px', borderRadius: '6px' }}>
                            🔴 ESGOTADO (Acabou carne)
                          </span>
                        ) : !p.active ? (
                          <span style={{ color: '#64748b', fontSize: '0.85em', fontWeight: '700', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
                            Pausado
                          </span>
                        ) : (
                          <span style={{ color: '#15803d', fontSize: '0.85em', fontWeight: '700', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px' }}>
                            🟢 Venda Liberada
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => {
                              const q = prompt(`Nova quantidade disponível hoje para "${p.name}":`, p.stockQuantity || 10);
                              if (q !== null) {
                                api.updateProduct(p.id, { stockQuantity: parseInt(q, 10) || 0, active: parseInt(q, 10) > 0 }).then(setProducts);
                              }
                            }}
                            style={{
                              background: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8em',
                              fontWeight: '600'
                            }}
                          >
                            Ajustar Qtd
                          </button>
                          <button
                            onClick={() => handleToggleProduct(p.id)}
                            style={{
                              background: p.active ? '#fee2e2' : '#dcfce7',
                              color: p.active ? '#b91c1c' : '#15803d',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8em',
                              fontWeight: '700'
                            }}
                          >
                            {p.active ? 'Pausar' : 'Liberar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. ABA DE MOTOBOYS                                            */}
        {/* ============================================================== */}
        {activeTab === 'motoboy' && (
          <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.25em', fontWeight: '800', marginBottom: '4px' }}>Acerto dos Motoboys</h2>
            <p style={{ fontSize: '0.9em', color: '#64748b', marginBottom: '16px' }}>
              Diária fixa da noite (R$ 40,00) + taxa integral dos bairros atendidos.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Cleber Ribeiro', base: 40, trips: 4, fees: 26 },
                { name: 'Rodrigo Silveira', base: 40, trips: 3, fees: 21 }
              ].map((m, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
                  <h3 style={{ fontSize: '1.1em', fontWeight: '800', marginBottom: '8px' }}>{m.name}</h3>
                  <div style={{ fontSize: '0.9em', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>Diária: R$ {m.base.toFixed(2)}</div>
                    <div>Entregas: {m.trips} viagens</div>
                    <div>Taxas de entrega: R$ {m.fees.toFixed(2)}</div>
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0', fontWeight: '800', fontSize: '1.1em', color: '#059669' }}>
                      A pagar: R$ {(m.base + m.fees).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. ABA DE DASHBOARD                                           */}
        {/* ============================================================== */}
        {activeTab === 'caixa' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b' }}>Faturamento Total</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#059669', marginTop: '4px' }}>
                  R$ {totalRevenue.toFixed(2)}
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b' }}>Pedidos Realizados</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                  {closedOrders.length}
                </div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b' }}>Ticket Médio</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                  R$ {(totalRevenue / (closedOrders.length || 1)).toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ fontSize: '1.1em', fontWeight: '800', marginBottom: '10px' }}>Histórico dos Pedidos</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9em' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px' }}>#</th>
                    <th style={{ padding: '8px' }}>Hora</th>
                    <th style={{ padding: '8px' }}>Tipo</th>
                    <th style={{ padding: '8px' }}>Itens</th>
                    <th style={{ padding: '8px' }}>Pgto</th>
                    <th style={{ padding: '8px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {closedOrders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '8px', fontWeight: '700' }}>#{o.id}</td>
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

        {/* MODAL 1: PERSONALIZAR LANCHE (ESTILO IFOOD) */}
        {selectedProductForModal && (
          <ProductModal
            product={selectedProductForModal}
            onClose={() => setSelectedProductForModal(null)}
            onConfirm={handleConfirmItemToOrder}
            highContrast={highContrast}
            fontSizeClass={fontSizeClass}
          />
        )}

        {/* MODAL 2: CRIAR / EDITAR / EXCLUIR / SALVAR COMO NOVO PRATO */}
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
