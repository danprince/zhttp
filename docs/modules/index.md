[zhttp](../README.md) / index

# Module: index

## Table of contents

### Type aliases

- [Endpoint](index.md#endpoint)
- [HttpMethod](index.md#httpmethod)
- [HttpMethodWithBody](index.md#httpmethodwithbody)
- [HttpMethodWithoutBody](index.md#httpmethodwithoutbody)

### Functions

- [endpoint](index.md#endpoint)

## Type aliases

### Endpoint

Ƭ **Endpoint**<`Pattern`, `Method`, `Request`, `Response`\>: `Method` extends [`HttpMethodWithBody`](index.md#httpmethodwithbody) ? { `method`: `Method` ; `path`: `Path`<`Pattern`\> ; `request`: `z.ZodType`<`Request`\> ; `response`: `z.ZodType`<`Response`\>  } : { `method`: `Method` ; `path`: `Path`<`Pattern`\> ; `response`: `z.ZodType`<`Response`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](index.md#httpmethod) |
| `Request` | `Request` |
| `Response` | `Response` |

#### Defined in

[src/index.ts:8](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/index.ts#L8)

___

### HttpMethod

Ƭ **HttpMethod**: [`HttpMethodWithBody`](index.md#httpmethodwithbody) \| [`HttpMethodWithoutBody`](index.md#httpmethodwithoutbody)

#### Defined in

[src/index.ts:6](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/index.ts#L6)

___

### HttpMethodWithBody

Ƭ **HttpMethodWithBody**: ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| ``"options"``

#### Defined in

[src/index.ts:5](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/index.ts#L5)

___

### HttpMethodWithoutBody

Ƭ **HttpMethodWithoutBody**: ``"get"`` \| ``"head"``

#### Defined in

[src/index.ts:4](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/index.ts#L4)

## Functions

### endpoint

▸ **endpoint**<`Pattern`, `Method`, `Request`, `Response`\>(`endpoint`): [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\>

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

#### Returns

[`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\>

#### Defined in

[src/index.ts:20](https://github.com/danprince/typesafe-endpoints/blob/1472ec3/src/index.ts#L20)
