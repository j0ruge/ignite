# Ignite



## [Utilizando os métodos HTTP](https://app.rocketseat.com.br/node/chapter-i-2/group/configurando-o-projeto/lesson/utilizando-os-metodos-http)

**`GET`** ⇒ Buscar uma informação dentro do servidor

**POST** ⇒ Inserir uma informação no servidor

**PUT** ⇒ Alterar uma informação no servidor

**PATCH** ⇒ Alterara uma informação específica

**DELETE** ⇒ Deletar uma informação no servidor.

---

## [Tipos de parâmetros](https://app.rocketseat.com.br/node/chapter-i-2/group/configurando-o-projeto/lesson/tipos-de-parametros-1)

**Route Params** ⇒ Identificar um recurso para editar/deletar/buscar um recurso.

- São mandatórios na requisição

**Query Params** ⇒ Paginação / Filtro

- São opcionais na requisição

**Body Params** ⇒ Os objetos inserção / alteração (JSON)

Para o Express reconhecer JSON temos de usar o middleware `express.json()`

```jsx
app.use( express.json() );
```

---
