# Desafio Verzel: Back-end - API Rest

### Descrição
- API para o site de uma escola
- Principais funcionalidades: cadastrar/visualizar/excluir informações de usuários, módulos e aulas. 

### Como usar

- Cadastrar novo usuário: usar o endpoint signup. Passanod via body as seguintes informações: name, email, password e role. Para role temos duas duas opções: 'ADMIN' ou 'NORMAL'.

- Login: usar o endpoint login. Passando via body as seguintes informações: email, password.

- Pegar todos os módulos disponíveis: usar o endpoint getAllModule. Basta o usuário bater nesse endpoint de retornar todos os módulos, não é necessário passar nenhuma informação. 

- Criar novo módulo: usar o enpoint createModule. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar novo módulo, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: name. Somente usuários ADMIN podem realizar essa operação.

- Editar módulo: usar o enpoint editModule. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de editar módulo, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: name. Somente usuários ADMIN podem realizar essa operação.

- Deletar módulo: usar o enpoint deleteModule. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de deletar módulo, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: id. Somente usuários ADMIN podem realizar essa operação.

- Pegar todas as aulas disponíveisde um módulo: usar o endpoint getAllClasseByModule. Basta o usuário bater nesse endpoint de retornor todas as aulas de módulos, é necessário passar o Request Params - id.

- Criar nova aula: usar o enpoint createClasse. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar nova aula, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: name, classDate e moduleId. Somente usuários ADMIN podem realizar essa operação.

- Editar aula: usar o enpoint editClasse. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de editar aula, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: name e classDate. Somente usuários ADMIN podem realizar essa operação.

- Deletar aula: usar o enpoint deleteClasse. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de deletar aula, colocando o token, no campo de Headers - Authorization, e passando no campo Body, a seguinte informação: id. Somente usuários ADMIN podem realizar essa operação.

* Para mais informações, sobre como usar essa API, consultar a documentação no Postaman, pois nela, tem exemplos de como usar cada enpoint.

### Dados para login:
- email: soraia@gmail.com
- password: 123456
- caso prefira, pode criar um novo usuário.

### Tecnologias utulizadas:
- Typescript
- Node.js
- Dotenv
- Express
- Cors
- MySQL
- Knex
- UUID
- Jsonwebtoken
- Bcryptjs
- Heroku

### Documentação do Postaman
https://documenter.getpostman.com/view/18384258/UVsSP4cV

### Documentação do Heroku
https://desafio-verzel-soraia.herokuapp.com/
