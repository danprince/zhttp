[@danprince/zhttp](../README.md) / fetch

# Module: fetch

## Table of contents

### Classes

- [ValidationError](../classes/fetch.ValidationError.md)

### Interfaces

- [FetchDefaults](../interfaces/fetch.FetchDefaults.md)

### Type aliases

- [FetchOptions](fetch.md#fetchoptions)

### Functions

- [createClient](fetch.md#createclient)
- [fetchJson](fetch.md#fetchjson)

## Type aliases

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

[src/fetch.ts:21](https://github.com/danprince/zhttp/blob/ae945e4/src/fetch.ts#L21)

## Functions

### createClient

▸ **createClient**<`Exports`\>(`exports`, `defaults?`): `Client`<`Exports`\>

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

`Client`<`Exports`\>

#### Defined in

[src/fetch.ts:161](https://github.com/danprince/zhttp/blob/ae945e4/src/fetch.ts#L161)

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

[src/fetch.ts:94](https://github.com/danprince/zhttp/blob/ae945e4/src/fetch.ts#L94)
