import React from 'react';
import { Type, Eye, Sparkles, HelpCircle } from 'lucide-react';

export default function AccessibilityBar({ 
  fontSize, 
  setFontSize, 
  highContrast, 
  setHighContrast,
  seniorGuide,
  setSeniorGuide
}) {
  return (
    <aside 
      aria-label="Barra de Acessibilidade e Ajustes Visuais"
      style={{
        background: highContrast ? '#000000' : '#1e293b',
        color: '#ffffff',
        padding: '10px 18px',
        borderRadius: '10px',
        marginBottom: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        border: highContrast ? '2px solid #facc15' : '1px solid #334155',
        boxShadow: highContrast ? '0 0 0 2px #facc15' : '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Título e Identificação de Acessibilidade */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Eye size={20} color={highContrast ? '#facc15' : '#38bdf8'} />
        <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
          Facilidade Visual & Acessibilidade
        </span>
        <span style={{
          fontSize: '11px',
          background: highContrast ? '#facc15' : '#334155',
          color: highContrast ? '#000' : '#e2e8f0',
          padding: '2px 8px',
          borderRadius: '12px',
          fontWeight: '600'
        }}>
          Modo Sênior
        </span>
      </div>

      {/* Controles de Tamanho de Fonte e Contraste */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Tamanho da Fonte */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Type size={16} color="#94a3b8" />
          <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>Tamanho da Letra:</span>
          
          <div style={{ display: 'flex', background: '#0f172a', padding: '2px', borderRadius: '6px', border: '1px solid #475569' }}>
            <button
              onClick={() => setFontSize('normal')}
              title="Tamanho Normal de Letra"
              style={{
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: fontSize === 'normal' ? '700' : '400',
                background: fontSize === 'normal' ? '#38bdf8' : 'transparent',
                color: fontSize === 'normal' ? '#0f172a' : '#cbd5e1'
              }}
            >
              Padrão
            </button>
            <button
              onClick={() => setFontSize('large')}
              title="Tamanho Médio Aumentado"
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: fontSize === 'large' ? '700' : '400',
                background: fontSize === 'large' ? '#38bdf8' : 'transparent',
                color: fontSize === 'large' ? '#0f172a' : '#cbd5e1'
              }}
            >
              Grande (A+)
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              title="Tamanho Extra Grande para Leitura Fácil"
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: fontSize === 'xlarge' ? '800' : '500',
                background: fontSize === 'xlarge' ? '#facc15' : 'transparent',
                color: fontSize === 'xlarge' ? '#000000' : '#cbd5e1'
              }}
            >
              Extra Grande (A++)
            </button>
          </div>
        </div>

        {/* Toggle Alto Contraste */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '13px',
            background: highContrast ? '#facc15' : '#334155',
            color: highContrast ? '#000000' : '#ffffff',
            border: highContrast ? '2px solid #ffffff' : '1px solid #475569'
          }}
        >
          <Sparkles size={15} />
          {highContrast ? 'Alto Contraste: ATIVADO' : 'Ativar Alto Contraste'}
        </button>

        {/* Toggle Guia Explicativo */}
        <button
          onClick={() => setSeniorGuide(!seniorGuide)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '13px',
            background: seniorGuide ? '#22c55e' : '#334155',
            color: seniorGuide ? '#ffffff' : '#e2e8f0',
            border: '1px solid #475569'
          }}
        >
          <HelpCircle size={15} />
          {seniorGuide ? 'Dicas na Tela: VISÍVEIS' : 'Ver Dicas & Ajuda'}
        </button>
      </div>
    </aside>
  );
}
