# Overflow

Babel Plugin to transform Flow typed JavaScript to TypeScript.

## Transformations

### Base types

The examples have been chosen to give an overview and show some of the syntax differences. Many of the basic type annotations do not require any syntax transformation.

| Status | Type                  | Flow                           | TypeScript | Notes |
|--------|-----------------------|--------------------------------|------------|-------|
| Done   | Any type | `any` | `any` |  |
| Done   | Array type | `Array<number>`, `number[]` | `number[]` |  |
| Done   | Boolean literal type | `type BoolLiteral = true` | `type BoolLiteral = true` |  |
| Done   | Boolean type | `type Boolean = boolean ` | `type Boolean = boolean` |  |
| Done   | Empty type | `type Empty = empty` | `type Empty = never` | *undocumented* |
| Done   | Exact object type | `type ExactObject = {\| p: number \|}` | `type ExactObject = { p: number }` | TS default behaviour |
| Done   | Function type | `type Function = (string) => number` | `type Function = (p1: string) => number` |  |
| Done   | Generic type | `type Generic<T: Animal> = T;` | `type Generic<T extends Animal> = T;` |  |
| Done   | Interface type | `interface { +p: number }` | `interface { readonly p: number }` |  |
| Done   | Intersection type | `type Intersection = T1 & T2` | `type Intersection = T1 & T2` |  |
| Done   | Mixed type | `type Mixed = mixed` | `type Mixed = unknown` |  |
| Done   | Null literal type | `type Null = null` | `type Null = null` |  |
| Done   | Nullable type (Maybe) | `type Maybe = ?number` | `type Maybe = number \| null \| undefined` |  |
| Done   | Number literal type | `type NumberLiteral = 3` | `type NumberLiteral = 3` |  |
| Done   | Number type | `type Number = number` | `type Number = number` |  |
| Done   | Object type | `type Object = { [string]: number }` | `type Object = { [key: string]: number }` |  |
| Done   | Opaque type | `opaque type Opaque = number` | `type Opaque = number` | Unsupported in TS |
| Done   | String literal type | `type StringLiteral = 'string'` | `type StringLiteral = 'string'` |  |
| Done   | String type | `type String = string` | `type String = string` |  |
| Done   | This type | `type This = this` | `type This = this` |  |
| Done   | Tuple type | `type Tuple = [Date, number]` | `type Tuple = [Date, number]` |  |
| Done   | Typeof type | `type Typeof = typeof undefined` | `type Typeof = undefined` |  |
| Done   | Union type | `type Union = number \| null` | `type Union = number \| null` |  |
| Done   | Void type | `type Void = void` | `type Void = void` |  |

### Utility types

| Status | Type                  | Flow                           | TypeScript | Notes |
|--------|-----------------------|--------------------------------|------------|-------
| Done   | ExistsTypeAnnotation (Existential) | `*` | `any` | Unsupported in TS |

### Language constructs

| Status | Construct             | Flow                           | TypeScript | Notes |
|--------|-----------------------|--------------------------------|------------|-------
| Done   | Casting | `(t: T)` | `(t as T)` | Unsupported in TS |
| Done   | Exports / Imports | TODO | TODO | ja |

<br>
<br>
<br>

### Different syntax

| Type                  | Flow                           | TypeScript |
|-----------------------|--------------------------------|------------|
| Casting               | `(a: A)`                       | `(a as A)` |
| Exact type            | `{\| a: A \|}`                 | `{ a: A }` |
| Function              | `(A, B) => C`                  | `(a: A, b: B) => C` |
| Import default type   | `import type A from './b'`     | `import A from './b'` |
| Import named type     | `import type { A } from './b'` | `import { A } from './b'` |
| Index                 | `{ [A]: B }`                   | `{ [key: A]: B }` |
| Maybe                 | `?type`                        | `type \| null \| undefined` |
| Mixed                 | `mixed`                        | `unknown` |
| Type parameter bounds | `<A: string>`                  | `<A extends string>` |
| Variance              | `interface A { +b: B, -c: C }` | `interface A { readonly b: B, c: C }` |

### Utilities

|                | Flow                  | TypeScript |
|----------------|-----------------------|------------|
| Class          | `Class<A>`            | `typeof A` |
| Dependent type | `$ObjMap<T, F>`       | TODO |
| Difference     | `$Diff<A, B>`         | TODO |
| Element type   | `$ElementType<T, K>`  | `T[k]` |
| Exact          | `$Exact<A>`           | `A` |
| Keys           | `$Keys<A>`            | `keyof A` |
| Mapped tuple   | `$TupleMap<T, F>`     | TODO |
| Property type  | `$PropertyType<T, k>` | `T[k]` |
| ReadOnly       | `$ReadOnly<A>`        | `Readonly<A>` |
| Rest           | `$Rest<A, B>`         | `Exclude` |
| Return type    | `$Call<F>`            | `ReturnType` |
| Subtype        | `$Subtype<A>`         | `B extends A` |
| Values         | `$Values<A>`          | `A[keyof A]` |
<!-- | Exports        | `$Exports<A>`         | TODO | -->

### Not supported in TypeScript
| Type             | Flow                | TypeScript   | Notes |
|------------------|---------------------|--------------|------|
| Existential type | `*`                 | `any`        | https://github.com/Microsoft/TypeScript/issues/14466 |
| Opaque types     | `opaque type A = B` | `type A = B` | Not expressible |
| Supertype        | `$Supertype<A>`     | `any`        | https://github.com/Microsoft/TypeScript/issues/14520 |
