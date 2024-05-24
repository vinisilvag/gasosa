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
- Prisma, como ORM para simplificar a realização de operações no banco de dados e geração e aplicação das migrações;
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

deve ser usado para executar a API.

## Rotas definidas

Para consumir os serviços oferecidos pela API, é necessário acessar as rotas que foram expostas para os usuários. Para tanto, recomendamos o uso de algum aplicativo que facilite esse processo, como Postman ou Insomnia. As rotas acessíveis são:

### Usuário

#### Criar usuário

Requisição de tipo **POST** no _endpoint_: `http://localhost:3333/api/v1/users`.

O corpo da requisição deve ser algo como

```json
{
  "name": "Teste",
  "email": "teste@email.com",
  "password": "123456"
}
```

#### Deletar usuário

Requisição de tipo **DELETE** no _endpoint_: `http://localhost:3333/api/v1/users/account`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

#### Listar os postos favoritos

Requisição de tipo **GET** no _endpoint_: `http://localhost:3333/api/v1/users/likes`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

#### Favoritar um posto

Requisição de tipo **POST** no _endpoint_: `http://localhost:3333/api/v1/users/likes/:gasStationId`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

#### Remover um posto da lista de favoritos

Requisição de tipo **DELETE** no _endpoint_: `http://localhost:3333/api/v1/users/likes/:gasStationId`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

---

### Postos de Gasolina

#### Listar postos

##### Filtrando por nome do posto e tipo de combustível

Requisição de tipo **GET** no _endpoint_: `http://localhost:3333/api/v1/gas-stations`. Os parâmetros de _query_ `gasStationName` e `fuelName` podem ser providos para que a função filtre os postos de gasolina cadastrados pelo nome e pela oferta de gasolina que contenham os valores informados.

Um exemplo de requisição válida seria:

```
http://localhost:3333/api/v1/gas-stations?gasStationName=Posto&fuelName=Gasolina
```

##### Filtrando por distância do usuário

Requisição de tipo **GET** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/distances`. Os parâmetros de _query_ `userLatitude` e `userLongitude` devem ser providos para que a função calcule a distância dos postos com relação à localização informada do usuário.

Um exemplo de requisição válida seria:

```
http://localhost:3333/api/v1/gas-stations/distances?userLatitude=-19.86749&userLongitude=-43.964467
```

#### Listar um único posto

Requisição de tipo **GET** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/:gasStationId`.

#### Criar posto

Requisição de tipo **POST** no _endpoint_: `http://localhost:3333/api/v1/gas-stations`.

O corpo da requisição deve ser algo como

```json
{
  "name": "Posto",
  "email": "posto@email.com",
  "password": "123456",
  "latitude": -19.86749,
  "longitude": -43.964467
}
```

#### Deletar posto

Requisição de tipo **DELETE** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/account`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

#### Criar combustível

Requisição de tipo **POST** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/fuel`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

O corpo da requisição deve ser algo como

```json
{
  "name": "Gasolina",
  "price": 5.5
}
```

#### Atualizar combustível

Requisição de tipo **PUT** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/fuel/:fuelId`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

O corpo da requisição deve ser algo como

```json
{
  "newName": "Etanol",
  "newPrice": 3.42
}
```

#### Deletar combustível

Requisição de tipo **DELETE** no _endpoint_: `http://localhost:3333/api/v1/gas-stations/fuel/:fuelId`. O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

---

### Sessão

#### Autenticar um usuário ou posto

Requisição de tipo **POST** no _endpoint_: `http://localhost:3333/api/v1/sessions/users/authenticate`.

O corpo da requisição deve ser algo como

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

Após a operação, o usuário autenticado e o _token_ de autenticação serão retornados. Esse _token_ deve ser usado para identificar um usuário nas requisições que necessitam de autenticação. Para tanto ele deve ser usado no campo de autenticação junto com o prefixo **Bearer**. Um exemplo de _header_ de autenticação válido seria

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2NTc1NjUxLCJleHAiOjE3MTcxODA0NTF9.5JaJY8XJKmD9fkC6vE4gsHI4ZYd7lKI_ATlpsabhdXI
```

Para autenticar um posto, os mesmos passos são necessários. A única diferença é que a requisição deve ser feita no _endpoint_ `http://localhost:3333/api/v1/sessions/gas-stations/authenticate`.

#### Buscar o perfil de um usuário ou de um posto

Requisição de tipo **GET** no _endpoint_: `http://localhost:3333/api/v1/sessions/users/profile`.
O _token_ de autenticação JWT deve ser informado para que a operação seja autorizada.

Para buscar o perfil de um posto, a única diferença é que a requisição deve ser feita no _endpoint_ `http://localhost:3333/api/v1/sessions/gas-stations/profile`.
