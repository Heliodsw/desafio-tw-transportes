# Desafio Técnico - TW Transportes (Gestão Logística)

Este projeto é uma aplicação mobile desenvolvida em **React Native com Expo** para o gerenciamento de clientes e serviços logísticos.

## 🚀 Implementações Realizadas
Além da estrutura base de clientes, foram implementadas as seguintes funcionalidades:
- **Módulo de Produtos:** Criação de uma nova entidade para gerenciar serviços/cargas.
- **Vínculo de Dados:** Implementação de relacionamento (Foreign Key) entre Produtos e Clientes usando **Drizzle ORM**.
- **Dashboard Home:** Tela inicial dinâmica que exibe o resumo estatístico da operação em tempo real.
- **Persistência Local:** Configuração completa do **SQLite** para funcionamento offline.

## 🛠️ Tecnologias Utilizadas
- **Framework:** Expo (SDK 54)
- **Linguagem:** TypeScript
- **Banco de Dados:** SQLite + Drizzle ORM
- **Estado Global:** Redux Toolkit
- **Formulários:** React Hook Form + Yup
- **Navegação:** Expo Router (File-based)

## 📦 Como Rodar o Projeto
1. Instale as dependências:
   ```bash
   npm install
2.Inicie o prebuild nativo:
    npx expo prebuild
 
 3.Execute no emulador Android:
    npx expo run:android

