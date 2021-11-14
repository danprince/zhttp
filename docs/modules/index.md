[@danprince/zhttp](../README.md) / index

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

Definition for a typed HTTP endpoint.

{@see endpoint}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` |
| `Method` | extends [`HttpMethod`](index.md#httpmethod) |
| `Request` | `Request` |
| `Response` | `Response` |

#### Defined in

[src/index.ts:13](https://github.com/danprince/zhttp/blob/01efeb1/src/index.ts#L13)

___

### HttpMethod

Ƭ **HttpMethod**: [`HttpMethodWithBody`](index.md#httpmethodwithbody) \| [`HttpMethodWithoutBody`](index.md#httpmethodwithoutbody)

#### Defined in

[src/index.ts:6](https://github.com/danprince/zhttp/blob/01efeb1/src/index.ts#L6)

___

### HttpMethodWithBody

Ƭ **HttpMethodWithBody**: ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| ``"options"``

#### Defined in

[src/index.ts:5](https://github.com/danprince/zhttp/blob/01efeb1/src/index.ts#L5)

___

### HttpMethodWithoutBody

Ƭ **HttpMethodWithoutBody**: ``"get"`` \| ``"head"``

#### Defined in

[src/index.ts:4](https://github.com/danprince/zhttp/blob/01efeb1/src/index.ts#L4)

## Functions

### endpoint

▸ **endpoint**<`Pattern`, `Method`, `Request`, `Response`\>(`endpoint`): [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\>

Helper for defining endpoints.

```ts
import { endpoint } from "@danprince/zhttp";
import { path } from "static-path";

// define GET /examples/:name
export let getExampleByName = endpoint({
  method: "get",
  path: path("/examples/:name"),
  response: z.object({ name: z.string() }),
});

// define POST /books/:id
export let updateBook = endpoint({
  method: "post",
  path: path("/books/:id"),
  request: z.object({ title: z.string() }),
  response: z.object({ id: z.string(), title: z.string() }),
});
```

It's possible to declare endpoints without this function, but it requires
more duplication of type annotations.

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

[src/index.ts:55](https://github.com/danprince/zhttp/blob/01efeb1/src/index.ts#L55)
