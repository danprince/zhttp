[![Test](https://github.com/danprince/typesafe-endpoints/actions/workflows/test.yml/badge.svg)](https://github.com/danprince/typesafe-endpoints/actions/workflows/test.yml)

# Typesafe Endpoints
A small library that brings [`express`][express], [`zod`][zod], and [`static-path`][static-path] together to create type safe API endpoints across client and server.

## Example

Start off by defining your endpoints somewhere that your client and server can both import from.

```ts
// ./shared/endpoints.ts
import { endpoint } from "typesafe-endpoints";
import { z } from "zod";
import { path } from "path";

export let sendMessage = endpoint({
  // Use static-path to define a typesafe path
  path: path("/message/:to"),
  method: "post",

  // Use zod to describe request body schema
  request: z.object({
    subject: z.string(),
    text: z.string(),
  }),

  // Use zod to describe response body schema
  response: z.object({
    status: z.union([
      z.literal("success"),
      z.literal("pending"),
      z.literal("failure"),
    ]),
  }),
});
```

Then create server side route handlers for this endpoint.

```ts
// ./server/routes.ts
import { createRouter } from "typesafe-endpoints/express";
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
// ./client/index.ts
import { fetchJson } from "typesafe-endpoints/fetch";
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
If you export multiple endpoints from a single module, then you can use `createClient` to create a fetch client with automatically created methods.

```ts
// ./shared/endpoints/account.ts
import { endpoint } from "typesafe-endpoints";

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
// ./client/example.ts
import * as accountEndpoints from "../shared/endpoints/account"
import { createClient } from "typesafe-endpoints/fetch";

export const Accounts = createClient(accountEndpoints);

let account = await Accounts.create({
  params: {},
  body: { email: "example@test.com" },
});

account = await Accounts.update({
  params: { id: account.id },
  body: { email: "newemail@test.com" },
});

await Accounts.delete({
  params: { id: account.id },
  body: {},
});
```

## Validation Errors
Assuming you're well behaved with `any`, the type system will enforce validation and you won't see any errors.

If, however, you allow untyped data to go over the network, then server side middleware will catch it before making it into your route handlers and a client side `ValidationError` will be thrown.

## Middleware
The router can accept type safe middleware, in addition to the normal handler.

```ts
router.use(someEndpoint, someMiddleware, async (req, res) => {
  // ...
});
```

## Client/Server Code Sharing 
Setting up a mechanism to share code between your client/server codebases can be the trickiest part of making this work.

Here are some strategies:
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
- [Lerna Monorepos](https://github.com/lerna/lerna)
- [Yarn with `link:`](https://classic.yarnpkg.com/lang/en/docs/cli/add/#toc-adding-dependencies)

[express]: https://github.com/expressjs/express
[zod]: https://github.com/colinhacks/zod
[static-path]: https://github.com/garybernhardt/static-path
