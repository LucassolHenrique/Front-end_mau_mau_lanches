import React, { useState } from 'react';
import { X, Plus, Minus, Check, AlertCircle } from 'lucide-react';

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

  // Toggle remoção de ingrediente
  const toggleRemove = (ing) => {
    if (removedIngredients.includes(ing)) {
      setRemovedIngredients(removedIngredients.filter(i => i !== ing));
    } else {
      setRemovedIngredients([...removedIngredients, ing]);
    }
  };

  // Toggle adicional
  const toggleAdditional = (add) => {
    const exists = selectedAdditionals.find(a => a.id === add.id);
    if (exists) {
      setSelectedAdditionals(selectedAdditionals.filter(a => a.id !== add.id));
    } else {
      setSelectedAdditionals([...selectedAdditionals, add]);
    }
  };

  // Cálculo do valor unitário com adicionais
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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        backdropFilter: 'blur(3px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={fontSizeClass}
        style={{
          background: highContrast ? '#ffffff' : '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          border: highContrast ? '3px solid #000000' : '1px solid #cbd5e1'
        }}
      >
        {/* Topo com Foto e Botão Fechar */}
        <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#e2e8f0' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff'
            }}
          >
            <X size={20} />
          </button>

          {product.isCombo && (
            <span style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: '#e11d48',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.5px'
            }}>
              ★ COMBO PROMOCIONAL
            </span>
          )}
        </div>

        {/* Corpo rolável */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Título e Preço */}
          <div>
            <h2 style={{ fontSize: '1.4em', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '0.95em', color: '#475569', marginTop: '6px', lineHeight: '1.4' }}>
              {product.desc}
            </p>
            <div style={{ fontSize: '1.3em', fontWeight: '800', color: highContrast ? '#000000' : '#059669', marginTop: '8px' }}>
              Preço base: R$ {product.price.toFixed(2)}
            </div>
          </div>

          {/* 1. SEÇÃO DE RETIRAR INGREDIENTES */}
          {product.removableIngredients && product.removableIngredients.length > 0 && (
            <div style={{
              background: highContrast ? '#f8fafc' : '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', fontSize: '1.05em', color: '#0f172a' }}>
                  Retirar algum ingrediente?
                </span>
                <span style={{ fontSize: '0.85em', color: '#64748b' }}>Opcional (Gratuito)</span>
              </div>
              <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '10px' }}>
                Marque abaixo o que o cliente NÃO quer no lanche:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.removableIngredients.map((item) => {
                  const isChecked = removedIngredients.includes(item);
                  return (
                    <label 
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: isChecked ? '#fee2e2' : '#ffffff',
                        border: isChecked ? '2px solid #ef4444' : '1px solid #cbd5e1',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontWeight: isChecked ? '700' : '500', color: isChecked ? '#b91c1c' : '#1e293b' }}>
                        {item}
                      </span>
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRemove(item)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. SEÇÃO DE ADICIONAIS PAGOS */}
          {product.additionals && product.additionals.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', fontSize: '1.05em', color: '#0f172a' }}>
                  Turbine seu lanche (Adicionais)
                </span>
                <span style={{ fontSize: '0.85em', color: '#059669', fontWeight: '600' }}>Com acréscimo</span>
              </div>
              <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '10px' }}>
                Escolha adicionais para somar ao valor do lanche:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.additionals.map((add) => {
                  const isChecked = selectedAdditionals.some(a => a.id === add.id);
                  return (
                    <label 
                      key={add.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: isChecked ? '#dcfce7' : '#ffffff',
                        border: isChecked ? '2px solid #16a34a' : '1px solid #cbd5e1',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: isChecked ? '700' : '500', color: '#1e293b' }}>
                          + {add.name}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.85em', color: '#059669', fontWeight: '700', marginTop: '2px' }}>
                          + R$ {add.price.toFixed(2)}
                        </span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAdditional(add)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. OBSERVAÇÕES PARA A COZINHA */}
          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '1em', color: '#0f172a', marginBottom: '6px' }}>
              Observações do cliente para a cozinha:
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Pão bem tostado na chapa, cortar o lanche ao meio, maionese à parte..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95em',
                resize: 'none'
              }}
            />
          </div>
        </div>

        {/* Rodapé com Contador e Botão Grande de Adicionar */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Seletor de Quantidade */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid #0f172a',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Diminuir quantidade"
              style={{
                background: '#f1f5f9',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a'
              }}
            >
              <Minus size={18} />
            </button>
            <span style={{
              padding: '10px 16px',
              fontWeight: '800',
              fontSize: '1.1em',
              minWidth: '40px',
              textAlign: 'center'
            }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Aumentar quantidade"
              style={{
                background: '#f1f5f9',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a'
              }}
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Botão de Adicionar ao Pedido */}
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              background: highContrast ? '#000000' : '#0f172a',
              color: '#ffffff',
              padding: '14px 20px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: highContrast ? '2px solid #facc15' : 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <span>Adicionar ao Pedido</span>
            <span>•</span>
            <span style={{ color: highContrast ? '#facc15' : '#4ade80' }}>
              R$ {totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
