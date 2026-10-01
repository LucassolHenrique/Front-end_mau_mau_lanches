import React, { useState } from 'react';
import { Plus, Power, Trash2, Phone, Bike, DollarSign } from 'lucide-react';

export default function MotoboyManager({ 
  motoboys, 
  onAddMotoboy, 
  onToggleMotoboy, 
  onDeleteMotoboy,
  highContrast,
  fontSizeClass 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [baseFee, setBaseFee] = useState('40.00');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Informe o nome do motoboy.');
    onAddMotoboy({
      name: name.trim(),
      phone: phone.trim(),
      baseFee: parseFloat(baseFee) || 40.00
    });
    setName('');
    setPhone('');
    setBaseFee('40.00');
    setShowAddForm(false);
  };

  return (
    <div className={fontSizeClass} style={{ background: '#ffffff', border: highContrast ? '2px solid #000' : '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
      
      {/* Cabecalho da Secao */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '14px',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '18px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25em', fontWeight: '700', color: '#0f172a' }}>
            Gestao e Acerto de Motoboys
          </h2>
          <p style={{ fontSize: '0.85em', color: '#64748b', marginTop: '2px' }}>
            Cadastre entregadores, ative ou desative conforme a escala da noite e consulte os valores a acertar.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: '#0f172a',
            color: '#ffffff',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.85em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <Plus size={15} />
          <span>{showAddForm ? 'Fechar Formulario' : 'Novo Motoboy'}</span>
        </button>
      </div>

      {/* Formulario de Cadastro de Novo Motoboy */}
      {showAddForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <span style={{ display: 'block', fontWeight: '700', fontSize: '0.95em', color: '#0f172a', marginBottom: '10px' }}>
            Cadastrar Entregador
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '3px' }}>
                Nome Completo:
              </label>
              <input 
                type="text"
                required
                placeholder="Ex: Carlos Eduardo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '7px 9px', fontSize: '0.9em' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '3px' }}>
                Telefone / WhatsApp (opcional):
              </label>
              <input 
                type="text"
                placeholder="(51) 98765-4321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '7px 9px', fontSize: '0.9em' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8em', fontWeight: '600', color: '#475569', marginBottom: '3px' }}>
                Diaria Fixa (R$):
              </label>
              <input 
                type="number"
                step="5.00"
                min="0"
                required
                value={baseFee}
                onChange={(e) => setBaseFee(e.target.value)}
                style={{ width: '100%', padding: '7px 9px', fontSize: '0.9em', fontWeight: '700' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              style={{
                background: '#15803d',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85em',
                cursor: 'pointer'
              }}
            >
              Salvar Motoboy
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#475569',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '0.85em',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Grid de Motoboys e Acerto Financeiro */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {motoboys.map(m => {
          const totalToPay = (m.baseFee || 40) + (m.deliveryFeesTotal || 0);
          const isActive = m.active;

          return (
            <div 
              key={m.id}
              style={{
                border: isActive ? '1px solid #e2e8f0' : '1px dashed #cbd5e1',
                borderRadius: '8px',
                padding: '16px',
                background: isActive ? '#ffffff' : '#f8fafc',
                opacity: isActive ? 1 : 0.75,
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05em', fontWeight: '700', color: '#0f172a' }}>
                      {m.name}
                    </h3>
                    {m.phone && (
                      <span style={{ fontSize: '0.8em', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Phone size={12} /> {m.phone}
                      </span>
                    )}
                  </div>

                  <span style={{
                    fontSize: '0.75em',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: isActive ? '#f0fdf4' : '#fef2f2',
                    color: isActive ? '#15803d' : '#b91c1c'
                  }}>
                    {isActive ? 'Ativo na Noite' : 'Desativado / Folga'}
                  </span>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #edf2f7',
                  borderRadius: '6px',
                  padding: '10px',
                  fontSize: '0.85em',
                  color: '#475569',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Diaria fixa:</span>
                    <strong>R$ {m.baseFee.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Entregas realizadas:</span>
                    <strong>{m.deliveries || 0} viagens</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total em taxas acumuladas:</span>
                    <strong>R$ {(m.deliveryFeesTotal || 0).toFixed(2)}</strong>
                  </div>
                  <div style={{
                    marginTop: '6px',
                    paddingTop: '6px',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1em',
                    fontWeight: '700',
                    color: '#059669'
                  }}>
                    <span>Total a acertar:</span>
                    <span>R$ {totalToPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Botoes de Acao do Motoboy: Desativar/Ativar e Excluir */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => onToggleMotoboy(m.id)}
                  title={isActive ? 'Desativar motoboy para esta noite' : 'Ativar motoboy para entregas'}
                  style={{
                    flex: 1,
                    background: isActive ? '#f8fafc' : '#15803d',
                    color: isActive ? '#475569' : '#ffffff',
                    border: isActive ? '1px solid #cbd5e1' : 'none',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8em',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Power size={13} />
                  <span>{isActive ? 'Desativar' : 'Ativar'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Confirma remover o cadastro de "${m.name}"?`)) {
                      onDeleteMotoboy(m.id);
                    }
                  }}
                  title="Excluir motoboy"
                  style={{
                    background: '#ffffff',
                    color: '#b91c1c',
                    border: '1px solid #fca5a5',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
