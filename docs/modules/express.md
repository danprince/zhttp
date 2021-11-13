[@danprince/zhttp](../README.md) / express

# Module: express

Helpers for using zhttp endpoints with Express.

## Table of contents

### Interfaces

- [Router](../interfaces/express.Router.md)

### Type aliases

- [RequestHandler](express.md#requesthandler)

### Functions

- [createRouter](express.md#createrouter)

## Type aliases

### RequestHandler

Ƭ **RequestHandler**<`E`\>: `E` extends [`Endpoint`](index.md#endpoint)<infer Pattern, `any`, infer Request, infer Response\> ? `Express.RequestHandler`<`Params`<`Pattern`\>, `Response`, `Request`\> : `never`

Helper type that will infer the correct type for an endpoint request handler.

**`example`**
```ts
let withAuth: RequestHandler<typeof logout> = (req, res) => {
  // req, res are typed for the logout endpoint
};
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](index.md#endpoint)<`any`, `any`, `any`, `any`\> |

#### Defined in

[src/express.ts:21](https://github.com/danprince/zhttp/blob/ae945e4/src/express.ts#L21)

## Functions

### createRouter

▸ **createRouter**(`expressRouter?`): [`Router`](../interfaces/express.Router.md)

**`example`** Creating a router

```ts
let router = createRouter(); 
router.use(endpoint, (req, res) => {});
```

**`example`** Using an existing router

```ts
// router is an existing Express.Router
let { use } = createRouter(router);

router.post(...);
use(endpoint, (req, res) => {});
router.post(...);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expressRouter` | `Router` | Optional instance of an Express.Router to use |

#### Returns

[`Router`](../interfaces/express.Router.md)

A typed router

#### Defined in

[src/express.ts:82](https://github.com/danprince/zhttp/blob/ae945e4/src/express.ts#L82)
