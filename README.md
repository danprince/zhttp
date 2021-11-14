# zhttp
A small library that brings [`zod`][zod], [`express`][express], and [`static-path`][static-path] together to create type safe HTTP endpoints for clients and servers.

- [Reference](./docs)
  - [`endpoint`](./docs/modules/index.md#endpoint)
  - [`createRouter`](./docs/modules/express.md#createRouter)
  - [`fetchJson`](./docs/modules/fetch.md#fetchJson)
  - [`createClient`](./docs/modules/fetch.md#createClient)

## Getting Started
Install `zhttp` and its peer dependencies.

```sh
npm i @danprince/zhttp express @types/express zod static-path
```

- `static-path` requires `typescript@^4.1` (for [template literal types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html))
- `zod` requires you to run TypeScript in [strict mode](https://www.typescriptlang.org/tsconfig#strict).

## Example
Define your endpoints somewhere that both your client and server can import from.

```ts
// shared/endpoints.ts
import { endpoint } from "@danprince/zhttp";
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
import { createRouter } from "@danprince/zhttp/express";
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
import { fetchJson } from "@danprince/zhttp/fetch";
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

[express]: https://github.com/expressjs/express
[zod]: https://github.com/colinhacks/zod
[static-path]: https://github.com/garybernhardt/static-path
