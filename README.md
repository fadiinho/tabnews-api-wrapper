# TabNews API Wrapper

Todos os endpoints e seus respectivos parâmetros podem ser encontrados [aqui](https://www.tabnews.com.br/GabrielSozinho/documentacao-da-api-do-tabnews)

## Uso

Instancie a classe da API

```js
import { TabnewsApi } from "tabnews-api";
// ou
const { TabnewsApi } = require("tabnews-api");

const api = new TabnewsApi();
```

### Conteúdo

#### Listar os posts da página inicial

```js
// Todos os parâmetros são opcionais
const posts = await api.getPosts({
  page: 1,
  per_page: 2,
  strategy: "new",
});
```

<details>
<summary>Interface de Resposta</summary>

```ts
Content {
    id: string;
    parent_id: string | null;
    owner_id: string;
    slug: string;
    title: string | null;
    status: 'published' | 'draft';
    source_url: string | null;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    deleted_at: Date | null;
    tabcoins: number;
    owner_username: string;
    children_deep_count: number;
}[]
```
> **Nota**: Os posts da página inicial não contêm `body`

</details>

#### Listar os posts de um determinado usuário

```js
const userPosts = await api.getPostsByUser("<username>", {
  page: 1,
  per_page: 2,
  strategy: "new",
});
```
<details>
<summary>Interface de Resposta</summary>

```ts
Content {
    id: string;
    parent_id: string | null;
    owner_id: string;
    slug: string;
    body?: string;
    title: string | null;
    status: 'published' | 'draft';
    source_url: string | null;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    deleted_at: Date | null;
    tabcoins: number;
    owner_username: string;
    children_deep_count: number;
}[]
```

</details>

#### Buscar os detalhes de um post, incluindo corpo do post

```js
const posts = await api.getPostDetails("<username>", "<slug>");
```
<details>
<summary>Interface de Resposta</summary>

```ts
Content {
    id: string;
    parent_id: string | null;
    owner_id: string;
    slug: string;
    body?: string;
    title: string | null;
    status: 'published' | 'draft';
    source_url: string | null;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    deleted_at: Date | null;
    tabcoins: number;
    owner_username: string;
    children_deep_count: number;
}[]
```

</details>

#### Buscar os comentários de um post

```js
const postComments = await api.getPostComments("<username>", "<slug>");
```
<details>
<summary>Interface de Resposta</summary>

```ts
Content {
    id: string;
    parent_id: string | null;
    owner_id: string;
    slug: string;
    body?: string;
    title: string | null;
    status: 'published' | 'draft';
    source_url: string | null;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    deleted_at: Date | null;
    tabcoins: number;
    owner_username: string;
    children_deep_count: number;
}[]
```

</details>

#### Buscar a thumbnail de um post

```js
const postThumbnail = await api.getPostThumbnail("<username>", "<slug>");
```
Retorna um `Buffer`

> TODO: Criação de posts

### Analytics

#### Buscar quantos usuários foram criados por dia

```js
const postComments = await api.userAnalytics();
```
<details>
<summary>Interface de Resposta</summary>

```ts

interface UsersCreatedStatus {
    /**
     * Date in the format dd/mm
     */
    date: string;
    cadastrados: number;
}[]
```

</details>

#### Buscar quantos posts (root content) foram criados por dia

```js
const postComments = await api.postAnalytics();
```
<details>
<summary>Interface de Resposta</summary>

```ts

interface RootContentPublishedStatus {
    /**
     * Date in the format dd/mm
     */
    date: string;
    conteudos: number;
}[]
```

</details>

#### Buscar quantos comentários (child content) foram criados por dia

```js
const postComments = await api.commentsAnalytics();
```
<details>
<summary>Interface de Resposta</summary>

```ts

interface ChildContentPublishedStatus {
    /**
     * Date in the format dd/mm
     */
    date: string;
    respostas: number;
}[]
```

</details>

### Autenticação
> TODO :)
