# Komanda - Frontend

Interface web do Komanda, sistema de gestão para lancheria com delivery (Mau Mau Lanches): cardápio, comanda e pedidos com cálculo automático, controle de insumos, fechamento de motoboys e dashboard do gestor.

Projeto de Desenvolvimento 1 · UniSenac · 2026-2  
Equipe: Anna Hermes, Diego Silva, Gabriel Lessa e Lucas Sol

## Stack

- React 19
- Vite
- Lucide React
- CSS nativo modularizado

## Pré-requisitos

| Ferramenta | Versão | Como conferir |
|---|---|---|
| Node.js | 18 LTS ou mais recente | 
ode -v |
| npm | 9 ou mais recente | 
pm -v |
| Git | qualquer recente | git --version |

Editor recomendado: VS Code.

## Como rodar

**1. Clonar o repositório**

`ash
git clone https://github.com/LucassolHenrique/komanda-frontend.git
cd komanda-frontend
`

**2. Instalar as dependências**

`ash
npm install
`

**3. Executar o servidor de desenvolvimento**

`ash
npm run dev
`

O terminal indicará a porta local:

`
  VITE v8.3.0  ready in 200 ms

  ➜  Local:   http://localhost:5173/
`

**4. Acessar a aplicação**

Abra http://localhost:5173 no navegador.

## Scripts

| Comando | O que faz |
|---|---|
| 
pm run dev | Inicia o servidor Vite em modo de desenvolvimento (com HMR) |
| 
pm run build | Compila a aplicação otimizada para produção na pasta dist/ |
| 
pm run preview | Executa localmente o build de produção para testes |

## Estrutura

`
src/
  App.jsx           componente principal com as abas e lógica de comanda
  index.css         estilos globais e tipografia do sistema
  main.jsx          ponto de entrada da aplicação React
public/             arquivos estáticos e ícones
dist/               build final de produção (gerado pelo npm run build)
`

## Módulos do Sistema

1. **Cardápio:** listagem e visualização dos produtos e categorias da lanchonete.
2. **Nova Comanda / Pedido:** seleção de itens, alternância entre entrega e balcão, seleção de bairros de Guaíba com taxa calculada e cálculo de troco.
3. **Estoque de Insumos:** acompanhamento do saldo de insumos com alerta de reposição.
4. **Acerto de Motoboys:** cálculo da diária fixa mais repasse integral das taxas de entrega por bairro.
5. **Dashboard & Vendas:** faturamento do dia, quantidade de pedidos e extrato com baixa de insumos (pães, carnes bovinas, etc.).

## Integração com o Backend

Na Sprint 2, a aplicação consumirá a API do repositório komanda-backend (rodando por padrão em http://localhost:3000), substituindo o estado local por requisições HTTP para os endpoints de produtos, pedidos e estoque.

## Validação do README

- [ ] Validado por: ____________ (integrante de fora da dupla de frontend) em __/__/2026
