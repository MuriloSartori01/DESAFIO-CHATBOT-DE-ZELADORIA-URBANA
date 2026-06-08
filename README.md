# Plataforma de Zeladoria Urbana

Projeto desenvolvido para solucionar o desafio de criar uma plataforma web onde os cidadãos podem registrar problemas da cidade, como buracos na rua, postes apagados e lixo acumulado, através de um chatbot inteligente.

## Tecnologias Utilizadas

- Frontend: Next.js, React e TailwindCSS
- Backend: Node.js e Express
- Banco de Dados: Supabase
- Inteligência Artificial: Groq / OpenRouter
- Deploy: Vercel e Render

## Estrutura do Projeto

O sistema possui as seguintes funcionalidades:
- Landing page de apresentação.
- Chatbot para coleta de dados do cidadão (nome, telefone, descrição, foto) e geração de protocolo.
- Painel Administrativo para visualização dos chamados e alteração de status (Aberto, Em andamento, Resolvido).
- Notificação automática do cidadão via WhatsApp/Email após atualização do chamado.

## Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone [https://github.com/MuriloSartori01/DESAFIO-CHATBOT-DE-ZELADORIA-URBANA.git](https://github.com/MuriloSartori01/DESAFIO-CHATBOT-DE-ZELADORIA-URBANA.git)
cd zeladoria-urbana