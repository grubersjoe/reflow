# Reflow

> [Babel](https://babeljs.io/) plugin to transpile [Flow](https://flow.org/) typed JavaScript code
> to [TypeScript](https://www.typescriptlang.org/).

[![CircleCI](https://circleci.com/gh/grubersjoe/reflow.svg?style=shield)](https://circleci.com/gh/grubersjoe/reflow)
[![Coverage](https://coveralls.io/repos/github/grubersjoe/reflow/badge.svg?branch=master)](https://coveralls.io/github/grubersjoe/reflow?branch=master)

**This is still in an early stage and may break anytime!**

Reflow enables you to migrate a whole Flow based project to TypeScript by transpiling the Flow type
annotations to equivalent TypeScript code. While this should reduce the effort to move a large code
base to TypeScript drastically, it is still likely that you will need to _manually_ fix new type
errors afterwards. This program helps you with the tedious task to convert Flow syntax to
TypeScript, but it can not magically fix type errors which occur after the migration.

There are many possible reasons why you will probably face new type errors after executing this
tool:

- TypeScript is in certain aspects per se stricter than Flow (e. g. TS handles all objects as _exact
  objects_ per default, Flow does not).
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) contains type definitions
  for far more libraries and frameworks than [Flow Typed](https://github.com/flow-typed/flow-typed).
  So when you install type definitions, it is likely that this will reveal previously undetected
  errors.
- We have experienced that TypeScript seems to be able to infer more types, when using certain
  libraries and their external type definitions (e. g. React components in combination with
  [Styled Components](https://www.styled-components.com/))
- The previously used Flow types _may_ prove to be inaccurate

See this [repository](https://github.com/niieani/typescript-vs-flowtype) for an excellent overview
of the differences and similarities of Flow and Typescript.

## Installation

```
yarn add --dev TBA
```

## Usage

### CLI

Install the package as project dependency and run `npx reflow` afterwards. Alternatively you might
want to install Reflow globally so you can simply type `reflow`:

```shell
yarn global add TBA
```

Usage is as follows:

```shell
Usage: reflow [OPTION]... <FILES OR DIRECTORIES ...>

Reflow

Options:
  -V, --version                    output the version number
  -d, --dry-run                    perform a trial run printing to stdout instead of writing a file
  -e, --exclude-dirs <dirs ...>    list of recursively excluded directories (default: ["node_modules"])
  -i, --include-pattern <pattern>  set the glob pattern for input files (default: "**/*.{js,jsx}")
  -r, --replace                    process files in-place. A new TS file will be created next to the original file otherwise.
  -D, --replace-decorators         replace class @decorators with wrapped function calls to avoid TypeScript errors
  -h, --help                       output usage information

Examples:
  $ reflow --replace src/
  $ reflow -d -i '**/__tests__/**/*.{js,jsx} src/
  $ reflow -exclude-patterns '**/__tests__/**/*','fixtures/*.js' src/lib/
```

### Programmatically

TODO

### As Babel plugin (not recommended)

TODO

## Transformations

### Base types

The following examples have been chosen to show some of the syntax differences between Flow and
TypeScript. Most syntax is similiar, but there are differences and also certain edge cases, which
need to be handled while transpiling the types. A few types are not equivalently expressible in
TypeScript and will result in a small loss of type information. See the list of unsupported Flow
features in TypeScript below.

| Type                    | Flow                           | TypeScript                          |
| ----------------------- | ------------------------------ | ----------------------------------- |
| Array type              | `Array<number>`                | `Array<number>`                     |
| Boolean literal type    | `true`                         | `true`                              |
| Boolean type            | `boolean`                      | `boolean`                           |
| Empty type              | `empty`                        | `never`                             |
| Exact object type       | `{\| p: number \|}`            | `{ p: number }`                     |
| Function type           | `(string, {}) => number`       | `(p1: string, p2: {}) => number`    |
| Generic type annotation | `let v: <FlowType>`            | `let v: <TSType>`                   |
| Generics                | `type Generic<T: Super> = T`   | `type Generic<T extends Super> = T` |
| Interface type          | `interface { +p: number }`     | `interface { readonly p: number }`  |
| Intersection type       | `type Intersection = T1 & T2`  | `type Intersection = T1 & T2`       |
| Mixed type              | `mixed`                        | `unknown`                           |
| Null literal type       | `null`                         | `null`                              |
| Nullable type (Maybe)   | `?number`                      | `number \| null \| undefined`       |
| Number literal type     | `42`                           | `42`                                |
| Number type             | `number`                       | `number`                            |
| Object type             | `{ [string]: number }`         | `{ [key: string]: number }`         |
| Opaque type             | `opaque type Opaque = number`  | `type Opaque = number`              |
| String literal type     | `'literal'`                    | `'literal'`                         |
| String type             | `string`                       | `string`                            |
| This type               | `this`                         | `this`                              |
| Tuple type              | `[Date, number]`               | `[Date, number]`                    |
| Type alias              | `type Type = <FlowType>`       | `type Type = <TSType>`              |
| Type casting            | `(t: T)`                       | `(t as T)`                          |
| Type exports / imports  | `import type T from './types'` | `import T from './types`            |
| Typeof type             | `typeof undefined`             | `undefined`                         |
| Union type              | `number \| null`               | `number \| null`                    |
| Void type               | `void`                         | `void`                              |

### Utility types

| Utility Type        | Flow                  | TypeScript         |
| ------------------- | --------------------- | ------------------ |
| Call                | `$Call<F, T...>`      | `ReturnType<F>`    |
| Class               | `Class<T>`            | `typeof T`         |
| Difference          | `$Diff<A, B>`         | `Omit<A, keyof B>` |
| Element type        | `$ElementType<T, K>`  | `T[k]`             |
| Exact               | `$Exact<T>`           | `T`                |
| Existential type    | `*`                   | `any`              |
| Keys                | `$Keys<T>`            | `keyof T`          |
| None maybe type     | `$NonMaybeType<T>`    | `NonNullable<T>`   |
| Object map          | `$ObjMap<T, F>`       | –                  |
| Object map with key | `$ObjMapi<T, F>`      | –                  |
| Property type       | `$PropertyType<T, k>` | `T[k]`             |
| ReadOnly            | `$ReadOnly<T>`        | `Readonly<T>`      |
| Rest                | `$Rest<A, B>`         | –                  |
| Shape               | `$Shape<T>`           | `Partial<T>`       |
| Tuple map           | `$TupleMap<T, F>`     | TODO               |
| Values              | `$Values<T>`          | `T[keyof T]`       |
| <s>Subtype</s>      | _deprecated_          |                    |
| <s>Supertype</s>    | _deprecated_          |                    |

<small><sup>\*</sup> </small>

### Declarations

| Declaration              | Flow                                  | TypeScript                                               |
| ------------------------ | ------------------------------------- | -------------------------------------------------------- |
| Declare ES module export | `declare export default () => string` | `const _default: () => string; export default _default;` |
| Declare class            | `declare class C {}`                  | `declare class C {}`                                     |
| Declare function         | `declare function f(number): any`     | `declare function f(p: number): any`                     |
| Declare interface        | `declare interface I {}`              | `declare interface I {}`                                 |
| Declare module           | `declare module 'esmodule' {}`        | `declare module 'esmodule' {}`                           |
| Declare module statement | `declare var v: string`               | `var v: string`                                          |
| Declare type alias       | `declare type T: number`              | `declare type T = number`                                |
| Declare variable         | `declare var v: any`                  | `declare var v: any`                                     |

Unsupported: CommonJS export declarations.

---

### Unsupported Flow features / syntax

The following Flow features are not equivalently expressible in TypeScript and need to be handled
differently:

- **[Constructor return types](https://github.com/Microsoft/TypeScript/issues/11588)**

  TypeScript intentionally doesn't support return types for constructor functions. These will be
  removed by Reflow.

- **[Existential Type](https://github.com/Microsoft/TypeScript/issues/14466)**

  Flow's [existential type](https://flow.org/en/docs/types/utilities/#toc-existential-type) has been
  deprecated and should be avoided. Still Reflow supports it and will transform it to `any`.

- **[Function types with unnamed parameters](https://flow.org/en/docs/types/functions/#toc-function-types)**

  In contrast to TypeScript, parameter names can be omitted in Flow. Therefore Reflow inserts
  parameter names automatically (`p` for a single parameter and `p{i}` for multiple ones).

  ```
  type FunctionType = ({}, Date) => string;             // Flow
  type FunctionType = (p1: {}, p2: Date) => string;    // TypeScript
  ```

- **[Index signatures](https://flow.org/en/docs/types/objects/#toc-objects-as-maps)**

  Flow allows any type for keys in index signatures, but Typescript only accepts `string` or
  `number`. Reflow will add index signatures both for `string` and `number` if a different type is
  specified in Flow.

  ```
  // Flow
  declare type KeyType;
  interface I = {
    [key: KeyType]: number
  }

  // TypeScript
  interface I = {
    [key: number]: number;
    [key: string]: number;
  }
  ```

- **[Opaque Type](https://github.com/Microsoft/TypeScript/issues/14520)**

  Opaque types are not supported in TypeScript and are transformed to an ordinary type alias.

  ```
  opaque type T = number;  // Flow
  type T = number;         // TypeScript
  ```

- **[Variance](https://github.com/Microsoft/TypeScript/issues/1394)**

  Flow's contravariance sigil `-` is not expressible in Typescript and will be omitted. However,
  TypeScript does support covariance for certain types (`+` becomes `readonly`).

  ```
  // Flow
  interface I {
    +covariant: any;
    -contravariant: any;
  }

  // TypeScript
  interface I {
    readonly covariant: any;
    contravariant: any;
  }
  ```

- **\$Call<F, T...>**

  The `$Call<F, T...>` utility type is transformed to TypeScript's `ReturnType<F>`. Because this
  type only takes the function type and not also the function argument types, it is impossible to
  infer the return type of polymorphic functions. TypeScript assumes an `unknown` type then.

## Supported syntax

This Babel plugin has built-in support for

- React
- JSX
- Class properties (proposal)
- Dynamic imports (proposal)
- Decorators (proposal)

## Development

Clone this repository and install the project dependencies:

```
yarn install
```

There are various npm scripts for different tasks:

```
yarn build          # Create a production build
yarn format         # Format the code with Prettier
yarn dev            # Build in development mode and watch for changes
yarn lint           # Run ESLint
yarn test           # Run fixture tests
yarn test:coverage  # Run the tests with coverage report
yarn typecheck      # Check the types (via TypeScript)
```
