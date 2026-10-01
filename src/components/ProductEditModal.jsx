import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Trash2 } from 'lucide-react';
import { preRegisteredIngredients } from '../data/initialData';

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

  // Ingredientes pre-selecionados
  const [pao, setPao] = useState(preRegisteredIngredients.pao[0]);
  const [carne, setCarne] = useState(preRegisteredIngredients.carne[0]);
  const [queijo, setQueijo] = useState(preRegisteredIngredients.queijo[0]);
  const [frios, setFrios] = useState(preRegisteredIngredients.frios[0]);
  const [salada, setSalada] = useState(preRegisteredIngredients.salada[0]);
  const [molho, setMolho] = useState(preRegisteredIngredients.molho[0]);
  const [acompanhamento, setAcompanhamento] = useState(preRegisteredIngredients.acompanhamento[0]);

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
      
      const ing = product.ingredients || {};
      if (ing.pao) setPao(ing.pao);
      if (ing.carne) setCarne(ing.carne);
      if (ing.queijo) setQueijo(ing.queijo);
      if (ing.frios) setFrios(ing.frios);
      if (ing.salada) setSalada(ing.salada);
      if (ing.molho) setMolho(ing.molho);
      if (ing.acompanhamento) setAcompanhamento(ing.acompanhamento);
    } else {
      setName('');
      setCatId(categories[0]?.id || 2);
      setPrice('');
      setDesc('');
      setStockQuantity('15');
      setHasStockLimit(true);
      setImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80');
      setRemovableText('Sem Tomate, Sem Alface, Sem Maionese');
      setPao(preRegisteredIngredients.pao[0]);
      carneDefaultPorCategoria(categories[0]?.id || 2);
    }
  }, [product, categories]);

  const carneDefaultPorCategoria = (selectedCat) => {
    if (selectedCat === 3) {
      setPao('Pao de Cachorro-quente');
      setCarne('2 Salsichas Especiais');
      setFrios('Nenhum');
    } else if (selectedCat === 4 || selectedCat === 5) {
      setPao('Nao se aplica');
      setCarne('Nao se aplica');
      setQueijo('Nenhum');
      setFrios('Nenhum');
      setSalada('Nenhuma');
      setMolho('Nenhum');
    }
  };

  const getIngredientsPayload = () => ({
    pao,
    carne,
    queijo,
    frios,
    salada,
    molho,
    acompanhamento
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
      ingredients: getIngredientsPayload()
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
      ingredients: getIngredientsPayload()
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
          borderRadius: '10px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          border: highContrast ? '2px solid #000000' : '1px solid #cbd5e1'
        }}
      >
        {/* Cabecalho */}
        <div style={{
          padding: '14px 18px',
          background: highContrast ? '#000000' : '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.75em', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Cadastro de Cardapio
            </span>
            <h2 style={{ fontSize: '1.15em', fontWeight: '700', marginTop: '1px' }}>
              {isCreating ? 'Novo Item' : `Editar: ${product?.name}`}
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
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Nome e Preco */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '3px', fontSize: '0.85em' }}>
                Nome do Item:
              </label>
              <input 
                type="text"
                required
                placeholder="Ex: Xis Coracao sem Bacon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '7px 9px', fontSize: '0.95em' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '3px', fontSize: '0.85em' }}>
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
                style={{ width: '100%', padding: '7px 9px', fontSize: '0.95em', fontWeight: '700' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '3px', fontSize: '0.85em' }}>
              Categoria:
            </label>
            <select
              value={catId}
              onChange={(e) => {
                const newCat = Number(e.target.value);
                setCatId(newCat);
                carneDefaultPorCategoria(newCat);
              }}
              style={{ width: '100%', padding: '7px 9px', fontSize: '0.9em' }}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* SECAO COM PRE-CADASTRO DE INGREDIENTES */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '12px'
          }}>
            <span style={{ display: 'block', fontWeight: '700', fontSize: '0.9em', color: '#0f172a', marginBottom: '2px' }}>
              Ingredientes
            </span>
            <span style={{ display: 'block', fontSize: '0.8em', color: '#64748b', marginBottom: '10px' }}>
              Selecione os ingredientes padrao nos campos abaixo:
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {/* Pao */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Pao:
                </label>
                <select 
                  value={pao} 
                  onChange={(e) => setPao(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.pao.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Carne */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Carne:
                </label>
                <select 
                  value={carne} 
                  onChange={(e) => setCarne(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.carne.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Queijo */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Queijo:
                </label>
                <select 
                  value={queijo} 
                  onChange={(e) => setQueijo(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.queijo.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Frios */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Frios:
                </label>
                <select 
                  value={frios} 
                  onChange={(e) => setFrios(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.frios.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Salada */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Salada:
                </label>
                <select 
                  value={salada} 
                  onChange={(e) => setSalada(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.salada.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Molho */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                  Molho:
                </label>
                <select 
                  value={molho} 
                  onChange={(e) => setMolho(e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
                >
                  {preRegisteredIngredients.molho.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Acompanhamento */}
            <div style={{ marginTop: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '2px' }}>
                Acompanhamento (para combos ou porcoes):
              </label>
              <select 
                value={acompanhamento} 
                onChange={(e) => setAcompanhamento(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: '0.85em' }}
              >
                {preRegisteredIngredients.acompanhamento.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Opcoes de Retirada */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '2px', fontSize: '0.85em' }}>
              Opcoes para retirada no pedido:
            </label>
            <span style={{ fontSize: '0.8em', color: '#64748b', display: 'block', marginBottom: '4px' }}>
              Separadas por virgula (ex: Sem Tomate, Sem Bacon, Sem Maionese)
            </span>
            <input 
              type="text"
              placeholder="Ex: Sem Tomate, Sem Bacon, Sem Maionese"
              value={removableText}
              onChange={(e) => setRemovableText(e.target.value)}
              style={{ width: '100%', padding: '7px 9px', fontSize: '0.9em' }}
            />
          </div>

          {/* Estoque */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'block', fontWeight: '600', fontSize: '0.85em', color: '#0f172a' }}>
                  Limite de vendas (Estoque)
                </span>
                <span style={{ fontSize: '0.75em', color: '#64748b' }}>
                  Unidades disponiveis para a noite
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number"
                  min="0"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  style={{ width: '70px', padding: '5px', textAlign: 'center', fontWeight: '700' }}
                />
                <span style={{ fontSize: '0.8em', color: '#475569' }}>unidades</span>
              </div>
            </div>
          </div>

          {/* Botoes de Acao */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '9px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.9em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Save size={15} />
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
                    padding: '9px 12px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.9em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Layers size={15} />
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
                  padding: '7px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.8em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} />
                <span>Excluir Item do Cardapio</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
