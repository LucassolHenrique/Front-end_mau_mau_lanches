import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Trash2 } from 'lucide-react';

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

  // Partes estruturadas da comida
  const [pao, setPao] = useState('');
  const [carne, setCarne] = useState('');
  const [queijo, setQueijo] = useState('');
  const [frios, setFrios] = useState('');
  const [salada, setSalada] = useState('');
  const [molho, setMolho] = useState('');
  const [acompanhamento, setAcompanhamento] = useState('');

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
      
      const comp = product.composition || {};
      setPao(comp.pao || '');
      setCarne(comp.carne || '');
      setQueijo(comp.queijo || '');
      setFrios(comp.frios || '');
      setSalada(comp.salada || '');
      setMolho(comp.molho || '');
      setAcompanhamento(comp.acompanhamento || '');
    } else {
      setName('');
      setCatId(categories[0]?.id || 2);
      setPrice('');
      setDesc('');
      setStockQuantity('15');
      setHasStockLimit(true);
      setImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80');
      setRemovableText('Sem Tomate, Sem Alface, Sem Maionese');
      setPao('Pao de Xis Tradicional');
      setCarne('Hamburguer Bovino 200g');
      setQueijo('Queijo Prato');
      setFrios('Presunto');
      setSalada('Alface e Tomate');
      setMolho('Maionese da Casa');
      setAcompanhamento('');
    }
  }, [product, categories]);

  const getCompositionPayload = () => ({
    pao: pao.trim(),
    carne: carne.trim(),
    queijo: queijo.trim(),
    frios: frios.trim(),
    salada: salada.trim(),
    molho: molho.trim(),
    acompanhamento: acompanhamento.trim()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Informe o nome do item.');
    if (!price || parseFloat(price) <= 0) return alert('Informe um preco valido.');

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
      removableIngredients,
      composition: getCompositionPayload()
    };

    onSave(productPayload);
  };

  const handleSaveAsNewClick = () => {
    if (!name.trim()) return alert('Informe o nome para o novo item.');
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
      removableIngredients,
      composition: getCompositionPayload()
    };

    onSaveAsNew(newProductPayload);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '16px'
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
          borderRadius: '12px',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: highContrast ? '2px solid #000000' : '1px solid #cbd5e1'
        }}
      >
        {/* Cabecalho Limpo e Sobrio */}
        <div style={{
          padding: '16px 20px',
          background: highContrast ? '#000000' : '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8em', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Ficha Tecnica e Cadastro
            </span>
            <h2 style={{ fontSize: '1.2em', fontWeight: '700', marginTop: '2px' }}>
              {isCreating ? 'Novo Item do Cardapio' : `Editar: ${product?.name}`}
            </h2>
          </div>
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
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Dados Gerais: Nome, Categoria, Preco */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '0.9em' }}>
                Nome do Item:
              </label>
              <input 
                type="text"
                required
                placeholder="Ex: Xis Coracao sem Bacon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '1em' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '0.9em' }}>
                Preco (R$):
              </label>
              <input 
                type="number"
                step="0.50"
                min="0"
                required
                placeholder="28.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '1em', fontWeight: '700' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '0.9em' }}>
              Categoria:
            </label>
            <select
              value={catId}
              onChange={(e) => setCatId(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px' }}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* COMPOSICAO DA COMIDA EM COMPONENTES INDIVIDUAIS (PAO, CARNE, QUEIJO, ETC) */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px'
          }}>
            <span style={{ display: 'block', fontWeight: '700', fontSize: '0.95em', color: '#0f172a', marginBottom: '4px' }}>
              Composicao da Comida (Ficha Tecnica por Componentes)
            </span>
            <span style={{ display: 'block', fontSize: '0.8em', color: '#64748b', marginBottom: '12px' }}>
              Defina cada parte do lanche de forma estruturada:
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  1. Pao:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Pao de Xis Tradicional" 
                  value={pao} 
                  onChange={(e) => setPao(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  2. Carne / Proteina:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Hamburguer Bovino 200g, Coracao" 
                  value={carne} 
                  onChange={(e) => setCarne(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  3. Queijo / Laticinio:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Queijo Prato Duplo, Cheddar" 
                  value={queijo} 
                  onChange={(e) => setQueijo(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  4. Frios e Embutidos:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Bacon Fatiado, Presunto" 
                  value={frios} 
                  onChange={(e) => setFrios(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  5. Salada / Vegetais:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Alface, Tomate, Milho" 
                  value={salada} 
                  onChange={(e) => setSalada(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  6. Molhos:
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Maionese Temperada da Casa" 
                  value={molho} 
                  onChange={(e) => setMolho(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
                />
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                7. Acompanhamento / Adicionais Inclusos:
              </label>
              <input 
                type="text" 
                placeholder="Ex: Batata Frita 200g e Refrigerante Lata (em combos)" 
                value={acompanhamento} 
                onChange={(e) => setAcompanhamento(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '0.9em' }} 
              />
            </div>
          </div>

          {/* Opcoes de Retirada */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '2px', fontSize: '0.9em' }}>
              Opcoes para Retirada no Pedido:
            </label>
            <span style={{ fontSize: '0.8em', color: '#64748b', display: 'block', marginBottom: '6px' }}>
              Valores separados por virgula (ex: Sem Tomate, Sem Bacon, Sem Maionese)
            </span>
            <input 
              type="text"
              placeholder="Ex: Sem Tomate, Sem Bacon, Sem Maionese"
              value={removableText}
              onChange={(e) => setRemovableText(e.target.value)}
              style={{ width: '100%', padding: '8px 10px' }}
            />
          </div>

          {/* Controle de Estoque da Noite */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'block', fontWeight: '600', fontSize: '0.9em', color: '#0f172a' }}>
                  Limite de Vendas por Estoque Disponivel
                </span>
                <span style={{ fontSize: '0.8em', color: '#64748b' }}>
                  Quantidade de porcoes de carne/lanche disponiveis para a noite
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="number"
                  min="0"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  style={{ width: '80px', padding: '6px', textAlign: 'center', fontWeight: '700' }}
                />
                <span style={{ fontSize: '0.85em', color: '#475569' }}>unidades</span>
              </div>
            </div>
          </div>

          {/* Botoes de Acao */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.95em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Save size={16} />
                <span>{isCreating ? 'Cadastrar Item' : 'Salvar Alteracoes'}</span>
              </button>

              {!isCreating && (
                <button
                  type="button"
                  onClick={handleSaveAsNewClick}
                  title="Gera um novo item independente com os dados preenchidos"
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.95em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Layers size={16} />
                  <span>Salvar como Novo Prato</span>
                </button>
              )}
            </div>

            {!isCreating && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Confirma a exclusao definitiva de "${product.name}"?`)) {
                    onDelete(product.id);
                  }
                }}
                style={{
                  background: '#ffffff',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  padding: '8px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={15} />
                <span>Excluir Item do Cardapio</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
