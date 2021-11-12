[zhttp](../README.md) / fetch

# Module: fetch

## Table of contents

### Classes

- [ValidationError](../classes/fetch.ValidationError.md)

### Functions

- [createClient](fetch.md#createclient)
- [fetchJson](fetch.md#fetchjson)

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
| `defaults?` | `Partial`<`FetchDefaults`\> |

#### Returns

`Client`<`Exports`\>

#### Defined in

[src/fetch.ts:92](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/fetch.ts#L92)

___

### fetchJson

▸ **fetchJson**<`Pattern`, `Method`, `Request`, `Response`\>(`endpoint`, `options`): `Promise`<`Response`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](index.md#httpmethod) |
| `Request` | `Request` |
| `Response` | `Response` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\> |
| `options` | `FetchOptions`<`Pattern`, `Method`, `Request`\> |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/fetch.ts:37](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/fetch.ts#L37)
