import React from 'react';
import { Copy, Edit3, Power, Plus, Sparkles, AlertCircle } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelect, 
  onToggleActive, 
  onDuplicate, 
  onEdit,
  highContrast,
  fontSizeClass 
}) {
  const isAvailable = product.active && (product.stockQuantity === undefined || product.stockQuantity > 0);
  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity === 0;

  return (
    <div 
      className={fontSizeClass}
      style={{
        background: isAvailable ? '#ffffff' : '#f8fafc',
        border: highContrast 
          ? (isAvailable ? '2px solid #000000' : '2px dashed #dc2626')
          : (isAvailable ? '1px solid #e2e8f0' : '1px dashed #f87171'),
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isAvailable ? 1 : 0.75,
        transition: 'all 0.15s ease',
        boxShadow: isAvailable ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
        position: 'relative'
      }}
    >
      {/* Imagem do Produto com Badges e Ações */}
      <div style={{ position: 'relative', width: '100%', height: '145px', backgroundColor: '#e2e8f0' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: isAvailable ? 'none' : 'grayscale(90%)'
          }}
          loading="lazy"
        />

        {/* Badges de Status e Estoque */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {/* Badge Esgotado ou Disponível */}
          {isOutOfStock ? (
            <span style={{
              background: '#b91c1c',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              <AlertCircle size={13} /> ACABOU O ESTOQUE
            </span>
          ) : !product.active ? (
            <span style={{
              background: '#475569',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '800',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              PAUSADO PELO ATENDENTE
            </span>
          ) : product.stockQuantity !== undefined ? (
            <span style={{
              background: product.stockQuantity <= 3 ? '#d97706' : '#15803d',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {product.stockQuantity <= 3 ? `ÚLTIMAS ${product.stockQuantity} UN!` : `${product.stockQuantity} un disponíveis`}
            </span>
          ) : null}

          {product.isCombo && (
            <span style={{
              background: '#e11d48',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '800',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              width: 'fit-content'
            }}>
              <Sparkles size={12} /> COMBO
            </span>
          )}
        </div>

        {/* Botões Rápidos de Ação: Editar, Copiar e Pausar */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '4px'
        }}>
          {/* Botão de Editar Prato */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            title="Editar nome, preço, ingredientes ou estoque"
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '5px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Edit3 size={12} />
            <span>Editar</span>
          </button>

          {/* Botão de Copiar Prato */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(product);
            }}
            title="Copiar este alimento para criar outro"
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '5px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Copy size={12} />
            <span>Copiar</span>
          </button>

          {/* Botão de Pausar/Ativar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleActive(product.id);
            }}
            title={product.active ? 'Pausar venda imediata deste item' : 'Reativar venda deste item'}
            style={{
              background: product.active ? '#fee2e2' : '#dcfce7',
              color: product.active ? '#b91c1c' : '#15803d',
              border: product.active ? '1px solid #f87171' : '1px solid #86efac',
              borderRadius: '6px',
              padding: '5px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Power size={12} />
            <span>{product.active ? 'Pausar' : 'Ativar'}</span>
          </button>
        </div>
      </div>

      {/* Detalhes do Lanche */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.15em', 
            fontWeight: '800', 
            color: '#0f172a', 
            lineHeight: '1.25',
            marginBottom: '4px'
          }}>
            {product.name}
          </h3>
          <p style={{ 
            fontSize: '0.88em', 
            color: '#64748b', 
            lineHeight: '1.35', 
            marginBottom: '10px'
          }}>
            {product.desc}
          </p>
        </div>

        {/* Rodapé com Preço e Botão de Montar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '8px', 
          paddingTop: '8px', 
          borderTop: '1px solid #f1f5f9' 
        }}>
          <div>
            <span style={{ fontSize: '0.75em', color: '#64748b', display: 'block' }}>Preço</span>
            <span style={{ 
              fontSize: '1.2em', 
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
              cursor: isAvailable ? 'pointer' : 'not-allowed'
            }}
          >
            <Plus size={16} />
            <span>{isOutOfStock ? 'Esgotado' : !product.active ? 'Pausado' : 'Montar / Pedir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
