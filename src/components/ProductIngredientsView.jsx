import React from 'react';

export default function ProductIngredientsView({ ingredients }) {
  if (!ingredients) return null;

  const list = [
    { label: 'Pao', val: ingredients.pao },
    { label: 'Carne', val: ingredients.carne },
    { label: 'Queijo', val: ingredients.queijo },
    { label: 'Frios', val: ingredients.frios },
    { label: 'Salada', val: ingredients.salada },
    { label: 'Molho', val: ingredients.molho },
    { label: 'Acompanhamento', val: ingredients.acompanhamento }
  ].filter(i => i.val && i.val !== 'Nenhum' && i.val !== 'Nenhuma' && i.val !== 'Nao se aplica');

  if (list.length === 0) return null;

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '8px 10px',
      marginTop: '8px'
    }}>
      <span style={{
        display: 'block',
        fontSize: '0.75em',
        fontWeight: '700',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
        marginBottom: '6px'
      }}>
        Ingredientes:
      </span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {list.map((item, idx) => (
          <span 
            key={idx}
            style={{
              fontSize: '0.8em',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#1e293b',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            <strong>{item.label}:</strong> {item.val}
          </span>
        ))}
      </div>
    </div>
  );
}
