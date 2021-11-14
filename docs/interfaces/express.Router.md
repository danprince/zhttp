[@danprince/zhttp](../README.md) / [express](../modules/express.md) / Router

# Interface: Router

[express](../modules/express.md).Router

A wrapper for Express.Router that can associate request handlers with
endpoints in a type safe way.

## Table of contents

### Methods

- [routes](express.Router.md#routes)
- [use](express.Router.md#use)

## Methods

### routes

▸ **routes**(): `Router`

Returns the underlying Express.Router.

#### Returns

`Router`

#### Defined in

[src/express.ts:33](https://github.com/danprince/zhttp/blob/98e9a8e/src/express.ts#L33)

___

### use

▸ **use**<`Pattern`, `Method`, `Request`, `Response`, `Query`, `Locals`\>(`endpoint`, ...`handlers`): `void`

Add request handlers to an [Endpoint](../modules/index.md#endpoint).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](../modules/index.md#httpmethod) |
| `Request` | `Request` |
| `Response` | `Response` |
| `Query` | extends `ParsedQs` |
| `Locals` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | [`Endpoint`](../modules/index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\> | Endpoint to handle |
| `...handlers` | `RequestHandler`<`Params`<`Pattern`\>, `Response`, `Request`, `Query`, `Locals`\>[] | Express middleware/request handlers |

#### Returns

`void`

#### Defined in

[src/express.ts:41](https://github.com/danprince/zhttp/blob/98e9a8e/src/express.ts#L41)
