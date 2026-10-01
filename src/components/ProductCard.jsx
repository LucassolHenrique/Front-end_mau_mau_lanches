import React from 'react';
import { Copy, Edit3, Power, Plus, AlertCircle } from 'lucide-react';
import ProductCompositionView from './ProductCompositionView';

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
          : (isAvailable ? '1px solid #e2e8f0' : '1px dashed #cbd5e1'),
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isAvailable ? 1 : 0.75,
        boxShadow: isAvailable ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      {/* Imagem do Produto com Badges e Botoes */}
      <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: '#e2e8f0' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: isAvailable ? 'none' : 'grayscale(100%)'
          }}
          loading="lazy"
        />

        {/* Badges de Estoque / Status */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {isOutOfStock ? (
            <span style={{
              background: '#b91c1c',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <AlertCircle size={12} /> Esgotado
            </span>
          ) : !product.active ? (
            <span style={{
              background: '#475569',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              Pausado
            </span>
          ) : product.stockQuantity !== undefined ? (
            <span style={{
              background: product.stockQuantity <= 3 ? '#b45309' : '#15803d',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              {product.stockQuantity <= 3 ? `Restam ${product.stockQuantity} un` : `${product.stockQuantity} disponiveis`}
            </span>
          ) : null}
        </div>

        {/* Botoes de Acao: Editar, Copiar, Pausar */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '4px'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            title="Editar dados e composicao do item"
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Edit3 size={11} />
            <span>Editar</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(product);
            }}
            title="Duplicar este item no cardapio"
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Copy size={11} />
            <span>Copiar</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleActive(product.id);
            }}
            title={product.active ? 'Pausar venda deste item' : 'Reativar venda deste item'}
            style={{
              background: product.active ? '#fee2e2' : '#dcfce7',
              color: product.active ? '#b91c1c' : '#15803d',
              border: product.active ? '1px solid #fca5a5' : '1px solid #86efac',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Power size={11} />
            <span>{product.active ? 'Pausar' : 'Ativar'}</span>
          </button>
        </div>
      </div>

      {/* Conteudo do Card */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.1em', 
            fontWeight: '700', 
            color: '#0f172a', 
            lineHeight: '1.3',
            marginBottom: '4px'
          }}>
            {product.name}
          </h3>

          <p style={{ 
            fontSize: '0.85em', 
            color: '#64748b', 
            lineHeight: '1.35', 
            marginBottom: '6px'
          }}>
            {product.desc}
          </p>

          {/* Componente que separa cada parte da comida (pao, carne, queijo, etc.) */}
          <ProductCompositionView composition={product.composition} />
        </div>

        {/* Rodape de Preco e Acao */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '12px', 
          paddingTop: '10px', 
          borderTop: '1px solid #f1f5f9' 
        }}>
          <div>
            <span style={{ fontSize: '0.75em', color: '#64748b', display: 'block' }}>Preco unitario</span>
            <span style={{ 
              fontSize: '1.15em', 
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
              color: !isAvailable ? '#64748b' : '#ffffff',
              border: highContrast ? '2px solid #facc15' : 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.9em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: isAvailable ? 'pointer' : 'not-allowed'
            }}
          >
            <Plus size={15} />
            <span>{isOutOfStock ? 'Esgotado' : !product.active ? 'Pausado' : 'Pedir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
