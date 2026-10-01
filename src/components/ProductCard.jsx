import React from 'react';
import { Copy, Power, Plus, Sparkles } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelect, 
  onToggleActive, 
  onDuplicate, 
  highContrast,
  fontSizeClass 
}) {
  const isAvailable = product.active;

  return (
    <div 
      className={fontSizeClass}
      style={{
        background: isAvailable ? '#ffffff' : '#f1f5f9',
        border: highContrast 
          ? (isAvailable ? '2px solid #000000' : '2px dashed #94a3b8')
          : (isAvailable ? '1px solid #e2e8f0' : '1px dashed #cbd5e1'),
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isAvailable ? 1 : 0.65,
        transition: 'all 0.2s ease',
        boxShadow: isAvailable ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        position: 'relative'
      }}
    >
      {/* Imagem do Produto com Badges */}
      <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: '#e2e8f0' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: isAvailable ? 'none' : 'grayscale(80%)'
          }}
          loading="lazy"
        />

        {/* Badge do Status (Ativo ou Pausado) */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          gap: '6px'
        }}>
          <span style={{
            background: isAvailable ? '#15803d' : '#b91c1c',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {isAvailable ? 'ATIVO' : 'PAUSADO'}
          </span>

          {product.isCombo && (
            <span style={{
              background: '#e11d48',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={12} /> COMBO
            </span>
          )}
        </div>

        {/* Ações Rápidas: Copiar Produto e Alternar Ativo/Inativo */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '6px'
        }}>
          {/* Botão de Copiar Alimento */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(product);
            }}
            title="Copiar / Clonar este alimento no cardápio"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
          >
            <Copy size={13} />
            <span>Copiar</span>
          </button>

          {/* Botão de Ativar / Desativar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleActive(product.id);
            }}
            title={isAvailable ? 'Pausar venda deste produto' : 'Reativar venda deste produto'}
            style={{
              background: isAvailable ? 'rgba(255, 255, 255, 0.95)' : '#fee2e2',
              color: isAvailable ? '#475569' : '#b91c1c',
              border: isAvailable ? '1px solid #cbd5e1' : '1px solid #f87171',
              borderRadius: '6px',
              padding: '6px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
          >
            <Power size={13} />
            <span>{isAvailable ? 'Pausar' : 'Ativar'}</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Informativo do Card */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.15em', 
            fontWeight: '700', 
            color: '#0f172a', 
            lineHeight: '1.3',
            marginBottom: '6px'
          }}>
            {product.name}
          </h3>
          <p style={{ 
            fontSize: '0.9em', 
            color: '#64748b', 
            lineHeight: '1.4', 
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.desc}
          </p>
        </div>

        {/* Rodapé com Preço e Botão de Pedir / Personalizar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '10px', 
          paddingTop: '10px', 
          borderTop: '1px solid #f1f5f9' 
        }}>
          <div>
            <span style={{ fontSize: '0.8em', color: '#64748b', display: 'block' }}>A partir de</span>
            <span style={{ 
              fontSize: '1.25em', 
              fontWeight: '800', 
              color: highContrast ? '#000000' : '#059669' 
            }}>
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onSelect(product)}
            disabled={!isAvailable}
            style={{
              background: !isAvailable 
                ? '#cbd5e1' 
                : (highContrast ? '#000000' : '#0f172a'),
              color: !isAvailable 
                ? '#64748b' 
                : '#ffffff',
              border: highContrast ? '2px solid #facc15' : 'none',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.95em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: isAvailable ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s ease'
            }}
          >
            <Plus size={16} />
            <span>{isAvailable ? 'Montar / Pedir' : 'Indisponível'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
