# Pós-graduação | Desenvolvimento Web Full Stack
### API - Node.js
Projeto desenvolvido para obtenção de nota na disciplina de Programação Web com linguagem de scripts.

#### Professor:
>   - Me. Thiago Rodrigues

#### Alunos:
>   - Miquéias R. M. Soares
>   - Eduardo Henrique Fidelis Porto
>   - Daniel de Vasconcelos Lopes
 
## Descrição
#### Implementação de Rotas para Produtos
Objetivo: Desenvolver rotas RESTful para manipulação de produtos utilizando Node.js (versão 21.7.2) e MongoDB.

#### Tecnologias Utilizadas
- Node.js: versão 21.7.2
- MongoDB

## Get started

#### 1 - Clonar o Repositório:
- Com ssh ou https:


ssh:
```
$ git clone git@github.com:mqsoares/node-api.git
$ cd node-api
````
https:
```
$ git clone https://github.com/mqsoares/node-api.git
$ cd node-api
````

#### Install - Instalar Depedências
```
$ npm install
```
#### Run
```
$ npm run dev
```

## Rotas

| Método | Rota                                 | Descrição                                                                                                     | Ferramentas Utilizadas                                                                                                                      |
|--------|--------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /products/:id                        | Retorna detalhes de um produto específico.                                                                   | `req.params`, `isValidObjectId`, `findById`, `.populate`                                                                                   |
| GET    | /products/showUserProducts           | Lista todos os produtos pertencentes a um usuário.                                                           | `find({ owner: id })`                                                                                                                       |
| GET    | /products/showRecieverProducts       | Lista todos os produtos recebidos por um usuário.                                                            | `find({ receiver: id })`                                                                                                                   |
| PUT    | /products/:id                        | Atualiza os dados de um produto específico.                                                                  | `req.params`, `isValidObjectId`, `findById`                                                                                                |
| DELETE | /products/:id                        | Deleta um produto específico.                                                                                | `req.params`, `isValidObjectId`, `findById`, `findByIdAndDelete`                                                                            |
| PATCH  | /products/schedule/:id               | Agenda a visita para um produto (Opcional).                                                                  | `req.params`, `isValidObjectId`, `findById`, `findByIdAndUpdate`, `equals`                                                                  |
| PATCH  | /products/concludeDonation/:id       | Conclui a doação de um produto (Opcional).                                                                   | `req.params`, `isValidObjectId`, `findById`, `findByIdAndUpdate`, `equals`, `new Date()`                                                    |

