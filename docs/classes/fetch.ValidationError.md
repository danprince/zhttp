[@danprince/zhttp](../README.md) / [fetch](../modules/fetch.md) / ValidationError

# Class: ValidationError

[fetch](../modules/fetch.md).ValidationError

Error class that will be thrown if server-side validation fails a given
fetch request.

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

## Table of contents

### Constructors

- [constructor](fetch.ValidationError.md#constructor)

### Properties

- [issues](fetch.ValidationError.md#issues)
- [message](fetch.ValidationError.md#message)
- [name](fetch.ValidationError.md#name)
- [stack](fetch.ValidationError.md#stack)
- [prepareStackTrace](fetch.ValidationError.md#preparestacktrace)
- [stackTraceLimit](fetch.ValidationError.md#stacktracelimit)

### Methods

- [captureStackTrace](fetch.ValidationError.md#capturestacktrace)

## Constructors

### constructor

• **new ValidationError**(`issues`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `issues` | `ZodIssue`[] |

#### Overrides

Error.constructor

#### Defined in

[src/fetch.ts:50](https://github.com/danprince/typesafe-endpoints/blob/9d3ac67/src/fetch.ts#L50)

## Properties

### issues

• **issues**: `ZodIssue`[]

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
