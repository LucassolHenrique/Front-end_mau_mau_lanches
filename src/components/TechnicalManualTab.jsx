import React from 'react';
import { Sliders, Sun, BookOpen, Layers, CheckCircle2, Shield, Database } from 'lucide-react';

export default function TechnicalManualTab({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  fontSizeClass
}) {
  return (
    <div className={fontSizeClass} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. SECAO DE CONFIGURACOES DE ACESSIBILIDADE E VISUALIZACAO */}
      <section style={{
        background: '#ffffff',
        border: highContrast ? '2px solid #000' : '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sliders size={18} color="#0f172a" />
          <h2 style={{ fontSize: '1.2em', fontWeight: '700', color: '#0f172a' }}>
            Configuracoes de Visualizacao e Acessibilidade
          </h2>
        </div>
        <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '16px' }}>
          Ajustes ergonomicos para facilitar a leitura por operadores de qualquer faixa etaria ou em condicoes de baixa visibilidade.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Tamanho da Fonte */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <span style={{ display: 'block', fontSize: '0.9em', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              Tamanho do Texto no Sistema:
            </span>
            <p style={{ fontSize: '0.8em', color: '#64748b', marginBottom: '12px' }}>
              Redimensiona todos os textos, precos e botoes do aplicativo.
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setFontSize('normal')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.85em',
                  fontWeight: fontSize === 'normal' ? '700' : '500',
                  background: fontSize === 'normal' ? '#0f172a' : '#ffffff',
                  color: fontSize === 'normal' ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Padrao (14px)
              </button>
              <button
                onClick={() => setFontSize('large')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.95em',
                  fontWeight: fontSize === 'large' ? '700' : '500',
                  background: fontSize === 'large' ? '#0f172a' : '#ffffff',
                  color: fontSize === 'large' ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Medio (17px)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '1.05em',
                  fontWeight: fontSize === 'xlarge' ? '700' : '500',
                  background: fontSize === 'xlarge' ? '#0f172a' : '#ffffff',
                  color: fontSize === 'xlarge' ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Grande (20px)
              </button>
            </div>
          </div>

          {/* Alto Contraste */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <span style={{ display: 'block', fontSize: '0.9em', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              Modo de Alto Contraste (Leitura Nitida):
            </span>
            <p style={{ fontSize: '0.8em', color: '#64748b', marginBottom: '12px' }}>
              Aplica cores puras e bordas solidas para melhor definicao visual.
            </p>

            <button
              onClick={() => setHighContrast(!highContrast)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85em',
                background: highContrast ? '#000000' : '#ffffff',
                color: highContrast ? '#facc15' : '#0f172a',
                border: highContrast ? '2px solid #facc15' : '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              <Sun size={15} />
              <span>{highContrast ? 'Alto Contraste: ATIVADO' : 'Ativar Alto Contraste'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MANUAL TECNICO E OPERACIONAL DO KOMANDA */}
      <section style={{
        background: '#ffffff',
        border: highContrast ? '2px solid #000' : '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <BookOpen size={18} color="#0f172a" />
          <h2 style={{ fontSize: '1.2em', fontWeight: '700', color: '#0f172a' }}>
            Manual Tecnico e Operacional do Sistema
          </h2>
        </div>
        <p style={{ fontSize: '0.85em', color: '#64748b', marginBottom: '20px' }}>
          Documentacao dos fluxos de operacao, regras de negocio e arquitetura de dados do Komanda (Mau Mau Lanches).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Modulo 1: Gestao de Cardapio */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
            <h3 style={{ fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              1. Gestao de Cardapio e Ficha de Ingredientes
            </h3>
            <p style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
              Cada item do cardapio possui uma estrutura padronizada de ingredientes baseada na ficha tecnica: 
              <strong> Pao</strong>, <strong>Carne</strong>, <strong>Queijo</strong>, <strong>Frios</strong>, <strong>Salada</strong>, <strong>Molho</strong> e <strong>Acompanhamento</strong>.
            </p>
            <ul style={{ fontSize: '0.85em', color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Pre-cadastro rapido:</strong> Ao criar ou editar um item, os ingredientes sao selecionados em listas suspensas pre-configuradas, eliminando digitacao repetitiva.</li>
              <li><strong>Salvar como Novo Prato:</strong> Permite utilizar a base de um lanche existente (ex: Xis Coracao com Bacon), alterar ingredientes (remover o bacon) e gerar um novo registro no cardapio sem sobrescrever o original.</li>
              <li><strong>Pausar / Ativar:</strong> Itens ou categorias inteiras podem ser suspensos temporariamente caso falte insumo ou durante manutencao da chapa.</li>
            </ul>
          </div>

          {/* Modulo 2: Pedidos e Personalizacao estilo iFood */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
            <h3 style={{ fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              2. Modulo de Pedidos e Personalizacao
            </h3>
            <p style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
              Na aba de pedidos, a tela opera com a comanda aberta na coluna direita e selecao rapida a esquerda:
            </p>
            <ul style={{ fontSize: '0.85em', color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Retirada de Ingredientes:</strong> Opcoes gratuitas de remocao de insumos (sem tomate, sem maionese, sem alface).</li>
              <li><strong>Adicionais Pagos:</strong> Inclusao de complementos com incremento automatico de valor (bacon extra, queijo duplo, ovo).</li>
              <li><strong>Taxa Automatica de Bairros:</strong> Calculo automatico da taxa de entrega baseado no bairro selecionado em Guaiba (Parque 35, Centro, Colina, Cohab, etc.).</li>
              <li><strong>Calculo de Troco:</strong> Para recebimentos em dinheiro, o valor a devolver e calculado e exibido em destaque.</li>
            </ul>
          </div>

          {/* Modulo 3: Controle de Vendas e Estoque */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
            <h3 style={{ fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              3. Controle de Venda Limitada por Estoque de Carne / Insumos
            </h3>
            <p style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
              Evita a venda de produtos sem insumos disponiveis na noite:
            </p>
            <ul style={{ fontSize: '0.85em', color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Ao finalizar cada comanda, o saldo de porcoes disponiveis e deduzido automaticamente.</li>
              <li>Se o saldo atingir zero, o produto recebe a marcacao de <strong>Esgotado</strong> e o botao de pedido e bloqueado.</li>
              <li>O atendente pode ajustar o saldo disponivel diretamente na aba de estoque ou no formulario de edicao.</li>
            </ul>
          </div>

          {/* Modulo 4: Gestao de Motoboys */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
            <h3 style={{ fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              4. Gestao e Acerto de Motoboys
            </h3>
            <p style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
              Conforme definido no Levantamento de Requisitos (Requisitos 26 e 27 e Regra de Negocio 4):
            </p>
            <ul style={{ fontSize: '0.85em', color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Calculo do Acerto:</strong> Valor fixo da diaria da noite (padrao R$ 40,00) somado a taxa integral dos bairros das entregas realizadas pelo entregador.</li>
              <li><strong>Controle de Escala:</strong> Botoes de Ativar / Desativar permitem manter o cadastro do motoboy sem inclui-lo na operacao de noites em que estiver de folga.</li>
            </ul>
          </div>

          {/* Modulo 5: Arquitetura e Preparacao para Banco de Dados */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fafafa' }}>
            <h3 style={{ fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              5. Arquitetura de Software e Integracao de Dados
            </h3>
            <p style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
              A aplicacao adota separacao de responsabilidades entre interface e persistencia:
            </p>
            <ul style={{ fontSize: '0.85em', color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Camada de Servico Desacoplada:</strong> O modulo <code>src/services/api.js</code> centraliza todas as chamadas assincronas de dados.</li>
              <li><strong>Persistencia Local (Client-side):</strong> Os dados sao persistidos no <code>localStorage</code>, mantendo alteracoes entre recargas de tela.</li>
              <li><strong>Pronto para Backend Node.js / PostgreSQL (Sprint 2):</strong> A assinatura dos metodos (<code>getCategories</code>, <code>getProducts</code>, <code>createProduct</code>, etc.) segue a modelagem das entidades da Sprint 1, necessitando apenas substituir as chamadas locais por requisicoes HTTP (Fetch/Axios) quando a API entrar em operacao.</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
