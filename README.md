# Overflow

Babel Plugin to transform Flow typed JavaScript to TypeScript (*WIP*).

## TODO

### Same syntax

| Prio  | Type        | Flow               | TypeScript |
|-------|-------------|--------------------|------------|
|       | Null        | `null`             | `null` |
|       | Undefined   | `typeof undefined` | `undefined` |
|       | Void        | `void`             | `void` |

### Different syntax

| Prio  | Type                  | Flow                           | TypeScript |
|-------|-----------------------|--------------------------------|------------|
|       | Casting               | `(a: A)`                       | `(a as A)` |
|       | Exact type            | `{| a: A |}`                   | `{ a: A }` |
|       | Function              | `(A, B) => C`                  | `(a: A, b: B) => C` |
|       | Import default type   | `import type A from './b'`     | `import A from './b'` |
|       | Import named type     | `import type { A } from './b'` | `import { A } from './b'` |
|       | Index                 | `{ [A]: B }`                   | `{ [key: A]: B }` |
|       | Maybe                 | `?type`                        | `type | null | undefined` |
|       | Mixed                 | `mixed`                        | `unknown` |
|       | Type parameter bounds | `<A: string>`                  | `<A extends string>` |
|       | Variance              | `interface A { +b: B, -c: C }` | `interface A { readonly b: B, c: C }` |

### Utilities

| Prio |                | Flow                  | TypeScript |
|------|----------------|-----------------------|------------|
|      | Class          | `Class<A>`            | `typeof A` |
|      | Dependent type | `$ObjMap<T, F>`       | TODO |
|      | Difference     | `$Diff<A, B>`         | TODO |
|      | Element type   | `$ElementType<T, K>`  | `T[k]` |
|      | Exact          | `$Exact<A>`           | `A` |
|      | Keys           | `$Keys<A>`            | `keyof A` |
|      | Mapped tuple   | `$TupleMap<T, F>`     | TODO |
|      | Property type  | `$PropertyType<T, k>` | `T[k]` |
|      | ReadOnly       | `$ReadOnly<A>`        | `Readonly<A>` |
|      | Rest           | `$Rest<A, B>`         | `Exclude` |
|      | Return type    | `$Call<F>`            | `ReturnType` |
|      | Subtype        | `$Subtype<A>`         | `B extends A` |
|      | Values         | `$Values<A>`          | `A[keyof A]` |

### Not supported in TypeScript
| Type             | Flow                | TypeScript    | Notes |
|------------------|---------------------|---------------|------|
| Existential type | `*`                 | `any`         | https://github.com/Microsoft/TypeScript/issues/14466 |
| Opaque types     | `opaque type A = B` | `type A 1= B` | Not expressible |
| Supertype        | `$Supertype<A>`     | `any`         | https://github.com/Microsoft/TypeScript/issues/14520 |
