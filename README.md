# Jogo Serverless  

> 🎮 Projeto desenvolvido durante o **SEPE (Semana de Ensino, Pesquisa e Extensão)** — dias **22/10 a 23/10**.  

Um jogo **serverless**, criado com **React + Vite** e alimentado por uma **arquitetura AWS totalmente sem servidor**.  

O objetivo do projeto é mostrar como é possível desenvolver um **jogo completo e conectado**, com **persistência em nuvem**, **API escalável** e **infraestrutura simplificada**, sem precisar manter nenhum servidor manualmente.  

---

## 🕹️ Sobre o Jogo  

O jogador enfrenta ondas crescentes de inimigos, coleta pontos de experiência e desbloqueia novas habilidades.  
O desafio é **sobreviver o máximo de tempo possível**, evoluindo o personagem a cada rodada.  

### ✨ Funcionalidades principais:
- 🧙 Sistema de XP e níveis  
- 💥 Habilidades automáticas e progressivas  
- 👾 Enxames de inimigos com dificuldade crescente  
- 💾 Salvamento de progresso na nuvem (*via DynamoDB*)  
- 🌐 Comunicação serverless com AWS Amplify e API Gateway  
- 🖥️ Interface leve, responsiva e moderna feita com React + Vite  

---

## ☁️ Arquitetura Serverless  

O backend do projeto utiliza serviços gerenciados da **AWS**, garantindo escalabilidade, baixo custo e simplicidade de manutenção.  

### 🧩 Diagrama Simplificado:

```
[ React + Vite (Frontend) ]
           │
           ▼
 [ AWS Amplify (Hosting + Auth) ]
           │
           ▼
 [ Amazon API Gateway ]
           │
           ▼
 [ AWS Lambda Functions ]
           │
           ▼
 [ Amazon DynamoDB (Banco NoSQL) ]
```

### 🔧 Funções do backend:
| Serviço | Função |
|----------|--------|
| **AWS Amplify** | Hospedagem, autenticação e integração com backend |
| **API Gateway** | Endpoint REST para comunicação segura entre cliente e Lambda |
| **AWS Lambda** | Lógica backend (salvar progresso, ranking, dados do jogador) |
| **DynamoDB** | Armazenamento dos dados do jogo (usuários, pontuações, progresso) |

---

## 🛠️ Tecnologias Utilizadas  

| Tecnologia | Uso |
|-------------|-----|
| ⚛️ **React** | Interface e lógica de jogo |
| ⚡ **Vite** | Build rápido e ambiente de desenvolvimento |
| ☁️ **AWS Amplify** | Deploy, autenticação e integração com AWS |
| 🧮 **DynamoDB** | Banco de dados NoSQL para salvar progresso e pontuações |
| 🌉 **API Gateway + Lambda** | Backend sem servidor |
| 🧹 **ESLint + Prettier** | Padronização e limpeza de código |

---

## 🚀 Como Rodar o Projeto Localmente  

### 🔧 Pré-requisitos  

- [Node.js](https://nodejs.org) (v18+)
- [AWS CLI](https://aws.amazon.com/cli/) configurado
- [Amplify CLI](https://docs.amplify.aws/cli/) configurado

---

### ▶️ Passos  

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jogo-serverless.git

# Entre no diretório do projeto
cd jogo-serverless

# Instale as dependências
npm install

# Rode o projeto localmente
npm run dev
```

Acesse o jogo em:  
👉 **http://localhost:5173/**

---

## 🧱 Estrutura do Projeto  

```
jogo-serverless/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Sprites, sons, imagens
│   ├── components/      # Componentes de interface
│   ├── game/            # Mecânicas e lógica de jogo
│   ├── services/        # Comunicação com API Gateway
│   ├── hooks/           # Hooks React personalizados
│   ├── styles/          # Estilos globais
│   └── App.jsx          # Raiz da aplicação
└── vite.config.js       # Configuração Vite
```

---

## 💡 Visão do Projeto  

O **Jogo Serverless** é uma prova de conceito de como jogos modernos podem:
- Operar **inteiramente em nuvem**, com backend escalável e automático  
- Salvar progresso e ranking global sem precisar de servidor dedicado  
- Ser desenvolvidos rapidamente com ferramentas acessíveis e de baixo custo  

---

## 🔮 Futuras Implementações  

- 🧠 Sistema de ranking global (DynamoDB + API Gateway)  
- 🎵 Trilha sonora procedural  
- 🎮 Suporte a controle / gamepad  
- 🌍 Modo cooperativo online (WebRTC + Amplify)  
- 📊 Dashboard de estatísticas dos jogadores  

---
