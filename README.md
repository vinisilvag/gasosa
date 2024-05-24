# Gasosa

Trabalho prático 1 da disciplina de Engenharia de Software 2.

## Membros do grupo

Os membros que compõem o grupo e atuaram como desenvolvedores do sistema são:

- Mirna Mendonça e Silva {2021421940};
- Vinicius Silva Gomes {2021421869}.

## O que é o sistema

O software desenvolvido é a API de um sistema de cadastro e listagem de postos de gasolina. A ideia é que, em conjunto com um interface gráfica, os postos possam se cadastrar, informando sua localização, combustíveis que ofertam e o preço de cada um deles. Os usuários comuns, por sua vez, são capazes de visualizar os postos cadastrados e filtrá-los pelo nome dos postos, tipo de combustível e distância com relação à localização atual do usuário. Além disso, os usuários comuns também podem favoritar e listar seus postos favoritos em uma lista personalizada.

Nessa primeira versão do projeto, apenas a API foi desenvolvida mas, assim como citado anteriormente, a intenção dele é ser utilizado em conjunto como uma interface gráfica (e.g., um site ou aplicativo), para facilitar a navegação do usuário e a utilização das rotas desenvolvidas.

Para registrar postos como favoritos, os usuários precisam se cadastrar e, posteriormente, se autenticar. Já os postos de gasolina, por sua vez, para cadastrarem novos combustíveis, atualizar as informações de combustíveis que já existem ou excluírem um combustível, também precisam se autenticar na plataforma. Para que a identificação seja facilitada, duas rotas de autenticação diferente são usadas, uma para cada tipo de entidade.

## Tecnologias utilizadas

Para a escrita da API, foram utilizadas as seguintes tecnologias:

- Node.js, como ambiente de execução do servidor;
- TypeScript, como linguagem de programação principal;
- Express, como framework web para o Node.js, que possibilitou a criação das rotas que recebem dados e enviam respostas aos usuários aos requisitantes;
- SQLite, como banco de dados para persistir as informações cadastradas;
- Prisma, como ORM para simplificar a realização de operações no banco de dados e geração das migrações;
- ESLint e Prettier, como linter e formatador do código, respectivamente.

## Como executar

Para executar o sistema, é preciso ter instalado na máquina o Node.js em sua versão 20 e o gerenciador de pacotes de sua preferência (para o desenvolvimento utilizamos o npm).

Para baixar os pacotes necessários para a aplicação e criar o banco de dados, os comandos

```
npm install
npx prisma db push
```

devem ser executados. Com o ambiente configurado, o comando

```
npm run start:dev
```

pode ser usado para executar a API.
