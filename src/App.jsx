import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Boxes, 
  Bike, 
  BarChart3, 
  Plus, 
  Trash2, 
  Clock, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Copy,
  Sparkles
} from 'lucide-react';

import { initialCategories, initialProducts, neighborhoods } from './data/initialData';
import AccessibilityBar from './components/AccessibilityBar';
import CategorySection from './components/CategorySection';
import ProductModal from './components/ProductModal';
import OrderSummary from './components/OrderSummary';
import SeniorGuideBanner from './components/SeniorGuideBanner';

export default function App() {
  // Configurações de Acessibilidade Visual / Modo Sênior
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);
  const [seniorGuide, setSeniorGuide] = useState(true);

  // Navegação
  const [activeTab, setActiveTab] = useState('cardapio');
  const [deliveryTime, setDeliveryTime] = useState('40 min');
  const [dashPeriod, setDashPeriod] = useState('hoje');

  // Estado das Categorias e Produtos (Estilo iFood com Ativar/Pausar)
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);

  // Modal de Personalização de Lanche (Estilo iFood)
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Estado da Comanda / Pedido
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('delivery');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Parque 35');
  const [clientStreet, setClientStreet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [cashGiven, setCashGiven] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  // Pedidos Fechados (Dashboard)
  const [closedOrders, setClosedOrders] = useState([
    { id: 101, date: '24/09', time: '18:45', type: 'Entrega (Parque 35)', items: '1x Xis Salada Especial, 1x Refri Lata', consumed: '1x Pão Xis, 0.2kg Carne', total: 38.00, payment: 'PIX' },
    { id: 102, date: '24/09', time: '19:20', type: 'Balcão', items: '1x Combo Mau Mau Supremo', consumed: '1x Pão Xis, 1x Batata, 1x Refri', total: 44.90, payment: 'Débito' },
    { id: 103, date: '24/09', time: '20:05', type: 'Entrega (Centro)', items: '1x Xis Coração com Bacon', consumed: '1x Pão Xis, 0.22kg Coração, Bacon', total: 39.00, payment: 'Dinheiro' }
  ]);

  // Estoque
  const [inventory] = useState([
    { id: 1, name: 'Pão de Xis Tradicional', unit: 'un', current: 38, min: 20 },
    { id: 2, name: 'Hambúrguer Bovino 200g (kg)', unit: 'kg', current: 7.4, min: 5.0 },
    { id: 3, name: 'Coração de Frango (kg)', unit: 'kg', current: 2.1, min: 4.0 },
    { id: 4, name: 'Bacon Fatiado (kg)', unit: 'kg', current: 1.8, min: 3.0 },
    { id: 5, name: 'Pão de Cachorro-quente', unit: 'un', current: 40, min: 15 },
    { id: 6, name: 'Salsicha ao Molho (kg)', unit: 'kg', current: 4.2, min: 3.0 },
    { id: 7, name: 'Queijo Prato (kg)', unit: 'kg', current: 3.5, min: 4.0 },
    { id: 8, name: 'Batata Congelada (kg)', unit: 'kg', current: 12.0, min: 6.0 },
    { id: 9, name: 'Refrigerante Lata', unit: 'un', current: 52, min: 24 }
  ]);

  // Motoboys
  const [motoboys] = useState([
    { id: 1, name: 'Cleber Ribeiro', baseFee: 40.00, deliveries: 4, deliveryFeesTotal: 26.00 },
    { id: 2, name: 'Rodrigo Silveira', baseFee: 40.00, deliveries: 3, deliveryFeesTotal: 21.00 }
  ]);

  // Helper de Notificação Rápida
  const showFeedback = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Toggle Ativar / Pausar Categoria Inteira
  const handleToggleCategory = (catId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        const nextStatus = !cat.active;
        showFeedback(nextStatus 
          ? `Categoria "${cat.name}" foi ATIVADA no cardápio!` 
          : `Categoria "${cat.name}" foi PAUSADA no cardápio!`
        );
        return { ...cat, active: nextStatus };
      }
      return cat;
    }));
  };

  // 2. Toggle Ativar / Pausar Produto Individual
  const handleToggleProduct = (prodId) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === prodId) {
        const nextStatus = !prod.active;
        showFeedback(nextStatus 
          ? `Produto "${prod.name}" agora está ATIVO!` 
          : `Produto "${prod.name}" foi PAUSADO temporariamente!`
        );
        return { ...prod, active: nextStatus };
      }
      return prod;
    }));
  };

  // 3. Copiar / Clonar Alimento no Cardápio (Exatamente como pedido)
  const handleDuplicateProduct = (prod) => {
    const newProduct = {
      ...prod,
      id: Date.now(),
      name: `${prod.name} (Cópia)`,
      active: true
    };
    setProducts(prev => [newProduct, ...prev]);
    showFeedback(`Alimento "${prod.name}" clonado com sucesso no cardápio!`);
  };

  // 4. Confirmar Item Personalizado do Modal no Pedido
  const handleConfirmItemToOrder = (customizedItem) => {
    setOrderItems(prev => [customizedItem, ...prev]);
    showFeedback(`${customizedItem.quantity}x ${customizedItem.name} adicionado à comanda!`);
  };

  // 5. Remover Item da Comanda
  const handleRemoveItem = (cartItemId) => {
    setOrderItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  // 6. Fechar Comanda e Enviar para Cozinha
  const handleFinishOrder = () => {
    if (orderItems.length === 0) return alert('Selecione itens para o pedido.');

    const itemsSubtotal = orderItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const deliveryFee = orderType === 'delivery'
      ? (neighborhoods.find(n => n.name === selectedNeighborhood)?.fee || 0)
      : 0;
    const orderTotal = itemsSubtotal + deliveryFee;

    const newOrder = {
      id: Math.floor(100 + Math.random() * 900),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: orderType === 'delivery' ? `Entrega (${selectedNeighborhood})` : 'Balcão',
      items: orderItems.map(i => `${i.quantity}x ${i.name}`).join(', '),
      consumed: orderItems.map(i => `${i.quantity}x Insumo`).join(', '),
      total: orderTotal,
      payment: paymentMethod
    };

    setClosedOrders([newOrder, ...closedOrders]);
    setOrderItems([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  // Classe CSS de acordo com o tamanho de fonte escolhido
  const fontSizeClass = `font-${fontSize}`;

  const totalRevenue = closedOrders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className={`${fontSizeClass} ${highContrast ? 'high-contrast-mode' : ''}`} style={{ minHeight: '100vh', padding: '20px 16px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* BARRA DE ACESSIBILIDADE E MODO SÊNIOR NO TOPO */}
        <AccessibilityBar 
          fontSize={fontSize}
          setFontSize={setFontSize}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          seniorGuide={seniorGuide}
          setSeniorGuide={setSeniorGuide}
        />

        {/* FEEDBACK VISUAL RÁPIDO (TOAST) */}
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

        {/* GUIA PASSO A PASSO PARA IDOSOS / INICIANTES */}
        {seniorGuide && (
          <SeniorGuideBanner 
            highContrast={highContrast} 
            onClose={() => setSeniorGuide(false)} 
          />
        )}

        {/* CABEÇALHO DO RESTAURANTE */}
        <header style={{
          background: '#ffffff',
          border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: highContrast ? '#000000' : '#0f172a',
              color: highContrast ? '#facc15' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '16px',
              border: highContrast ? '2px solid #facc15' : 'none'
            }}>
              MM
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.4em', fontWeight: '800', color: '#0f172a' }}>
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
                  Sistema Komanda · Estilo iFood
                </span>
              </div>
              <p style={{ fontSize: '0.85em', color: '#64748b', marginTop: '2px' }}>
                Rua Vinte de Setembro, 1151 · Parque 35, Guaíba - RS
              </p>
            </div>
          </div>

          {/* Tempo Médio de Entrega Editável */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8em', color: '#64748b', display: 'block' }}>Tempo Estimado</span>
              <span style={{ fontSize: '1.1em', fontWeight: '700', color: '#0f172a' }}>{deliveryTime}</span>
            </div>
            <button 
              onClick={() => {
                const n = prompt('Novo tempo médio de entrega:', deliveryTime);
                if (n) setDeliveryTime(n);
              }}
              style={{ 
                background: '#f1f5f9', 
                color: '#334155', 
                border: '1px solid #cbd5e1', 
                padding: '8px 12px', 
                borderRadius: '6px',
                fontSize: '0.85em',
                fontWeight: '600'
              }}
            >
              Editar
            </button>
          </div>
        </header>

        {/* NAVEGAÇÃO DE ABAS */}
        <nav style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '20px', 
          borderBottom: '2px solid #e2e8f0', 
          paddingBottom: '10px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'cardapio', label: '🍔 Cardápio & Pedidos (iFood)', icon: UtensilsCrossed },
            { id: 'estoque', label: '📦 Estoque de Insumos', icon: Boxes },
            { id: 'motoboy', label: '🛵 Fechamento Motoboys', icon: Bike },
            { id: 'caixa', label: '📊 Dashboard & Vendas', icon: BarChart3 }
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ============================================================== */}
        {/* 1. ABA DE CARDÁPIO & PEDIDOS (MODELO IFOOD)                    */}
        {/* ============================================================== */}
        {activeTab === 'cardapio' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px', alignItems: 'start' }}>
            
            {/* COLUNA ESQUERDA: CATEGORIAS E PRODUTOS (COM TOGGLE E DUPLICAR) */}
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
                    highContrast={highContrast}
                    fontSizeClass={fontSizeClass}
                  />
                );
              })}
            </div>

            {/* COLUNA DIREITA: COMANDA / CARRINHO FIXO DO PEDIDO */}
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
        {/* 2. ABA DE ESTOQUE                                             */}
        {/* ============================================================== */}
        {activeTab === 'estoque' && (
          <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.25em', fontWeight: '800', marginBottom: '12px' }}>Insumos em Estoque da Lancheria</h2>
            <p style={{ fontSize: '0.9em', color: '#64748b', marginBottom: '16px' }}>
              Saldo monitorado em tempo real. Itens abaixo do estoque mínimo acendem o alerta de reposição.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95em' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Insumo</th>
                  <th style={{ padding: '10px' }}>Unidade</th>
                  <th style={{ padding: '10px' }}>Saldo Atual</th>
                  <th style={{ padding: '10px' }}>Mínimo</th>
                  <th style={{ padding: '10px' }}>Situação</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(i => {
                  const isLow = i.current <= i.min;
                  return (
                    <tr key={i.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: '600' }}>{i.name}</td>
                      <td style={{ padding: '12px 10px', color: '#64748b' }}>{i.unit}</td>
                      <td style={{ padding: '12px 10px', fontWeight: '800' }}>{i.current} {i.unit}</td>
                      <td style={{ padding: '12px 10px', color: '#64748b' }}>{i.min} {i.unit}</td>
                      <td style={{ padding: '12px 10px' }}>
                        {isLow ? (
                          <span style={{ color: '#b91c1c', fontSize: '0.85em', fontWeight: '800', background: '#fee2e2', padding: '4px 8px', borderRadius: '6px' }}>
                            ⚠ REPOR ESTOQUE
                          </span>
                        ) : (
                          <span style={{ color: '#15803d', fontSize: '0.85em', fontWeight: '700', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px' }}>
                            ✓ SALDO OK
                          </span>
                        )}
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
            <h2 style={{ fontSize: '1.25em', fontWeight: '800', marginBottom: '4px' }}>Acerto dos Motoboys da Noite</h2>
            <p style={{ fontSize: '0.9em', color: '#64748b', marginBottom: '16px' }}>
              Cálculo automático: Diária fixa da noite (R$ 40,00) + soma das taxas dos bairros atendidos.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {motoboys.map(m => (
                <div key={m.id} style={{ border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fafafa' }}>
                  <h3 style={{ fontSize: '1.1em', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>{m.name}</h3>
                  <div style={{ fontSize: '0.95em', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>Diária fixa: <strong>R$ {m.baseFee.toFixed(2)}</strong></div>
                    <div>Entregas realizadas: <strong>{m.deliveries} viagens</strong></div>
                    <div>Total acumulado de taxas: <strong>R$ {m.deliveryFeesTotal.toFixed(2)}</strong></div>
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #e2e8f0', fontSize: '1.15em', fontWeight: '900', color: highContrast ? '#000000' : '#059669' }}>
                      Total a Pagar ao Motoboy: R$ {(m.baseFee + m.deliveryFeesTotal).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. ABA DE DASHBOARD & VENDAS                                  */}
        {/* ============================================================== */}
        {activeTab === 'caixa' && (
          <div>
            <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.05em', fontWeight: '800' }}>Relatório Consolidado de Vendas</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'hoje', label: 'Hoje' },
                  { id: 'ontem', label: 'Ontem' },
                  { id: '7dias', label: 'Últimos 7 dias' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setDashPeriod(b.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: '700',
                      background: dashPeriod === b.id ? '#0f172a' : '#f1f5f9',
                      color: dashPeriod === b.id ? '#ffffff' : '#64748b'
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards de Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b', fontWeight: '600' }}>Faturamento Total</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: highContrast ? '#000000' : '#059669', marginTop: '4px' }}>
                  R$ {totalRevenue.toFixed(2)}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b', fontWeight: '600' }}>Total de Pedidos</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                  {closedOrders.length}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b', fontWeight: '600' }}>Ticket Médio</div>
                <div style={{ fontSize: '1.6em', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                  R$ {(totalRevenue / (closedOrders.length || 1)).toFixed(2)}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.85em', color: '#64748b', fontWeight: '600' }}>Campeão de Vendas</div>
                <div style={{ fontSize: '1.1em', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
                  Xis Salada Tradicional
                </div>
              </div>
            </div>

            {/* Extrato dos Pedidos Fechados */}
            <div style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.15em', fontWeight: '800', marginBottom: '14px' }}>Extrato Detalhado de Pedidos</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9em' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '10px' }}># Comanda</th>
                    <th style={{ padding: '10px' }}>Horário</th>
                    <th style={{ padding: '10px' }}>Tipo</th>
                    <th style={{ padding: '10px' }}>Itens</th>
                    <th style={{ padding: '10px' }}>Pagamento</th>
                    <th style={{ padding: '10px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {closedOrders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: '800' }}>#{o.id}</td>
                      <td style={{ padding: '12px 10px', color: '#64748b' }}>{o.date} às {o.time}</td>
                      <td style={{ padding: '12px 10px' }}>{o.type}</td>
                      <td style={{ padding: '12px 10px' }}>{o.items}</td>
                      <td style={{ padding: '12px 10px', color: '#475569' }}>{o.payment}</td>
                      <td style={{ padding: '12px 10px', fontWeight: '800' }}>R$ {o.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL ESTILO IFOOD PARA PERSONALIZAR LANCHE */}
        {selectedProductForModal && (
          <ProductModal
            product={selectedProductForModal}
            onClose={() => setSelectedProductForModal(null)}
            onConfirm={handleConfirmItemToOrder}
            highContrast={highContrast}
            fontSizeClass={fontSizeClass}
          />
        )}

      </div>
    </div>
  );
}
