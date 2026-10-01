import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Trash2, AlertTriangle, Layers } from 'lucide-react';

export default function ProductEditModal({ 
  product, 
  categories, 
  onClose, 
  onSave, 
  onSaveAsNew, 
  onDelete, 
  highContrast,
  fontSizeClass 
}) {
  const isCreating = !product || !product.id;

  const [name, setName] = useState('');
  const [catId, setCatId] = useState(categories[0]?.id || 2);
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [stockQuantity, setStockQuantity] = useState('10');
  const [hasStockLimit, setHasStockLimit] = useState(true);
  const [image, setImage] = useState('');
  const [removableText, setRemovableText] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCatId(product.catId || categories[0]?.id || 2);
      setPrice(product.price ? product.price.toString() : '');
      setDesc(product.desc || '');
      setStockQuantity(product.stockQuantity !== undefined ? product.stockQuantity.toString() : '10');
      setHasStockLimit(product.hasStockLimit ?? true);
      setImage(product.image || '');
      setRemovableText(product.removableIngredients ? product.removableIngredients.join(', ') : '');
    } else {
      setName('');
      setCatId(categories[0]?.id || 2);
      setPrice('');
      setDesc('');
      setStockQuantity('15');
      setHasStockLimit(true);
      setImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80');
      setRemovableText('Sem Tomate, Sem Alface, Sem Maionese');
    }
  }, [product, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Por favor, informe o nome do prato/lanche.');
    if (!price || parseFloat(price) <= 0) return alert('Informe um preço válido.');

    const removableIngredients = removableText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const productPayload = {
      ...(product || {}),
      name: name.trim(),
      catId: Number(catId),
      price: parseFloat(price),
      desc: desc.trim(),
      stockQuantity: hasStockLimit ? Math.max(0, parseInt(stockQuantity, 10) || 0) : 9999,
      hasStockLimit,
      image: image.trim() || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      removableIngredients
    };

    onSave(productPayload);
  };

  const handleSaveAsNewClick = () => {
    if (!name.trim()) return alert('Informe o nome para o novo prato.');
    const removableIngredients = removableText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newProductPayload = {
      ...(product || {}),
      name: name.trim().endsWith('(Novo)') ? name.trim() : `${name.trim()} (Novo)`,
      catId: Number(catId),
      price: parseFloat(price) || 0,
      desc: desc.trim(),
      stockQuantity: hasStockLimit ? Math.max(0, parseInt(stockQuantity, 10) || 0) : 9999,
      hasStockLimit,
      image: image.trim(),
      removableIngredients
    };

    onSaveAsNew(newProductPayload);
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
        zIndex: 10000,
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
          background: '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          border: highContrast ? '3px solid #000000' : '1px solid #cbd5e1'
        }}
      >
        {/* Cabeçalho do Modal */}
        <div style={{
          padding: '16px 20px',
          background: highContrast ? '#000000' : '#0f172a',
          color: highContrast ? '#facc15' : '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25em', fontWeight: '800' }}>
            {isCreating ? '➕ Adicionar Novo Prato ao Cardápio' : `✏️ Editar: ${product?.name}`}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{
              background: 'transparent',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulário com Campos Claros e Grandes */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Nome do Prato */}
          <div>
            <label style={{ display: 'block', fontWeight: '700', marginBottom: '6px', fontSize: '1em' }}>
              Nome do Prato / Lanche:
            </label>
            <input 
              type="text"
              required
              placeholder="Ex: Xis Coração sem Bacon, Hambúrguer Artesanal..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', fontSize: '1.05em', fontWeight: '600' }}
            />
          </div>

          {/* Categoria e Preço lado a lado */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '6px', fontSize: '0.95em' }}>
                Categoria:
              </label>
              <select
                value={catId}
                onChange={(e) => setCatId(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', fontSize: '0.95em', fontWeight: '600' }}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '6px', fontSize: '0.95em' }}>
                Preço de Venda (R$):
              </label>
              <input 
                type="number"
                step="0.50"
                min="0"
                required
                placeholder="Ex: 28.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1.05em', fontWeight: '700', color: '#059669' }}
              />
            </div>
          </div>

          {/* Ingredientes e Descrição */}
          <div>
            <label style={{ display: 'block', fontWeight: '700', marginBottom: '6px', fontSize: '0.95em' }}>
              Descrição dos Ingredientes (O que vai no lanche):
            </label>
            <textarea 
              rows={2}
              placeholder="Ex: Pão prensado, coração de frango no alho, queijo duplo e maionese"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '0.95em' }}
            />
          </div>

          {/* Opções de Retirada de Ingredientes */}
          <div>
            <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', fontSize: '0.95em' }}>
              Opções que o cliente pode pedir para RETIRAR:
            </label>
            <span style={{ fontSize: '0.85em', color: '#64748b', display: 'block', marginBottom: '6px' }}>
              Separe por vírgula (Ex: Sem Tomate, Sem Bacon, Sem Maionese)
            </span>
            <input 
              type="text"
              placeholder="Ex: Sem Tomate, Sem Alface, Sem Maionese"
              value={removableText}
              onChange={(e) => setRemovableText(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '0.95em' }}
            />
          </div>

          {/* CONTROLE DE ESTOQUE / LIMITE DE VENDAS DIÁRIAS (ex: carne acabou) */}
          <div style={{
            background: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '800', fontSize: '1em', color: '#0f172a' }}>
                🥩 Controle de Limite de Vendas (Estoque da Noite)
              </span>
            </div>
            
            <p style={{ fontSize: '0.85em', color: '#475569', marginBottom: '10px' }}>
              Se a carne ou o insumo acabar, o sistema bloqueia os pedidos deste item automaticamente.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '0.9em', fontWeight: '700', color: '#334155' }}>
                Unidades disponíveis para venda hoje:
              </label>
              <input 
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                style={{ width: '90px', padding: '8px', fontSize: '1.1em', fontWeight: '800', textAlign: 'center' }}
              />
              <span style={{ fontSize: '0.85em', color: '#64748b' }}>porções restantes</span>
            </div>
          </div>

          {/* Imagem do Prato */}
          <div>
            <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', fontSize: '0.9em', color: '#475569' }}>
              Link da Foto do Prato (opcional):
            </label>
            <input 
              type="text"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '0.85em', color: '#64748b' }}
            />
          </div>

          {/* Botões de Ação na Parte Inferior */}
          <div style={{
            borderTop: '2px solid #f1f5f9',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Botão Salvar Principal */}
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: highContrast ? '#000000' : '#15803d',
                  color: highContrast ? '#facc15' : '#ffffff',
                  border: highContrast ? '2px solid #facc15' : 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Save size={18} />
                <span>{isCreating ? 'Cadastrar Prato' : 'Salvar Alterações'}</span>
              </button>

              {/* Botão Salvar como Novo Prato (Criar Variação) */}
              {!isCreating && (
                <button
                  type="button"
                  onClick={handleSaveAsNewClick}
                  title="Salvar como um novo prato separado no cardápio"
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.95em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Layers size={18} />
                  <span>Salvar como Novo Prato</span>
                </button>
              )}
            </div>

            {/* Botão Excluir Prato */}
            {!isCreating && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Tem certeza que deseja EXCLUIR "${product.name}" do cardápio?`)) {
                    onDelete(product.id);
                  }
                }}
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #f87171',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.9em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} />
                <span>Excluir Este Prato Definitivamente</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
