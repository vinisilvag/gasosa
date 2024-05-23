# Gasosa

Trabalho prático 1 da disciplina de Engenharia de Software 2.

## O que é o sistema

Esse repositório armazena a API de um sistema de cadastro e listagem de postos de gasolina. A ideia é que, em conjunto com um interface gráfica, os postos possam se cadastrar, informando sua localização, combustíveis que ofertam e o preço de cada um deles. Os usuários comuns, por sua vez, são capazes de visualizar os postos cadastrados e filtrá-los pelo nome dos postos, tipo de combustível e distância com relação à localização atual do usuário. Além disso, os usuários comuns também podem favoritar e listar seus postos favoritos em uma lista personalizada.

Nessa primeira versão do projeto, apenas a API foi desenvolvida mas, assim como citado anteriormente, a intenção dele é ser utilizado em conjunto como uma interface gráfica (e.g., um site ou aplicativo, preferencialmente), para facilitar a navegação do usuário e a utilização das rotas desenvolvidas.

## Membros do grupo

Os membros que compõem o grupo e atuaram como desenvolvedores do sistema são:

- Mirna Mendonça e Silva {2021421940};
- Vinicius Silva Gomes {2021421869}.

## Tecnologias utilizadas

Para a escrita do serviço, foram utilizadas as seguintes tecnologias:

- Node.js, como ambiente de execução para o serviço;
- TypeScript, como linguagem de programação principal;
- Express, como framework web para o Node.js, que possibilitou a criação das rotas que recebem parâmetros e enviam respostas aos usuários aos requisitantes;
- SQLite, como banco de dados para persistir as informações cadastradas;
- Prisma, como ORM para simplificar a realização de operações no banco de dados e geração das migrações;
- ESLint e Prettier, como linter e formatador do código, respectivamente.
