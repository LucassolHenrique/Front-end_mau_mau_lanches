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
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('cardapio');
  const [deliveryTime, setDeliveryTime] = useState('40 min');
  const [dashPeriod, setDashPeriod] = useState('hoje');

  // Categorias
  const [categories] = useState([
    { id: 1, name: 'Xis' },
    { id: 2, name: 'Cachorro-quente' },
    { id: 3, name: 'Espetos & Porções' },
    { id: 4, name: 'Bebidas' },
  ]);

  // Produtos
  const [products] = useState([
    { id: 1, catId: 1, name: 'Xis Salada', price: 28.00, desc: 'Pão prensado, hambúrguer artesanal 200g, queijo, presunto, alface, tomate e maionese', active: true },
    { id: 2, catId: 1, name: 'Xis Coração com Bacon', price: 34.00, desc: 'Pão prensado, coração de frango, bacon, queijo duplo e maionese', active: true },
    { id: 3, catId: 2, name: 'Cachorro-quente Especial', price: 22.00, desc: 'Pão, 2 salsichas, molho especial, queijo e batata palha', active: true },
    { id: 4, catId: 3, name: 'Espeto de Carne com Queijo', price: 16.00, desc: 'Alcatra grelhada com queijo coalho e farofa', active: true },
    { id: 5, catId: 3, name: 'Porção Batata Frita', price: 28.00, desc: '500g de batata frita com queijo e bacon', active: true },
    { id: 6, catId: 4, name: 'Refrigerante Lata 350ml', price: 6.00, desc: 'Coca-Cola, Guaraná Antarctica ou Fanta', active: true },
    { id: 7, catId: 4, name: 'Cerveja Long Neck', price: 9.00, desc: 'Heineken ou Stella Artois', active: true },
  ]);

  // Bairros Guaíba
  const neighborhoods = [
    { name: 'Parque 35', fee: 4.00 },
    { name: 'Centro', fee: 5.00 },
    { name: 'Colina', fee: 7.00 },
    { name: 'Ermo', fee: 6.00 },
    { name: 'Cohab', fee: 7.00 },
    { name: 'Fátima', fee: 8.00 },
    { name: 'Santa Rita', fee: 9.00 },
    { name: 'Jardim dos Lagos', fee: 8.00 }
  ];

  // Estoque
  const [inventory] = useState([
    { id: 1, name: 'Pão de Xis', unit: 'un', current: 38, min: 20 },
    { id: 2, name: 'Hambúrguer Bovino (kg)', unit: 'kg', current: 7.4, min: 5.0 },
    { id: 3, name: 'Coração de Frango (kg)', unit: 'kg', current: 2.1, min: 4.0 },
    { id: 4, name: 'Bacon Fatiado (kg)', unit: 'kg', current: 1.8, min: 3.0 },
    { id: 5, name: 'Pão de Cachorro-quente', unit: 'un', current: 40, min: 15 },
    { id: 6, name: 'Salsicha (kg)', unit: 'kg', current: 4.2, min: 3.0 },
    { id: 7, name: 'Queijo Prato (kg)', unit: 'kg', current: 3.5, min: 4.0 },
    { id: 8, name: 'Batata Congelada (kg)', unit: 'kg', current: 12.0, min: 6.0 },
    { id: 9, name: 'Refrigerante Lata', unit: 'un', current: 52, min: 24 }
  ]);

  // Motoboys
  const [motoboys] = useState([
    { id: 1, name: 'Cleber Ribeiro', baseFee: 40.00, deliveries: 4, deliveryFeesTotal: 26.00 },
    { id: 2, name: 'Rodrigo Silveira', baseFee: 40.00, deliveries: 3, deliveryFeesTotal: 21.00 }
  ]);

  // Pedido
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('delivery');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Parque 35');
  const [clientStreet, setClientStreet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [cashGiven, setCashGiven] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Pedidos Fechados
  const [closedOrders, setClosedOrders] = useState([
    { id: 101, date: '24/09', time: '18:45', type: 'Entrega (Parque 35)', items: '1x Xis Salada, 1x Refri', consumed: '1x Pão Xis, 0.2kg Hambúrguer', total: 38.00, payment: 'PIX' },
    { id: 102, date: '24/09', time: '19:20', type: 'Balcão', items: '2x Espeto de Carne', consumed: '2x Espetos', total: 32.00, payment: 'Débito' },
    { id: 103, date: '24/09', time: '20:05', type: 'Entrega (Centro)', items: '1x Xis Coração, 1x Batata', consumed: '1x Pão Xis, 0.22kg Coração, 0.5kg Batata', total: 71.00, payment: 'Dinheiro' },
    { id: 104, date: '24/09', time: '20:40', type: 'Entrega (Colina)', items: '2x Cachorro-quente, 2x Cerveja', consumed: '2x Pão Hot Dog, 4x Salsichas', total: 69.00, payment: 'PIX' },
    { id: 105, date: '24/09', time: '21:15', type: 'Entrega (Parque 35)', items: '2x Xis Salada', consumed: '2x Pão Xis, 0.4kg Hambúrguer', total: 60.00, payment: 'Crédito' }
  ]);

  const itemsSubtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' 
    ? (neighborhoods.find(n => n.name === selectedNeighborhood)?.fee || 0) 
    : 0;
  const orderTotal = itemsSubtotal + deliveryFee;
  const changeDue = paymentMethod === 'Dinheiro' && Number(cashGiven) > orderTotal 
    ? (Number(cashGiven) - orderTotal).toFixed(2) 
    : '0.00';

  const addItemToOrder = (product) => {
    setOrderItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItemFromOrder = (id) => {
    setOrderItems(prev => prev.filter(i => i.id !== id));
  };

  const handleFinishOrder = () => {
    if (orderItems.length === 0) return alert('Selecione itens para o pedido.');
    
    const newOrder = {
      id: Math.floor(100 + Math.random() * 900),
      date: '24/09',
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
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const totalRevenue = closedOrders.reduce((acc, o) => acc + o.total, 0);

  // Consumo detalhado de insumos
  const ingredientsUsage = [
    { name: 'Pão de Xis Tradicional', consumed: 4, unit: 'un', total: 38 },
    { name: 'Hambúrguer Artesanal', consumed: 0.8, unit: 'kg', total: 7.4 },
    { name: 'Pão de Cachorro-quente', consumed: 2, unit: 'un', total: 40 },
    { name: 'Salsicha ao Molho', consumed: 4, unit: 'un', total: 42 },
    { name: 'Coração de Frango', consumed: 0.22, unit: 'kg', total: 2.1 },
    { name: 'Bacon Fatiado', consumed: 0.15, unit: 'kg', total: 1.8 },
    { name: 'Batata Congelada', consumed: 0.5, unit: 'kg', total: 12.0 },
    { name: 'Refrigerantes e Cervejas', consumed: 3, unit: 'latas', total: 52 }
  ];

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Topo Limpo e Sóbrio */}
      <header style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Logo Simples */}
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '6px',
            background: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '13px',
            letterSpacing: '0.5px'
          }}>
            MM
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Mau Mau Lanches</h1>
              <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                Sistema Komanda
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              R. Vinte de Setembro, 1151 · Parque 35, Guaíba - RS
            </p>
          </div>
        </div>

        {/* Prazo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Tempo de Espera</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>{deliveryTime}</span>
          </div>
          <button 
            onClick={() => {
              const n = prompt('Novo tempo médio:', deliveryTime);
              if (n) setDeliveryTime(n);
            }}
            style={{ 
              background: '#f1f5f9', 
              color: '#334155', 
              border: '1px solid #cbd5e1', 
              padding: '6px 10px', 
              borderRadius: '6px',
              fontSize: '12px'
            }}
          >
            Editar
          </button>
        </div>
      </header>

      {/* Navegação Sóbria */}
      <nav style={{ display: 'flex', gap: '6px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
        {[
          { id: 'cardapio', label: 'Cardápio' },
          { id: 'pedido', label: 'Nova Comanda / Pedido' },
          { id: 'estoque', label: 'Estoque' },
          { id: 'motoboy', label: 'Acerto Motoboys' },
          { id: 'caixa', label: 'Dashboard & Vendas' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === t.id ? '600' : '400',
              background: activeTab === t.id ? '#0f172a' : 'transparent',
              color: activeTab === t.id ? '#ffffff' : '#64748b',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* 1. CARDÁPIO */}
      {activeTab === 'cardapio' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Itens Disponíveis</h2>
            <button 
              onClick={() => alert('Disponível na Sprint 2 via API.')}
              style={{ background: '#0f172a', color: '#fff', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={14} /> Novo Item
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {products.map(p => (
              <div key={p.id} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                    {categories.find(c => c.id === p.catId)?.name}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>{p.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>{p.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>R$ {p.price.toFixed(2)}</span>
                  <button 
                    onClick={() => {
                      addItemToOrder(p);
                      setActiveTab('pedido');
                    }}
                    style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '6px', fontWeight: '500' }}
                  >
                    + Pedir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PEDIDO */}
      {activeTab === 'pedido' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
          {/* Lado Esquerdo */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>Cardápio</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: '1px solid #f1f5f9', borderRadius: '6px', background: '#fafafa' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>R$ {p.price.toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={() => addItemToOrder(p)}
                    style={{ background: '#0f172a', color: '#ffffff', padding: '4px 10px', borderRadius: '4px' }}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Direito: Comanda */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              Comanda Aberta
            </h2>

            {orderSuccess && (
              <div style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> Pedido salvo com sucesso!
              </div>
            )}

            {orderItems.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '24px 0' }}>Nenhum item adicionado.</p>
            ) : (
              <div style={{ marginBottom: '14px' }}>
                {orderItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f8fafc', fontSize: '13px' }}>
                    <div>
                      <span>{item.quantity}x {item.name}</span>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>R$ {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <button onClick={() => removeItemFromOrder(item.id)} style={{ color: '#94a3b8', background: 'none' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tipo */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
              <button 
                onClick={() => setOrderType('delivery')}
                style={{ flex: 1, padding: '7px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', background: orderType === 'delivery' ? '#0f172a' : '#f1f5f9', color: orderType === 'delivery' ? '#fff' : '#64748b' }}
              >
                Entrega
              </button>
              <button 
                onClick={() => setOrderType('balcao')}
                style={{ flex: 1, padding: '7px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', background: orderType === 'balcao' ? '#0f172a' : '#f1f5f9', color: orderType === 'balcao' ? '#fff' : '#64748b' }}
              >
                Balcão
              </button>
            </div>

            {orderType === 'delivery' && (
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Bairro em Guaíba:</label>
                <select 
                  value={selectedNeighborhood} 
                  onChange={e => setSelectedNeighborhood(e.target.value)}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  {neighborhoods.map(n => (
                    <option key={n.name} value={n.name}>{n.name} (+ R$ {n.fee.toFixed(2)})</option>
                  ))}
                </select>

                <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Endereço (Rua e número):</label>
                <input 
                  type="text" 
                  placeholder="Ex: R. Vinte de Setembro, 200" 
                  value={clientStreet} 
                  onChange={e => setClientStreet(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            )}

            {/* Pagamento */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Pagamento:</label>
              <select 
                value={paymentMethod} 
                onChange={e => setPaymentMethod(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="PIX">PIX</option>
                <option value="Crédito">Cartão de Crédito</option>
                <option value="Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>

              {paymentMethod === 'Dinheiro' && (
                <div style={{ marginTop: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="number" 
                    placeholder="Valor recebido" 
                    value={cashGiven} 
                    onChange={e => setCashGiven(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <div style={{ fontSize: '12px', color: '#15803d', fontWeight: '600' }}>Troco: R$ {changeDue}</div>
                </div>
              )}
            </div>

            {/* Resumo */}
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Subtotal:</span>
                <span>R$ {itemsSubtotal.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ color: '#64748b' }}>Entrega ({selectedNeighborhood}):</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700', marginTop: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                <span>Total:</span>
                <span>R$ {orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleFinishOrder}
              style={{ width: '100%', background: '#0f172a', color: '#ffffff', padding: '10px', borderRadius: '6px', fontWeight: '600' }}
            >
              Fechar Comanda
            </button>
          </div>
        </div>
      )}

      {/* 3. ESTOQUE */}
      {activeTab === 'estoque' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>Insumos em Estoque</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '8px' }}>Insumo</th>
                <th style={{ padding: '8px' }}>Unidade</th>
                <th style={{ padding: '8px' }}>Saldo Atual</th>
                <th style={{ padding: '8px' }}>Mínimo</th>
                <th style={{ padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(i => {
                const isLow = i.current <= i.min;
                return (
                  <tr key={i.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '10px 8px', fontWeight: '500' }}>{i.name}</td>
                    <td style={{ padding: '10px 8px', color: '#64748b' }}>{i.unit}</td>
                    <td style={{ padding: '10px 8px', fontWeight: '600' }}>{i.current} {i.unit}</td>
                    <td style={{ padding: '10px 8px', color: '#64748b' }}>{i.min} {i.unit}</td>
                    <td style={{ padding: '10px 8px' }}>
                      {isLow ? (
                        <span style={{ color: '#b91c1c', fontSize: '11px', fontWeight: '600', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>
                          Repor Estoque
                        </span>
                      ) : (
                        <span style={{ color: '#15803d', fontSize: '11px', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>
                          OK
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

      {/* 4. MOTOBOYS */}
      {activeTab === 'motoboy' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>Fechamento de Motoboys</h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>Diária fixa (R$ 40) + taxa dos bairros atendidos</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {motoboys.map(m => (
              <div key={m.id} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', background: '#fafafa' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{m.name}</h3>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
                  <div>Diária fixa: R$ {m.baseFee.toFixed(2)}</div>
                  <div>Entregas realizadas: {m.deliveries} viagens</div>
                  <div>Total em taxas: R$ {m.deliveryFeesTotal.toFixed(2)}</div>
                  <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    Total a pagar: R$ {(m.baseFee + m.deliveryFeesTotal).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DASHBOARD & SAÍDA DE INSUMOS */}
      {activeTab === 'caixa' && (
        <div>
          {/* Filtro simples */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Relatório do Período</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'hoje', label: 'Hoje (24/09)' },
                { id: 'ontem', label: 'Ontem' },
                { id: '7dias', label: '7 dias' }
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setDashPeriod(b.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: dashPeriod === b.id ? '#0f172a' : '#f1f5f9',
                    color: dashPeriod === b.id ? '#ffffff' : '#64748b'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Faturamento Total</div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>R$ {totalRevenue.toFixed(2)}</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Pedidos Realizados</div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{closedOrders.length}</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Ticket Médio</div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
                R$ {(totalRevenue / closedOrders.length).toFixed(2)}
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Item Mais Pedido</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginTop: '8px' }}>Xis Salada (4 un)</div>
            </div>
          </div>

          {/* Tabela de Saída de Insumos (Pães, Carnes, Bebidas) */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
              Saída de Insumos da Cozinha (Baixa Automática)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
              Controle exato de pães, carnes bovinas, salsichas e batatas que saíram por pedido:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '8px' }}>Insumo</th>
                  <th style={{ padding: '8px' }}>Quantidade que Saiu</th>
                  <th style={{ padding: '8px' }}>Saldo Restante</th>
                </tr>
              </thead>
              <tbody>
                {ingredientsUsage.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '8px', fontWeight: '500' }}>{item.name}</td>
                    <td style={{ padding: '8px', fontWeight: '600', color: '#b91c1c' }}>
                      {item.consumed} {item.unit}
                    </td>
                    <td style={{ padding: '8px', color: '#64748b' }}>
                      {item.total} {item.unit} em estoque
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Extrato dos Pedidos */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Extrato de Pedidos</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '8px' }}>#</th>
                  <th style={{ padding: '8px' }}>Data / Hora</th>
                  <th style={{ padding: '8px' }}>Tipo</th>
                  <th style={{ padding: '8px' }}>Lanches</th>
                  <th style={{ padding: '8px' }}>Insumos Baixados</th>
                  <th style={{ padding: '8px' }}>Pgto</th>
                  <th style={{ padding: '8px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {closedOrders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '8px', fontWeight: '600' }}>#{o.id}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>{o.date} {o.time}</td>
                    <td style={{ padding: '8px' }}>{o.type}</td>
                    <td style={{ padding: '8px' }}>{o.items}</td>
                    <td style={{ padding: '8px', color: '#b91c1c' }}>{o.consumed}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>{o.payment}</td>
                    <td style={{ padding: '8px', fontWeight: '600' }}>R$ {o.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
