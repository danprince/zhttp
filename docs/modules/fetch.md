[@danprince/zhttp](../README.md) / fetch

# Module: fetch

Functions for calling endpoints from a browser, using [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## Table of contents

### Classes

- [ValidationError](../classes/fetch.ValidationError.md)

### Interfaces

- [FetchDefaults](../interfaces/fetch.FetchDefaults.md)

### Type aliases

- [Client](fetch.md#client)
- [FetchOptions](fetch.md#fetchoptions)

### Functions

- [createClient](fetch.md#createclient)
- [fetchJson](fetch.md#fetchjson)

## Type aliases

### Client

Ƭ **Client**<`Exports`\>: { [K in keyof Exports as Exports[K] extends Endpoint<any, any, any, any\> ? K : never]: Exports[K] extends Endpoint<infer Pattern, infer Method, infer Request, infer Response\> ? Function : never }

A client wrapper around a module, with the non-export endpoints removed.

**`see`** {createClient}

#### Type parameters

| Name |
| :------ |
| `Exports` |

#### Defined in

[src/fetch.ts:153](https://github.com/danprince/zhttp/blob/98e9a8e/src/fetch.ts#L153)

___

### FetchOptions

Ƭ **FetchOptions**<`Pattern`, `Method`, `Request`\>: `Partial`<[`FetchDefaults`](../interfaces/fetch.FetchDefaults.md)\> & keyof `Params`<`Pattern`\> extends `never` ? {} : { `params`: `Params`<`Pattern`\>  } & `Method` extends [`HttpMethodWithoutBody`](index.md#httpmethodwithoutbody) ? {} : { `body`: `Request`  }

Complete set of options for a given request, based on the parameters and the
method.

- GET/HEAD methods won't allow a `body` property.
- Paths without any parameters won't allow a `params` property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](index.md#httpmethod) |
| `Request` | `Request` |

#### Defined in

[src/fetch.ts:26](https://github.com/danprince/zhttp/blob/98e9a8e/src/fetch.ts#L26)

## Functions

### createClient

▸ **createClient**<`Exports`\>(`exports`, `defaults?`): [`Client`](fetch.md#client)<`Exports`\>

Creates a client from a module which exports endpoints.

**`example`**

First define some endpoints.

```ts
// shared/endpoints/account.ts
import { endpoint } from "@danprince/zhttp";

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

Then import them to create the client.

```ts
// client/example.ts
import { createClient } from "@danprince/zhttp/fetch";
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

**`example`** Setting default options for all client requests.

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Exports` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `exports` | `Exports` |
| `defaults?` | `Partial`<[`FetchDefaults`](../interfaces/fetch.FetchDefaults.md)\> |

#### Returns

[`Client`](fetch.md#client)<`Exports`\>

#### Defined in

[src/fetch.ts:231](https://github.com/danprince/zhttp/blob/98e9a8e/src/fetch.ts#L231)

___

### fetchJson

▸ **fetchJson**<`Pattern`, `Method`, `Request`, `Response`\>(`endpoint`, `options`): `Promise`<`Response`\>

Fetches JSON from an endpoint.

**`example`** Fetching from an endpoint
```ts
let response = await fetchJson(someEndpoint, {
  baseUrl: "/", // default baseUrl
  headers: { "Content-type": "application/json" } // default headers
  options: {}, // default fetch options
});
```

**`example`** Passing custom headers
```ts
let response = fetchJson(someEndpoint, {
  headers: {
    "Content-type": "application/json",
    "Authentication": "Basic XXYYZZ"
  }
});
```

Note: Any passed headers will override the default headers, so ensure that
a `"Content-type": "application/json"` header is present.

**`example`** Custom fetch options
```ts
let response = await fetchJson(someEndpoint, {
  options: {
    mode: "cors",
    credentials: "include"
  },
});
```

These options are passed directly to the request options for `fetch`.

**`example`** Validation errors
The type system will usually enforce validation and you won't see any errors.

However, if you allow untyped data to go over the network, then server side
middleware will catch it before making it into your route handlers and a
client side [`ValidationError`](./docs/classes/fetch.ValidationError.md)
will be thrown.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](index.md#httpmethod) |
| `Request` | `Request` |
| `Response` | `Response` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\> | A zhttp endpoint |
| `options` | [`FetchOptions`](fetch.md#fetchoptions)<`Pattern`, `Method`, `Request`\> | Request options |

#### Returns

`Promise`<`Response`\>

Parsed server response body

#### Defined in

[src/fetch.ts:109](https://github.com/danprince/zhttp/blob/98e9a8e/src/fetch.ts#L109)
