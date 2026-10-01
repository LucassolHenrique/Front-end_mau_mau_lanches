import React from 'react';
import { HelpCircle, Check, Info } from 'lucide-react';

export default function SeniorGuideBanner({ highContrast, onClose }) {
  return (
    <div 
      style={{
        background: highContrast ? '#ffffff' : '#eff6ff',
        border: highContrast ? '2px solid #000000' : '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        color: '#1e3a8a',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={20} color="#2563eb" />
          <h3 style={{ fontSize: '1.1em', fontWeight: '800', color: '#1e40af' }}>
            Como usar este sistema (Guia Passo a Passo Simplificado)
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            color: '#64748b',
            fontSize: '0.85em',
            fontWeight: '600',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Esconder dicas
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '10px' }}>
        <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #dbeafe' }}>
          <span style={{ fontWeight: '800', color: '#2563eb', display: 'block', marginBottom: '2px' }}>
            1️⃣ Escolher e Montar:
          </span>
          <span style={{ fontSize: '0.9em', color: '#334155' }}>
            Clique no botão <strong>"Montar / Pedir"</strong> do lanche para abrir os adicionais e retirar o que não quiser.
          </span>
        </div>

        <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #dbeafe' }}>
          <span style={{ fontWeight: '800', color: '#2563eb', display: 'block', marginBottom: '2px' }}>
            2️⃣ Copiar Lanche (Clonar):
          </span>
          <span style={{ fontSize: '0.9em', color: '#334155' }}>
            Clique no botão <strong>"Copiar"</strong> no canto da foto para criar rapidamente uma nova versão do alimento.
          </span>
        </div>

        <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #dbeafe' }}>
          <span style={{ fontWeight: '800', color: '#2563eb', display: 'block', marginBottom: '2px' }}>
            3️⃣ Ativar / Pausar Itens:
          </span>
          <span style={{ fontSize: '0.9em', color: '#334155' }}>
            Use o botão <strong>"Pausar"</strong> para bloquear produtos ou categorias quando faltar estoque na cozinha.
          </span>
        </div>

        <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #dbeafe' }}>
          <span style={{ fontWeight: '800', color: '#2563eb', display: 'block', marginBottom: '2px' }}>
            4️⃣ Troco Automático:
          </span>
          <span style={{ fontSize: '0.9em', color: '#334155' }}>
            Se for em dinheiro, digite o valor recebido e o sistema calcula o troco em números grandes na tela.
          </span>
        </div>
      </div>
    </div>
  );
}
