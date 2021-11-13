# zhttp
A small library that brings [`zod`][zod], [`express`][express], and [`static-path`][static-path] together to create type safe HTTP endpoints for clients and servers.

* [Reference](./docs)

## Getting Started
Install `zhttp` and `express`.

```sh
npm i zhttp express
# or
yarn add zhttp express
```

- `static-path` requires `typescript@^4.1` (for [template literal types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html))
- `zod` requires you to run TypeScript in [strict mode](https://www.typescriptlang.org/tsconfig#strict).

## Example
Define your endpoints somewhere that both your client and server can import from.

```ts
// shared/endpoints.ts
import { endpoint } from "zhttp";
import { z } from "zod";
import { path } from "path";

export let sendMessage = endpoint({
  // static-path definition
  path: path("/message/:to"),

  // "post" | "get" | "patch" | "put" | "delete" | "head"
  method: "post",

  // zod request body schema
  request: z.object({
    subject: z.string(),
    text: z.string(),
  }),

  // zod response body schema
  response: z.object({
    status: z.union([
      z.literal("success"),
      z.literal("pending"),
      z.literal("failure"),
    ]),
  }),
});
```

Then create corresponding server side route handlers.

```ts
// server/routes.ts
import { createRouter } from "zhttp/express";
import { sendMessage } from "../shared/endpoints";

let router = createRouter();

router.use(sendMessage, async (req, res) => {
  // Type safe access from req.body
  let { subject, text } = req.body;

  // ...

  // Type safe res.body methods
  res.json({ status: "success" });
});

// router.routes() is an Express.Router
```

And finally, the client side.

```ts
// client/index.ts
import { fetchJson } from "zhttp/fetch";
import { sendMessage } from "../shared/endpoints";

let res = await fetchJson(sendMessage, {
  params: { to: "howard" },
  body: {
    subject: "Hello!",
    text: "This is a message",
  },
});

// Type safe response
res.status
```

## Creating a Client

You can create a client from a module which exports endpoints.

```ts
// shared/endpoints/account.ts
import { endpoint } from "zhttp";

export const create = endpoint({
  path: path("/account"),
  method: "put",
  request: z.object({ email: z.string() }),
  response: z.object({ id: z.string(), email: z.string() })
});

export const update = endpoint({
  path: path("/account/:id"),
  method: "post",
  request: z.object({ email: z.string() }),
  response: z.object({ id: z.string(), email: z.string() })
});

export const delete = endpoint({
  path: path("/account/:id"),
  method: "delete",
  request: z.any(),
  response: z.any(),
});
```

Then create the client in your client-side codebase:

```ts
// client/example.ts
import { createClient } from "zhttp/fetch";
import * as accountEndpoints from "../shared/endpoints/account"

export const Accounts = createClient(accountEndpoints);

let account = await Accounts.create({
  body: { email: "example@test.com" },
});

account = await Accounts.update({
  params: { id: account.id },
  body: { email: "newemail@test.com" },
});

await Accounts.delete({
  params: { id: account.id },
});
```

## Fetch Options
It's possible to override the default fetch options for a given request.

```ts
fetchJson(endpoint, {
  // Base url for all this request (defaults to /)
  baseUrl: "http://localhost:3000/api",

  // Headers to pass for all requests
  headers: {},

  // Fetch options (second argument to fetch)
  options: {},
});
```

It's also possible to set default options for all client requests.

```ts
createClient(endpoints, {
  // Base url for all requests (defaults to /)
  baseUrl: "http://localhost:3000/api",

  // Headers to pass for all requests
  headers: {},

  // Fetch options (second argument to fetch)
  options: {},
});
```

## Middleware
The router can accept standard Express middleware before the request handler.

```ts
router.use(someEndpoint, withAuth, withAccount, async (req, res) => {
  // ...
});
```

Note: The [`Express.json()`](http://expressjs.com/en/api.html#express.json) middleware is automatically added to each route.

## Validation Errors
The type system will usually enforce validation and you won't see any errors.

However, if you allow untyped data to go over the network, then server side middleware will catch it before making it into your route handlers and a client side [`ValidationError`](./docs/classes/fetch.ValidationError.md) will be thrown.

[express]: https://github.com/expressjs/express
[zod]: https://github.com/colinhacks/zod
[static-path]: https://github.com/garybernhardt/static-path
