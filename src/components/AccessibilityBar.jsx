import React from 'react';
import { Sliders, Sun } from 'lucide-react';

export default function AccessibilityBar({ 
  fontSize, 
  setFontSize, 
  highContrast, 
  setHighContrast
}) {
  return (
    <div 
      aria-label="Ajustes de visualizacao e acessibilidade"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 12px',
        background: '#ffffff',
        border: highContrast ? '2px solid #000000' : '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
        <Sliders size={14} />
        <span style={{ fontWeight: '600' }}>Tamanho do texto:</span>
      </div>

      {/* Botoes discretos de tamanho de fonte A- / A / A+ */}
      <div style={{ display: 'flex', gap: '2px', background: '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
        <button
          onClick={() => setFontSize('normal')}
          title="Tamanho padrao de fonte"
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: fontSize === 'normal' ? '700' : '500',
            background: fontSize === 'normal' ? '#0f172a' : 'transparent',
            color: fontSize === 'normal' ? '#ffffff' : '#475569',
            minHeight: 'auto'
          }}
        >
          A-
        </button>
        <button
          onClick={() => setFontSize('large')}
          title="Tamanho aumentado de fonte"
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: fontSize === 'large' ? '700' : '500',
            background: fontSize === 'large' ? '#0f172a' : 'transparent',
            color: fontSize === 'large' ? '#ffffff' : '#475569',
            minHeight: 'auto'
          }}
        >
          A
        </button>
        <button
          onClick={() => setFontSize('xlarge')}
          title="Tamanho extra grande de fonte"
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: fontSize === 'xlarge' ? '700' : '500',
            background: fontSize === 'xlarge' ? '#0f172a' : 'transparent',
            color: fontSize === 'xlarge' ? '#ffffff' : '#475569',
            minHeight: 'auto'
          }}
        >
          A+
        </button>
      </div>

      <div style={{ height: '14px', width: '1px', background: '#cbd5e1' }} />

      {/* Botao Alto Contraste discreto */}
      <button
        onClick={() => setHighContrast(!highContrast)}
        title="Alternar modo de alto contraste para leitura nitida"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '12px',
          background: highContrast ? '#000000' : '#f8fafc',
          color: highContrast ? '#facc15' : '#334155',
          border: highContrast ? '2px solid #facc15' : '1px solid #cbd5e1',
          minHeight: 'auto'
        }}
      >
        <Sun size={13} />
        <span>{highContrast ? 'Alto Contraste Ativo' : 'Alto Contraste'}</span>
      </button>
    </div>
  );
}
