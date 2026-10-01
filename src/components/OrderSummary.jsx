import React from 'react';
import { Trash2, Bike, ShoppingBag, CheckCircle, DollarSign, MapPin } from 'lucide-react';

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
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'fit-content'
      }}
    >
      <div>
        {/* Título da Comanda */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '12px',
          borderBottom: '1px solid #f1f5f9',
          marginBottom: '16px'
        }}>
          <h2 style={{ fontSize: '1.25em', fontWeight: '800', color: '#0f172a' }}>
            Comanda do Pedido
          </h2>
          <span style={{
            fontSize: '0.8em',
            background: '#0f172a',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: '700'
          }}>
            {orderItems.length} {orderItems.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Alerta de Sucesso */}
        {orderSuccess && (
          <div style={{
            background: '#dcfce7',
            color: '#15803d',
            border: '2px solid #22c55e',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '700'
          }}>
            <CheckCircle size={20} />
            <span>Pedido registrado e enviado para a chapa com sucesso!</span>
          </div>
        )}

        {/* Lista de Itens */}
        {orderItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 16px',
            background: '#f8fafc',
            borderRadius: '10px',
            border: '1px dashed #cbd5e1',
            color: '#64748b',
            marginBottom: '16px'
          }}>
            <ShoppingBag size={32} style={{ margin: '0 auto 8px', color: '#94a3b8' }} />
            <p style={{ fontWeight: '700', fontSize: '1em', color: '#334155' }}>
              Nenhum lanche adicionado ainda.
            </p>
            <p style={{ fontSize: '0.85em', marginTop: '4px' }}>
              Clique em "+ Montar / Pedir" em qualquer lanche do cardápio ao lado.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
            {orderItems.map((item) => (
              <div 
                key={item.cartItemId}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.95em' }}>
                    {item.quantity}x {item.name}
                  </div>
                  
                  {/* Adicionais Selecionados */}
                  {item.selectedAdditionals && item.selectedAdditionals.length > 0 && (
                    <div style={{ fontSize: '0.8em', color: '#059669', marginTop: '2px', fontWeight: '600' }}>
                      Adicionais: {item.selectedAdditionals.map(a => a.name).join(', ')}
                    </div>
                  )}

                  {/* Ingredientes Removidos */}
                  {item.removedIngredients && item.removedIngredients.length > 0 && (
                    <div style={{ fontSize: '0.8em', color: '#dc2626', marginTop: '2px' }}>
                      {item.removedIngredients.join(', ')}
                    </div>
                  )}

                  {/* Observações */}
                  {item.notes && (
                    <div style={{ fontSize: '0.8em', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                      Obs: "{item.notes}"
                    </div>
                  )}

                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.95em', marginTop: '4px' }}>
                    R$ {(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  title="Remover item da comanda"
                  style={{
                    background: '#fee2e2',
                    color: '#b91c1c',
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tipo de Pedido (Entrega ou Balcão) */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9em', color: '#334155', marginBottom: '6px' }}>
            Modalidade do Pedido:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setOrderType('delivery')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.9em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: orderType === 'delivery' ? '#0f172a' : '#f1f5f9',
                color: orderType === 'delivery' ? '#ffffff' : '#475569',
                border: highContrast ? '2px solid #000' : '1px solid #cbd5e1'
              }}
            >
              <Bike size={18} />
              <span>Entrega (Delivery)</span>
            </button>
            <button
              onClick={() => setOrderType('balcao')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.9em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: orderType === 'balcao' ? '#0f172a' : '#f1f5f9',
                color: orderType === 'balcao' ? '#ffffff' : '#475569',
                border: highContrast ? '2px solid #000' : '1px solid #cbd5e1'
              }}
            >
              <ShoppingBag size={18} />
              <span>Retirada Balcão</span>
            </button>
          </div>
        </div>

        {/* Campos de Endereço se for Entrega */}
        {orderType === 'delivery' && (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '16px'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '0.85em', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                Bairro de Guaíba (Taxa Automática):
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', fontWeight: '600' }}
              >
                {neighborhoods.map((n) => (
                  <option key={n.name} value={n.name}>
                    {n.name} — Taxa: + R$ {n.fee.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85em', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                Rua, Número e Complemento:
              </label>
              <input
                type="text"
                placeholder="Ex: R. Vinte de Setembro, 120 - Apto 3"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Forma de Pagamento */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9em', color: '#334155', marginBottom: '6px' }}>
            Forma de Pagamento:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', fontWeight: '600' }}
          >
            <option value="PIX">PIX (Chave na Entrega / Balcão)</option>
            <option value="Cartão de Débito">Cartão de Débito (Máquina)</option>
            <option value="Cartão de Crédito">Cartão de Crédito (Máquina)</option>
            <option value="Dinheiro">Dinheiro (Calcular Troco)</option>
          </select>

          {/* Troco em Dinheiro com Visibilidade Grande */}
          {paymentMethod === 'Dinheiro' && (
            <div style={{
              background: '#fefce8',
              border: '2px solid #ca8a04',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px'
            }}>
              <label style={{ display: 'block', fontSize: '0.85em', fontWeight: '700', color: '#854d0e', marginBottom: '4px' }}>
                Valor que o cliente vai pagar em dinheiro (R$):
              </label>
              <input
                type="number"
                placeholder="Ex: 50.00"
                value={cashGiven}
                onChange={(e) => setCashGiven(e.target.value)}
                style={{ width: '100%', fontSize: '1.1em', fontWeight: '700', marginBottom: '8px' }}
              />

              {cashGivenNum > 0 && (
                <div style={{
                  background: '#fef08a',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '700', color: '#713f12', fontSize: '0.95em' }}>
                    TROCO A DEVOLVER:
                  </span>
                  <span style={{ fontWeight: '900', color: '#713f12', fontSize: '1.4em' }}>
                    R$ {changeDue}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Totais e Botão de Finalizar */}
      <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#64748b', marginBottom: '4px' }}>
          <span>Subtotal dos Lanches:</span>
          <span>R$ {itemsSubtotal.toFixed(2)}</span>
        </div>

        {orderType === 'delivery' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#64748b', marginBottom: '6px' }}>
            <span>Taxa de Entrega ({selectedNeighborhood}):</span>
            <span>R$ {deliveryFee.toFixed(2)}</span>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          marginBottom: '14px',
          padding: '10px',
          background: highContrast ? '#facc15' : '#f8fafc',
          borderRadius: '8px',
          border: highContrast ? '2px solid #000' : '1px solid #e2e8f0'
        }}>
          <span style={{ fontWeight: '800', fontSize: '1.1em', color: '#0f172a' }}>
            VALOR TOTAL:
          </span>
          <span style={{ fontWeight: '900', fontSize: '1.5em', color: highContrast ? '#000000' : '#059669' }}>
            R$ {orderTotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onFinishOrder}
          disabled={orderItems.length === 0}
          style={{
            width: '100%',
            background: orderItems.length === 0 
              ? '#cbd5e1' 
              : (highContrast ? '#000000' : '#15803d'),
            color: orderItems.length === 0 ? '#64748b' : '#ffffff',
            border: highContrast ? '2px solid #facc15' : 'none',
            padding: '14px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '1.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: orderItems.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.25)',
            transition: 'background 0.2s ease'
          }}
        >
          <CheckCircle size={20} />
          <span>Finalizar e Gravar Comanda</span>
        </button>
      </div>
    </aside>
  );
}
