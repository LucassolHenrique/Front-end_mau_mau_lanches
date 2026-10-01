import React from 'react';
import { Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import ProductCard from './ProductCard';

export default function CategorySection({ 
  category, 
  products, 
  onToggleCategory, 
  onSelectProduct, 
  onToggleProduct, 
  onDuplicateProduct, 
  highContrast,
  fontSizeClass 
}) {
  const isCategoryActive = category.active;

  return (
    <section 
      aria-label={`Categoria ${category.name}`}
      className={fontSizeClass}
      style={{
        background: '#ffffff',
        borderRadius: '14px',
        border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        opacity: isCategoryActive ? 1 : 0.75
      }}
    >
      {/* Cabeçalho da Seção com Switch de Ativar/Desativar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '14px',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ 
              fontSize: '1.3em', 
              fontWeight: '800', 
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {category.name}
            </h2>

            {category.isCombo && (
              <span style={{
                background: '#f43f5e',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.75em',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} /> PROMOÇÃO ATIVA
              </span>
            )}

            <span style={{
              fontSize: '0.8em',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '6px',
              background: isCategoryActive ? '#dcfce7' : '#fee2e2',
              color: isCategoryActive ? '#15803d' : '#b91c1c'
            }}>
              {isCategoryActive ? 'SEÇÃO DISPONÍVEL' : 'SEÇÃO PAUSADA'}
            </span>
          </div>

          <p style={{ fontSize: '0.9em', color: '#64748b', marginTop: '3px' }}>
            {category.description}
          </p>
        </div>

        {/* Botão de Controle da Categoria (Ativar / Desativar a Seção inteira) */}
        <button
          onClick={() => onToggleCategory(category.id)}
          title={isCategoryActive ? 'Desativar toda esta seção do cardápio' : 'Ativar toda esta seção do cardápio'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '0.9em',
            background: isCategoryActive ? '#f1f5f9' : '#15803d',
            color: isCategoryActive ? '#334155' : '#ffffff',
            border: isCategoryActive ? '1px solid #cbd5e1' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isCategoryActive ? (
            <>
              <EyeOff size={16} />
              <span>Pausar Esta Categoria</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span>Ativar Esta Categoria</span>
            </>
          )}
        </button>
      </div>

      {/* Mensagem se a categoria estiver pausada */}
      {!isCategoryActive ? (
        <div style={{
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '10px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <p style={{ fontWeight: '700', fontSize: '1.05em', color: '#334155', marginBottom: '4px' }}>
            Esta categoria está temporariamente pausada para pedidos.
          </p>
          <p style={{ fontSize: '0.9em' }}>
            Nenhum item desta seção aparecerá para os clientes até ser reativada no botão acima.
          </p>
        </div>
      ) : (
        /* Grid de Produtos da Categoria */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onToggleActive={onToggleProduct}
              onDuplicate={onDuplicateProduct}
              highContrast={highContrast}
              fontSizeClass={fontSizeClass}
            />
          ))}
        </div>
      )}
    </section>
  );
}
