# 🛡️ CyberDefense - Jogo Educativo de CyberSecurity

> 🎮 Um jogo educativo interativo para aprender conceitos fundamentais de **CyberSecurity** enquanto se diverte!

Um jogo desenvolvido com **React + Vite** que transforma o aprendizado de segurança cibernética em uma experiência gamificada e envolvente.

O objetivo do projeto é ensinar conceitos essenciais de CyberSecurity através de **mecânicas de jogo intuitivas**, mantendo o engajamento do jogador enquanto aprende sobre ameaças e defesas.

---

## 🕹️ Sobre o Jogo

Você é um **Especialista em Segurança Cibernética** defendendo sua rede contra **ataques e ameaças digitais**. O objetivo é **identificar e neutralizar ameaças**, acumulando **conhecimento (pontos)** e **mantendo a integridade do sistema (vida)** pelo máximo de tempo possível.

### ✨ Temática e Mecânicas:

- **👤 Você (Player)**: Um especialista em segurança no centro da rede
- **🔪 Escudo (Knife)**: Sua principal defesa - representa firewalls e proteções ativas
- **🔴 Ameaças (Enemies)**:
  - **Malware** - Programas maliciosos que atacam o sistema
  - **Ransomware** - Bloqueia dados e reduz a vida do sistema
  - **Phishing** - Tenta comprometer credenciais
  - **DDoS** - Sobrecarrega e enfraquece a rede
- **❤️ Integridade do Sistema (Health)**: Quanto mais ataques sofrer, menor fica
- **⭐ Conhecimento Adquirido (Score)**: Pontos ganhos ao neutralizar ameaças

### 🎯 Objetivos Educacionais:

- Reconhecer diferentes tipos de ataques cibernéticos
- Entender como defesas funcionam contra ameaças
- Aprender que segurança é um processo contínuo
- Compreender a importância de estar sempre alerta
- Praticar resposta rápida a incidentes de segurança

### 🎮 Controles:

- **W, A, S, D ou Setas**: Mover-se pela rede
- **P ou Botão**: Pausar o jogo
- **🔪 Escudo (automático)**: Neutraliza ameaças ao seu redor
- **Objetivo**: Sobreviver o máximo possível contra as ameaças

---

## ☁️ Tecnologia

Este projeto foi desenvolvido com foco em:

- ⚛️ **React 19** - Framework UI moderno
- ⚡ **Vite** - Build tool rápido e eficiente
- 🎨 **CSS3** - Estilização moderna com gradientes e animações
- 📊 **Game Loop** - Atualização em tempo real (60 FPS)
- 🎯 **Física de Colisão** - Detecção de intersecção entre elementos

### 🛠️ Ferramentas de Qualidade:

- 🔍 **ESLint** - Linting e análise de código
- 💅 **Prettier** - Formatação automática de código
- 📝 **Commitizen** - Commits padronizados com Conventional Commits

---

## 🚀 Como Jogar

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/MViniciusCoffe/jogo-serverless.git
cd jogo-serverless

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O jogo estará disponível em `http://localhost:5173`

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build

# Qualidade
npm run lint       # Verifica erros de código
npm run format     # Formata o código automaticamente

# Git
npm run commit     # Criar commit com Commitizen
```

---

## 📚 Conceitos de CyberSecurity Abordados

Este jogo apresenta e reforça os seguintes conceitos:

| Conceito                        | Como Aparece no Jogo                                        |
| ------------------------------- | ----------------------------------------------------------- |
| **Defesa Proativa**             | Seu escudo neutraliza ameaças antes delas te atingirem      |
| **Monitoramento Contínuo**      | Você precisa estar sempre alerta para novas ameaças         |
| **Resposta a Incidentes**       | Reagir rapidamente aos ataques reduz danos                  |
| **Múltiplas Camadas de Defesa** | Quanto mais tempo sobreviver, mais ameaças surgem           |
| **Conhecimento é Proteção**     | Cada ameaça neutralizada adiciona ao seu conhecimento       |
| **Falhas Críticas**             | Deixar ameaças passarem compromete a integridade do sistema |

---

## 🎓 Próximas Ideias para Expansão

- [ ] Diferentes tipos de ataques com nomes reais (SQL Injection, XSS, etc)
- [ ] Sistema de upgrades de defesa (aprimorar firewalls)
- [ ] Minigames educativos sobre boas práticas
- [ ] Leaderboard online
- [ ] Tutoriais interativos
- [ ] Badges e achievements

---

## 👨‍💻 Desenvolvimento

Este projeto foi criado como uma forma inovadora de **tornar o aprendizado de CyberSecurity acessível, divertido e interativo**.

Seja bem-vindo à **CyberDefense** - onde a segurança digital encontra a diversão!

---

**Desenvolvido com ❤️ para educação em CyberSecurity**

| Serviço         | Função                                                            |
| --------------- | ----------------------------------------------------------------- |
| **AWS Amplify** | Hospedagem, autenticação e integração com backend                 |
| **API Gateway** | Endpoint REST para comunicação segura entre cliente e Lambda      |
| **AWS Lambda**  | Lógica backend (salvar progresso, ranking, dados do jogador)      |
| **DynamoDB**    | Armazenamento dos dados do jogo (usuários, pontuações, progresso) |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                  | Uso                                                     |
| --------------------------- | ------------------------------------------------------- |
| ⚛️ **React**                | Interface e lógica de jogo                              |
| ⚡ **Vite**                 | Build rápido e ambiente de desenvolvimento              |
| ☁️ **AWS Amplify**          | Deploy, autenticação e integração com AWS               |
| 🧮 **DynamoDB**             | Banco de dados NoSQL para salvar progresso e pontuações |
| 🌉 **API Gateway + Lambda** | Backend sem servidor                                    |
| 🧹 **ESLint + Prettier**    | Padronização e limpeza de código                        |

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
