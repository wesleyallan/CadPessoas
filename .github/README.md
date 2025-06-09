<h1 align="center">
  <img src="./hi.gif" alt="Mão acenando" width="30px">
  Sistema de Cadastro de Pessoas
</h1>

<p align="center">
  🌐🚀 Uma aplicação moderna e eficiente para gerenciar sua carteira de contatos, incluindo clientes, fornecedores, transportadoras e colaboradores
</p>

<p align="center">
  <a href="#-sobre">📋 Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-execução">⚙ Execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-ferramentas">🔧 Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">👤 Autor</a>
</p>

<br />

<p align="center">
  <a href="https://twitter.com/Wesley_AllanS" target="_blank">
    <img alt="Twitter: Wesley_AllanS" src="https://img.shields.io/twitter/follow/Wesley_AllanS.svg?style=social" />
  </a>
</p>

## 📋 Sobre

Este projeto é uma aplicação web moderna desenvolvida para facilitar o gerenciamento de contatos. Com uma interface intuitiva e recursos avançados, permite o cadastro e gerenciamento eficiente de:

- Clientes
- Fornecedores
- Transportadoras
- Colaboradores

## ⚙ Execução

Para executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```bash
git clone https://github.com/wesleyallan/CadPessoas.git
```

2. Entre no diretório do projeto:
```bash
cd CadPessoas
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o projeto (Script já levando o banco local):
```bash
npm run dev
```

5. Criar tabelas do banco de dados:
```bash
npx dotenv -e .env.development -- prisma migration deploy
```

6. Popular com dados de teste:
```bash
npx dotenv -e .env.development -- prisma db seed
```

O projeto estará disponível em `http://localhost:3000`

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Next.js](https://nextjs.org/) - Framework React para desenvolvimento web
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Docker](https://www.docker.com/) - Plataforma para desenvolvimento, envio e execução de aplicações
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gerenciamento de banco de dados relacional
- [Editor Config](https://editorconfig.org/) - Padronização de configurações do editor
- [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript
- [JSX](https://reactjs.org/docs/introducing-jsx.html) - Sintaxe para React

## 🔧 Ferramentas

Ferramentas utilizadas no desenvolvimento:

- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código
- [Git](https://git-scm.com/) - Sistema de controle de versão

## 👤 Autor

**Wesley Silva**

- Website: [wesleyallan.dev](https://wesleyallan.dev)
- Twitter: [@Wesley_AllanS](https://twitter.com/Wesley_AllanS)
- Github: [@wesleyallan](https://github.com/wesleyallan)
- LinkedIn: [@wesleyallan](https://linkedin.com/in/wesleyallan)

## ⭐️ Apoie o Projeto

Se este projeto te ajudou, considere dar uma estrela! Isso ajuda a manter o projeto ativo e incentiva novas contribuições.

---

<br/>
<p align="center">
  Desenvolvido com ❤️ por Wesley Silva
</p>
