import React from 'react';
import { Eye, EyeOff, Sparkles, PlusCircle } from 'lucide-react';
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
        borderRadius: '14px',
        border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
        padding: '18px 20px',
        marginBottom: '24px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        opacity: isCategoryActive ? 1 : 0.75
      }}
    >
      {/* Cabeçalho da Seção */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ 
              fontSize: '1.25em', 
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
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} /> COMBOS
              </span>
            )}

            <span style={{
              fontSize: '0.75em',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '6px',
              background: isCategoryActive ? '#dcfce7' : '#fee2e2',
              color: isCategoryActive ? '#15803d' : '#b91c1c'
            }}>
              {isCategoryActive ? 'SEÇÃO ATIVA' : 'SEÇÃO PAUSADA'}
            </span>
          </div>

          <p style={{ fontSize: '0.85em', color: '#64748b', marginTop: '2px' }}>
            {category.description}
          </p>
        </div>

        {/* Botões de Ação da Categoria */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Botão Adicionar Novo Prato Nesta Categoria */}
          <button
            onClick={() => onAddNewProduct(category.id)}
            title={`Adicionar novo prato em ${category.name}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85em',
              background: '#0f172a',
              color: '#ffffff',
              border: highContrast ? '2px solid #facc15' : 'none',
              cursor: 'pointer'
            }}
          >
            <PlusCircle size={15} />
            <span>+ Novo Lanche</span>
          </button>

          {/* Botão Pausar / Ativar a Categoria Inteira */}
          <button
            onClick={() => onToggleCategory(category.id)}
            title={isCategoryActive ? 'Pausar toda a categoria temporariamente' : 'Ativar toda a categoria'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85em',
              background: isCategoryActive ? '#f1f5f9' : '#15803d',
              color: isCategoryActive ? '#475569' : '#ffffff',
              border: isCategoryActive ? '1px solid #cbd5e1' : 'none',
              cursor: 'pointer'
            }}
          >
            {isCategoryActive ? (
              <>
                <EyeOff size={15} />
                <span>Pausar Seção</span>
              </>
            ) : (
              <>
                <Eye size={15} />
                <span>Ativar Seção</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo da Categoria */}
      {!isCategoryActive ? (
        <div style={{
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <p style={{ fontWeight: '700', fontSize: '1em', color: '#334155' }}>
            Esta categoria está temporariamente pausada para vendas.
          </p>
          <p style={{ fontSize: '0.85em', marginTop: '2px' }}>
            Clique em "Ativar Seção" acima para voltar a aceitar pedidos.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div style={{
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <p style={{ fontWeight: '700', fontSize: '0.95em' }}>Nenhum prato cadastrado nesta seção.</p>
          <button
            onClick={() => onAddNewProduct(category.id)}
            style={{
              marginTop: '8px',
              background: '#0f172a',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.85em',
              fontWeight: '700'
            }}
          >
            + Criar o primeiro prato
          </button>
        </div>
      ) : (
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
