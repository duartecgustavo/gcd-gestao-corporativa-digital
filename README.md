# 🏢 GCD - Gestão Corporativa Digital - Frontend

Este é o **frontend** do projeto **Gestão Corporativa Digital**, desenvolvido com **React**, **TypeScript** e **Vite**.  
O objetivo é fornecer uma interface amigável e intuitiva para gerenciar empresas, permitindo **criar, editar, visualizar e excluir** informações.

---

# 🚀 Tecnologias Utilizadas

- **React** – Biblioteca para construção de interfaces de usuário.
- **TypeScript** – Superset do JavaScript que adiciona tipagem estática.
- **Vite** – Ferramenta de build rápida para desenvolvimento frontend.
- **Ant Design** – Biblioteca de componentes UI moderna e responsiva.
- **ESLint** – Análise de código estático para manter a qualidade.
- **antd-mask-input** – Máscaras para campos de formulário (ex.: CNPJ).

---

# 📂 Estrutura do Projeto

```plaintext
gestao-corporativa-digital/
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Drawer/
│   │   │   │   ├── index.tsx                 # Componente principal do Drawer
│   │   │   │   ├── campoCnpj.tsx             # Campo de CNPJ com máscara
│   │   │   │   ├── camposDataModificacao.tsx # Campos para exibir datas de modificação
│   │   ├── Tabela/
│   │   │   ├── index.tsx                     # Componente de tabela de empresas
│   ├── pages/
│   │   ├── ListagemEmpresas.tsx              # Página principal de listagem de empresas
│   ├── utils/
│   │   ├── datas.util.ts                     # Funções utilitárias para datas
│   │   ├── documentos.util.ts                # Funções para manipulação de CNPJs
├── public/
├── tsconfig.json                             # Configuração do TypeScript
├── vite.config.ts                            # Configuração do Vite
├── package.json                              # Dependências do projeto


##  🛠️ Funcionalidades

✅ Listagem de Empresas – Visualize todas as empresas cadastradas.
✅ Criação de Empresas – Adicione novas empresas ao sistema.
✅ Edição de Empresas – Atualize informações de empresas existentes.
✅ Visualização Detalhada – Veja os dados de uma empresa em modo somente leitura.
✅ Exclusão de Empresas – Remova empresas do sistema.

##  📦 Instalação e Execução
Pré-requisitos

Node.js (versão recomendada: LTS)

npm ou yarn

# Passos

# Clone o repositório
git clone https://github.com/seu-usuario/gerenciador-empresas-front.git

# Acesse o diretório do projeto
cd gerenciador-empresas-front

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

# Acesse no navegador:
📍 http://localhost:5173
