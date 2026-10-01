import React from 'react';
import { Trash2, Bike, ShoppingBag, CheckCircle } from 'lucide-react';

export default function OrderSummary({
  orderItems,
  onRemoveItem,
  orderType,
  setOrderType,
  selectedNeighborhood,
  setSelectedNeighborhood,
  neighborhoods,
  clientStreet,
  setClientStreet,
  paymentMethod,
  setPaymentMethod,
  cashGiven,
  setCashGiven,
  onFinishOrder,
  orderSuccess,
  highContrast,
  fontSizeClass
}) {
  const itemsSubtotal = orderItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const deliveryFee = orderType === 'delivery'
    ? (neighborhoods.find(n => n.name === selectedNeighborhood)?.fee || 0)
    : 0;
  const orderTotal = itemsSubtotal + deliveryFee;
  
  const cashGivenNum = parseFloat(cashGiven) || 0;
  const changeDue = paymentMethod === 'Dinheiro' && cashGivenNum > orderTotal
    ? (cashGivenNum - orderTotal).toFixed(2)
    : '0.00';

  return (
    <aside 
      aria-label="Comanda do Pedido"
      className={fontSizeClass}
      style={{
        background: '#ffffff',
        border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '18px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'fit-content'
      }}
    >
      <div>
        {/* Cabecalho da Comanda */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
          borderBottom: '1px solid #f1f5f9',
          marginBottom: '14px'
        }}>
          <h2 style={{ fontSize: '1.15em', fontWeight: '700', color: '#0f172a' }}>
            Comanda do Pedido
          </h2>
          <span style={{
            fontSize: '0.75em',
            background: '#0f172a',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '600'
          }}>
            {orderItems.length} {orderItems.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Notificacao de Gravacao com Sucesso */}
        {orderSuccess && (
          <div style={{
            background: '#f0fdf4',
            color: '#15803d',
            border: '1px solid #86efac',
            padding: '10px 12px',
            borderRadius: '6px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9em',
            fontWeight: '600'
          }}>
            <CheckCircle size={18} />
            <span>Pedido registrado e enviado para a cozinha com sucesso.</span>
          </div>
        )}

        {/* Lista de Itens da Comanda */}
        {orderItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '24px 16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px dashed #cbd5e1',
            color: '#64748b',
            marginBottom: '14px'
          }}>
            <ShoppingBag size={28} style={{ margin: '0 auto 6px', color: '#94a3b8' }} />
            <p style={{ fontWeight: '600', fontSize: '0.9em', color: '#334155' }}>
              Nenhum item selecionado.
            </p>
            <p style={{ fontSize: '0.8em', marginTop: '2px' }}>
              Clique em "Pedir" em um lanche do cardapio.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', maxHeight: '280px', overflowY: 'auto' }}>
            {orderItems.map((item) => (
              <div 
                key={item.cartItemId}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em' }}>
                    {item.quantity}x {item.name}
                  </div>
                  
                  {item.selectedAdditionals && item.selectedAdditionals.length > 0 && (
                    <div style={{ fontSize: '0.75em', color: '#059669', marginTop: '2px', fontWeight: '600' }}>
                      Adicionais: {item.selectedAdditionals.map(a => a.name).join(', ')}
                    </div>
                  )}

                  {item.removedIngredients && item.removedIngredients.length > 0 && (
                    <div style={{ fontSize: '0.75em', color: '#dc2626', marginTop: '2px' }}>
                      Retirar: {item.removedIngredients.join(', ')}
                    </div>
                  )}

                  {item.notes && (
                    <div style={{ fontSize: '0.75em', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                      Obs: "{item.notes}"
                    </div>
                  )}

                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginTop: '3px' }}>
                    R$ {(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  title="Remover item da comanda"
                  style={{
                    background: '#fef2f2',
                    color: '#b91c1c',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modalidade: Entrega ou Balcao */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85em', color: '#334155', marginBottom: '4px' }}>
            Modalidade:
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setOrderType('delivery')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: orderType === 'delivery' ? '#0f172a' : '#f1f5f9',
                color: orderType === 'delivery' ? '#ffffff' : '#475569',
                border: highContrast ? '2px solid #000' : '1px solid #cbd5e1'
              }}
            >
              <Bike size={16} />
              <span>Entrega</span>
            </button>
            <button
              onClick={() => setOrderType('balcao')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: orderType === 'balcao' ? '#0f172a' : '#f1f5f9',
                color: orderType === 'balcao' ? '#ffffff' : '#475569',
                border: highContrast ? '2px solid #000' : '1px solid #cbd5e1'
              }}
            >
              <ShoppingBag size={16} />
              <span>Retirada Balcao</span>
            </button>
          </div>
        </div>

        {/* Endereco de Entrega */}
        {orderType === 'delivery' && (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '14px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                Bairro em Guaiba:
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
              >
                {neighborhoods.map((n) => (
                  <option key={n.name} value={n.name}>
                    {n.name} (+ R$ {n.fee.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                Endereco (Rua, numero e apto):
              </label>
              <input
                type="text"
                placeholder="Ex: R. Vinte de Setembro, 120"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
              />
            </div>
          </div>
        )}

        {/* Forma de Pagamento */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85em', color: '#334155', marginBottom: '4px' }}>
            Forma de Pagamento:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
          >
            <option value="PIX">PIX</option>
            <option value="Cartao de Debito">Cartao de Debito</option>
            <option value="Cartao de Credito">Cartao de Credito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>

          {/* Troco em Dinheiro */}
          {paymentMethod === 'Dinheiro' && (
            <div style={{
              background: '#fefce8',
              border: '1px solid #fef08a',
              borderRadius: '6px',
              padding: '10px',
              marginTop: '8px'
            }}>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#854d0e', marginBottom: '2px' }}>
                Valor recebido em dinheiro:
              </label>
              <input
                type="number"
                placeholder="50.00"
                value={cashGiven}
                onChange={(e) => setCashGiven(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '0.95em', fontWeight: '700', marginBottom: '6px' }}
              />

              {cashGivenNum > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: '#854d0e', fontSize: '0.85em' }}>
                    Troco a devolver:
                  </span>
                  <span style={{ fontWeight: '800', color: '#713f12', fontSize: '1.2em' }}>
                    R$ {changeDue}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Totais e Botao de Fechamento */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: '#64748b', marginBottom: '2px' }}>
          <span>Subtotal:</span>
          <span>R$ {itemsSubtotal.toFixed(2)}</span>
        </div>

        {orderType === 'delivery' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: '#64748b', marginBottom: '4px' }}>
            <span>Entrega ({selectedNeighborhood}):</span>
            <span>R$ {deliveryFee.toFixed(2)}</span>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
          marginBottom: '12px',
          padding: '8px 10px',
          background: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <span style={{ fontWeight: '700', fontSize: '0.95em', color: '#0f172a' }}>
            Total:
          </span>
          <span style={{ fontWeight: '800', fontSize: '1.3em', color: '#059669' }}>
            R$ {orderTotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onFinishOrder}
          disabled={orderItems.length === 0}
          style={{
            width: '100%',
            background: orderItems.length === 0 ? '#cbd5e1' : '#0f172a',
            color: orderItems.length === 0 ? '#64748b' : '#ffffff',
            padding: '12px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.95em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: orderItems.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <CheckCircle size={17} />
          <span>Fechar Comanda</span>
        </button>
      </div>
    </aside>
  );
}
