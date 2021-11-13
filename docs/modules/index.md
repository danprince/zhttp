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

[src/index.ts:13](https://github.com/danprince/zhttp/blob/94de2ce/src/index.ts#L13)

___

### HttpMethod

Ƭ **HttpMethod**: [`HttpMethodWithBody`](index.md#httpmethodwithbody) \| [`HttpMethodWithoutBody`](index.md#httpmethodwithoutbody)

#### Defined in

[src/index.ts:6](https://github.com/danprince/zhttp/blob/94de2ce/src/index.ts#L6)

___

### HttpMethodWithBody

Ƭ **HttpMethodWithBody**: ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| ``"options"``

#### Defined in

[src/index.ts:5](https://github.com/danprince/zhttp/blob/94de2ce/src/index.ts#L5)

___

### HttpMethodWithoutBody

Ƭ **HttpMethodWithoutBody**: ``"get"`` \| ``"head"``

#### Defined in

[src/index.ts:4](https://github.com/danprince/zhttp/blob/94de2ce/src/index.ts#L4)

## Functions

### endpoint

▸ **endpoint**<`Pattern`, `Method`, `Request`, `Response`\>(`endpoint`): [`Endpoint`](index.md#endpoint)<`Pattern`, `Method`, `Request`, `Response`\>

Helper for defining endpoints so that they end up with the correct types
without needing to annotate them explicitly.

**`example`**
```ts
let myEndpoint = endpoint({
  path: "/example",
  method: "get",
  response: z.object({ id: z.number() }),
});

// vs

let myEndpoint: Endpoint<"/example", "get", never, { id: number }> = {
  path: "/example",
  method: "get",
  response: z.object({ id: z.number() }),
};
```

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

[src/index.ts:50](https://github.com/danprince/zhttp/blob/94de2ce/src/index.ts#L50)
