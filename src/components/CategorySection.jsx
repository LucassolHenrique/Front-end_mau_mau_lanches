import React from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import ProductCard from './ProductCard';

export default function CategorySection({ 
  category, 
  products, 
  onToggleCategory, 
  onSelectProduct, 
  onToggleProduct, 
  onDuplicateProduct, 
  onEditProduct,
  onAddNewProduct,
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
        borderRadius: '10px',
        border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
        padding: '18px',
        marginBottom: '20px',
        opacity: isCategoryActive ? 1 : 0.8
      }}
    >
      {/* Cabecalho da Categoria */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '14px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ 
              fontSize: '1.2em', 
              fontWeight: '700', 
              color: '#0f172a'
            }}>
              {category.name}
            </h2>

            {category.isCombo && (
              <span style={{
                background: '#e11d48',
                color: '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.7em',
                fontWeight: '700',
                letterSpacing: '0.4px',
                textTransform: 'uppercase'
              }}>
                Combos
              </span>
            )}

            <span style={{
              fontSize: '0.75em',
              fontWeight: '600',
              padding: '2px 6px',
              borderRadius: '4px',
              background: isCategoryActive ? '#f0fdf4' : '#fef2f2',
              color: isCategoryActive ? '#15803d' : '#b91c1c'
            }}>
              {isCategoryActive ? 'Ativa' : 'Pausada'}
            </span>
          </div>

          <p style={{ fontSize: '0.85em', color: '#64748b', marginTop: '2px' }}>
            {category.description}
          </p>
        </div>

        {/* Botoes de Acao da Secao */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => onAddNewProduct(category.id)}
            title={`Cadastrar novo prato em ${category.name}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.8em',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={14} />
            <span>Novo Item</span>
          </button>

          <button
            onClick={() => onToggleCategory(category.id)}
            title={isCategoryActive ? 'Pausar toda a categoria' : 'Ativar toda a categoria'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.8em',
              background: isCategoryActive ? '#f8fafc' : '#15803d',
              color: isCategoryActive ? '#475569' : '#ffffff',
              border: isCategoryActive ? '1px solid #cbd5e1' : 'none',
              cursor: 'pointer'
            }}
          >
            {isCategoryActive ? (
              <>
                <EyeOff size={14} />
                <span>Pausar Secao</span>
              </>
            ) : (
              <>
                <Eye size={14} />
                <span>Ativar Secao</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid de Itens */}
      {!isCategoryActive ? (
        <div style={{
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '6px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.9em'
        }}>
          Categoria temporariamente pausada para vendas no balcao e entrega.
        </div>
      ) : products.length === 0 ? (
        <div style={{
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '6px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.85em'
        }}>
          Nenhum prato cadastrado nesta secao.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px'
        }}>
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onToggleActive={onToggleProduct}
              onDuplicate={onDuplicateProduct}
              onEdit={onEditProduct}
              highContrast={highContrast}
              fontSizeClass={fontSizeClass}
            />
          ))}
        </div>
      )}
    </section>
  );
}
