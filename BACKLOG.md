# Backlog

## Backlog da Sprint

Histórias que já foram detalhadas e devem ser desenvolvidas ao longo da sprint atual.

- Tarefas técnicas (não atreladas a nenhuma história). [Done]

  - Configurar o ambiente de desenvolvimento [Vinicius] [Done]

- Como usuário, eu gostaria de me cadastrar na plataforma. [Done]

  - Criar o modelo de usuário no servidor/banco de dados. [Vinicius] [Done]
  - Criar rota para inserção de dados de cadastro no banco. [Vinicius] [Done]
  - Validar as informações enviadas ao servidor. [Vinicius] [Done]

- Como usuário, eu gostaria de me autenticar na plataforma.

  - Criar rota para autenticar um usuário. [Vinicius] [Done]
  - Validar as informações de login enviadas ao servidor. [Vinicius] [Done]
  - Criar rota para buscar dados de um usuário autenticado. [Vinicius] [Done]

- Como consumidor, eu gostaria de poder filtrar a lista de preços (ordenar por preço, proximidade, etc). [Mirna]

- Como posto, eu gostaria de atualizar o preço de um combustível. [Mirna]

  - Criar rota para atualizar o preço de um combustível de um usuário de tipo `gas-station`. [Mirna]
  - Validar a informação do preço enviada para o servidor.
  - Garantir que o usuário autenticado que consuma essa rota seja do tipo `gas-station` [Vinicius]

- Como consumidor, eu gostaria de poder favoritar postos. [Vinicius]

## Backlog do Produto

Histórias que ainda serão refinadas e desenvolvidas nas próximas sprints do projeto.

- Como consumidor, eu gostaria de poder filtrar os postos pelo nome.
  - Criar rota para buscar os postos que contenham o texto passado como filtro no nome.
  - Validar a informação do filtro enviada para o servidor.
- Como consumidor, eu gostaria de poder informar preços de postos não cadastrados.
- Como consumidor, eu gostaria de configurar e receber alertas sobre preços em postos específicos.
- Como consumidor, eu gostaria de poder informar que um preço está errado.
- Como consumidor, eu gostaria de poder encontrar rotas para o posto que escolhi.
- Como consumidor, eu gostaria de poder comentar sobre postos.
- Como posto, eu gostaria de poder criar promoções.
- Como posto, eu gostaria de poder informar outros serviços (carga de carro elétrico, loja de conveniência, lava a jato, etc).
- Como usuário, eu gostaria de ter acesso a uma seção onde possa esclarecer minhas principais dúvidas sobre a plataforma (FAQ).
- Como usuário, eu gostaria de poder compartilhar um convite em redes sociais.
- Como usuário, eu gostaria de poder dar um feedback/report de bugs na plataforma.