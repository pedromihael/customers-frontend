# Costumers Frontend 👽

Frontend responsivo desenvolvido para o teste de desenvolvedor da Pagaleve.

A partir dessa UI, você pode:

- [x] Listar todos os costumers.
- [x] Pesquisar por costumers.
- [x] Trocar entre tema escuro e tema claro.
- [x] Criar um costumer.
- [x] Editar um costumer.
- [x] Deletar um costumer.

## Stack

- [x] ReactJS
- [x] Typescript
- [x] Material UI
- [x] Styled components

## Organização

```
.
└── root/
    ├── App.tsx
    ├── index.tsx
    ├── public/
    │   └── // arquivos publicos
    └── src/
        ├── assets/
        │   └── // imagens usadas no projeto
        ├── base/
        │   └── // estilos globais
        ├── layout/
        │   ├── pages/
        │   │   └── // junção de partials para montar uma página completa
        │   └── partials/
        │       └── // junção de componentes para formar parte de uma página
        ├── modules/
        │   ├── mui_components/
        │   │   └── // componentes que utilizam Material UI
        │   └── types/
        │       └── // tipos utilizados pelo TS na aplicação
        └── state/
            ├── contexts/
            │   └── // contextos utilizados pela aplicação
            └── hooks/
                └── // hooks próprios da aplicação
```

A organização segue uma arquitetura de componentes reutilizáveis, os quais formam partials, e destes, são montadas as páginas.

## Execução

Você deve ter [Node.JS](https://nodejs.org/en/) instalado.

Para execução na raiz do projeto:

```
$ yarn start
```

## Demo

A aplicação está implantada [aqui](https://costumers-frontend.herokuapp.com/). O ambiente de deploy escolhido foi o Heroku pela facilidade, mas existe um trade-off. A partir de 30min de inatividade do dyno, o mesmo entra em idle, causando um first hit demorado.

## Dúvidas

Caso existam dúvidas, pode falar comigo pelo [Linkedin](https://linkedin.com/in/pedromihael).

Cuide-se! 🤘🏽
