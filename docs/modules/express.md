[zhttp](../README.md) / express

# Module: express

## Table of contents

### Type aliases

- [Middleware](express.md#middleware)

### Functions

- [createRouter](express.md#createrouter)

## Type aliases

### Middleware

Ƭ **Middleware**<`E`\>: `E` extends [`Endpoint`](index.md#endpoint)<infer Pattern, `any`, infer Request, infer Response\> ? `Express.RequestHandler`<`Params`<`Pattern`\>, `Response`, `Request`\> : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](index.md#endpoint)<`any`, `any`, `any`, `any`\> |

#### Defined in

[src/express.ts:6](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/express.ts#L6)

## Functions

### createRouter

▸ **createRouter**(`router?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `router` | `Router` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `routes` | () => `Router` |
| `use` | <Pattern, Method, Request, Response, Query, Locals\>(`endpoint`: [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\>, ...`handlers`: `RequestHandler`<`Params`<`Pattern`\>, `Response`, `Request`, `Query`, `Locals`\>[]) => `void` |

#### Defined in

[src/express.ts:10](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/express.ts#L10)
