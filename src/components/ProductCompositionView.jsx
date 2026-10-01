import React from 'react';

export default function ProductCompositionView({ composition }) {
  if (!composition) return null;

  const parts = [
    { label: 'Pao', value: composition.pao },
    { label: 'Carne / Proteina', value: composition.carne },
    { label: 'Queijo', value: composition.queijo },
    { label: 'Frios / Embutidos', value: composition.frios },
    { label: 'Salada / Vegetais', value: composition.salada },
    { label: 'Molho', value: composition.molho },
    { label: 'Acompanhamento', value: composition.acompanhamento }
  ].filter(p => p.value && p.value !== 'Nao se aplica' && p.value !== 'Nenhum');

  if (parts.length === 0) return null;

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px 14px',
      marginTop: '10px'
    }}>
      <span style={{
        display: 'block',
        fontSize: '0.8em',
        fontWeight: '700',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px'
      }}>
        Composicao dos Ingredientes:
      </span>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
        {parts.map((p, idx) => (
          <div key={idx} style={{ background: '#ffffff', border: '1px solid #edf2f7', borderRadius: '6px', padding: '6px 10px' }}>
            <span style={{ display: 'block', fontSize: '0.75em', color: '#64748b', fontWeight: '600' }}>
              {p.label}:
            </span>
            <span style={{ fontSize: '0.85em', color: '#0f172a', fontWeight: '700' }}>
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
