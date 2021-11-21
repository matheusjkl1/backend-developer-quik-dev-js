# Desafio QuikDev - Backend Developer Test

## Pré-requisitos
  1. `Node >= 14.x.x`
  2. `Npm`
  3. `Docker`

1. Clone o repositório
  * `git clone git@github.com:matheusjkl1/in-company.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd Backend-Developer`
 
## Para Iniciar o Projeto

### Execute o seguinte comando para instalar as dependências de desenvolvimento do projeto: 
```sh
yarn install
```

## Implementações técnicas

### Na raiz do diretório do projeto, crie um arquivo *.env* seguindo com as variáveis de ambiente que estão presentes no arquivo .env.example, *é preferivel o uso dos mesmos valores.*
```sh
SERVER_PORT=4323

DB_PORT=27017
DB_HOST=db
DB_NAME=dev
DB_USER=
DB_PASS=
```

### Na raiz do diretório do projeto, execute o seguinte comando que fará a instalação do container docker
```sh
 make down && make up
```
### Após installar as dependências, você deve executar o seguinte comando para iniciar o Back-end:

```sh
yarn dev
```

## Após inciar o projeto temos acesso a 5 rotas

#### *GET*
  Nesta rota é possivel listar um usuario 
```sh
1 - http://localhost:${SERVER_PORT}/customer/${ID do Usuario}
``` 
O retorna será
```sh
{
    "_id": "619a96f33bc918e6bdb13f3c",
    "name": "Fausto",
    "birthdate": "02/10/96",
    "address": "59963 Ashly Walks",
    "addressNumber": "5",
    "primaryPhone": "51995676666",
    "description": "Sou um cara divertido",
    "createdAt": "2021-11-21T18:58:59.076Z"
}
```
#### *POST*
Nesta rota é possivel cadastrar é possível *registrar* o usuario
```sh
2 - http://localhost:${SERVER_PORT}/customer/register
```
Ao passar um objeto:
```sh
{
  "name": "name example",
  "username": "usernameexample",
  "password": "passwordexample",
  "birthdate": "25/04/63",
  "address": "adress example",
  "addressNumber": "1590",
  "primaryPhone": "11995676646",
  "description": "Description example"
}
```
O retorna será:
```sh
{
    "id": "619a9c4aac16ea1246ff3cf9",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlhOWM0YWFjMTZlYTEyNDZmZjNjZjkiLCJpYXQiOjE2Mzc1MjI1MDYsImV4cCI6MTYzNzUyNTgwNn0.0pXkSB-NkrXhk-NTiqsFvBaZxyBjjjZgjp_QppEmsr4"
}
```

  Nesta rota é possivel *logar* um usuario
```sh
3 - http://localhost:${SERVER_PORT}/customer/login
```
#### *PUT*
```sh
```
#### *DELETE*
```sh
```


### Para testar a aplicação no diretório do projeto, você deve executar o seguinte comando:

```sh
yarn test
```
