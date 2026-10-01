import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import ProductCompositionView from './ProductCompositionView';

export default function ProductModal({ 
  product, 
  onClose, 
  onConfirm, 
  highContrast,
  fontSizeClass 
}) {
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState([]);
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const toggleRemove = (ing) => {
    if (removedIngredients.includes(ing)) {
      setRemovedIngredients(removedIngredients.filter(i => i !== ing));
    } else {
      setRemovedIngredients([...removedIngredients, ing]);
    }
  };

  const toggleAdditional = (add) => {
    const exists = selectedAdditionals.find(a => a.id === add.id);
    if (exists) {
      setSelectedAdditionals(selectedAdditionals.filter(a => a.id !== add.id));
    } else {
      setSelectedAdditionals([...selectedAdditionals, add]);
    }
  };

  const additionalsTotal = selectedAdditionals.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = product.price + additionalsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onConfirm({
      ...product,
      cartItemId: Date.now() + Math.random(),
      unitPrice,
      quantity,
      itemTotal: totalPrice,
      removedIngredients,
      selectedAdditionals,
      notes
    });
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={fontSizeClass}
        style={{
          background: '#ffffff',
          color: '#0f172a',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          border: highContrast ? '2px solid #000000' : '1px solid #cbd5e1'
        }}
      >
        {/* Topo com Foto e Botao Fechar */}
        <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#e2e8f0' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo */}
        <div style={{ padding: '18px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#0f172a' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '0.9em', color: '#64748b', marginTop: '4px' }}>
              {product.desc}
            </p>
            <div style={{ fontSize: '1.2em', fontWeight: '800', color: '#059669', marginTop: '6px' }}>
              Preco base: R$ {product.price.toFixed(2)}
            </div>

            {/* Composicao detalhada do lanche (pao, carne, queijo, etc.) */}
            <ProductCompositionView composition={product.composition} />
          </div>

          {/* Retirar Ingredientes */}
          {product.removableIngredients && product.removableIngredients.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95em', color: '#0f172a' }}>
                  Retirar algum ingrediente?
                </span>
                <span style={{ fontSize: '0.8em', color: '#64748b' }}>Opcional (Sem custo)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.removableIngredients.map((item) => {
                  const isChecked = removedIngredients.includes(item);
                  return (
                    <label 
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: isChecked ? '#fef2f2' : '#ffffff',
                        border: isChecked ? '1px solid #f87171' : '1px solid #cbd5e1'
                      }}
                    >
                      <span style={{ fontSize: '0.9em', fontWeight: isChecked ? '700' : '500', color: isChecked ? '#b91c1c' : '#1e293b' }}>
                        {item}
                      </span>
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRemove(item)}
                        style={{ width: '18px', height: '18px' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Adicionais Pagos */}
          {product.additionals && product.additionals.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95em', color: '#0f172a' }}>
                  Adicionais
                </span>
                <span style={{ fontSize: '0.8em', color: '#059669', fontWeight: '600' }}>Opcional</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.additionals.map((add) => {
                  const isChecked = selectedAdditionals.some(a => a.id === add.id);
                  return (
                    <label 
                      key={add.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: isChecked ? '#f0fdf4' : '#ffffff',
                        border: isChecked ? '1px solid #86efac' : '1px solid #cbd5e1'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.9em', fontWeight: isChecked ? '700' : '500', color: '#1e293b' }}>
                          + {add.name}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.8em', color: '#059669', fontWeight: '600' }}>
                          + R$ {add.price.toFixed(2)}
                        </span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAdditional(add)}
                        style={{ width: '18px', height: '18px' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observacao para a Cozinha */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9em', color: '#334155', marginBottom: '4px' }}>
              Observacao para a cozinha:
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Pao bem tostado, cortar ao meio, maionese a parte..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '0.9em', resize: 'none' }}
            />
          </div>
        </div>

        {/* Rodape de Confirmacao */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}>
          {/* Contador */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ background: '#f8fafc', padding: '8px 12px', color: '#0f172a' }}
            >
              <Minus size={15} />
            </button>
            <span style={{ padding: '8px 14px', fontWeight: '700', fontSize: '1em', minWidth: '35px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{ background: '#f8fafc', padding: '8px 12px', color: '#0f172a' }}
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Botao de Adicionar */}
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              background: '#0f172a',
              color: '#ffffff',
              padding: '12px 18px',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '0.95em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span>Adicionar ao Pedido</span>
            <span>•</span>
            <span style={{ color: '#4ade80' }}>
              R$ {totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
