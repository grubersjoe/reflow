# Reflow

> Babel plugin to transpile [Flow](https://flow.org/) types to
> [TypeScript](https://www.typescriptlang.org/) with CLI wrapper.

[![CircleCI](https://circleci.com/gh/grubersjoe/reflow.svg?style=shield)](https://circleci.com/gh/grubersjoe/reflow)
[![Coverage](https://coveralls.io/repos/github/grubersjoe/reflow/badge.svg?branch=master)](https://coveralls.io/github/grubersjoe/reflow?branch=master)

#### I would love to receive feedback whether this plugin worked for you :)!

Reflow enables you to migrate a whole Flow based project to TypeScript by
transpiling the Flow type annotations to equivalent TypeScript code. While this
reduces the effort to move a large code base to TypeScript drastically, it is
still very likely that you will face new type errors after the migration due to
the differences between Flow and TypeScript. See this
[repository](https://github.com/niieani/typescript-vs-flowtype) for an excellent
overview of the differences and similarities of Flow and Typescript.

## Why another plugin?

Of course, I am aware that other approaches exist to translate Flow to
TypeScript. For instance, there is
[Kiikurage/babel-plugin-flow-to-typescript](https://github.com/Kiikurage/babel-plugin-flow-to-typescript)
and
[Khan/flow-to-ts](https://github.com/Kiikurage/babel-plugin-flow-to-typescript).
When I started this project in the course of my master thesis in February 2019,
the development of the first plugin seemed inactive and the second one did not
exist yet. Therefore this plugin was developed to solve the given problem of the
thesis in practice.

**Advantages of Reflow**

- can be used either as standalone Babel plugin or through the included CLI to
  transpile whole code bases
- well tested with high code coverage
- proven to work with real React based projects (two code bases with 27 and 41
  kLOC respectively were successfully migrated)
- generates well formatted output based on Prettier with focus on placing
  comments at the correct position (Babel fails to do so)

## Installation

```
yarn add --dev babel-plugin-reflow
```

## Usage

### CLI

This package includes a small CLI wrapper for the Babel plugin to recursively
transpile whole directories or single files. Install the package as project
dependency and run `npx reflow` afterwards. Alternatively you might want to
install Reflow globally so you can simply type `reflow`:

```shell
yarn global add babel-plugin-reflow
```

Usage is as follows:

```shell
$ npx reflow --help

Usage: reflow [OPTION]... <FILES OR DIRECTORIES ...>

REFLOW - Flow to TypeScript converter

Options:
  -v                                Output the version number
  -d, --dry-run                     Perform a trial run printing to stdout instead of writing a file
  -e, --exclude-dirs <pattern ...>  Comma-separated list of directories to recursively exclude (default: ["node_modules"])
  -i, --include-pattern <pattern>   Set the glob pattern for input files (default: "**/*.{js,jsx}")
  -r, --replace                     Process files in-place instead of creating new TS files next to the original JS files
  -D, --replace-decorators          Replace class @decorators with wrapped function calls to avoid TypeScript errors (default: false)
  -h, --help                        Output ussage information

Examples:
  $ reflow --replace src/
  $ reflow -d -i '**/__tests__/**/*.{js,jsx}' src/
  $ reflow -exclude-patterns '**/__tests__/**/*','fixtures/*.js' src/
```

### Programmatically

TODO

### As Babel plugin

TODO

## Transformations

### Base types

Some Flow types are not equivalently expressible in TypeScript. See the list of
unsupported Flow features below.

| Type                    | Flow                           | TypeScript                           |
| ----------------------- | ------------------------------ | ------------------------------------ |
| Any type                | `any`                          | `any`                                |
| Array type              | `Array<number>`                | `Array<number>`                      |
| Boolean literal type    | `true`                         | `true`                               |
| Boolean type            | `boolean`                      | `boolean`                            |
| Empty type              | `empty`                        | `never`                              |
| Exact object type       | `{\| p: number \|}`            | `{ p: number }`                      |
| Function type           | `(string, {}) => number`       | `(p1: string, p2: {}) => number`     |
| Generic type annotation | `let v: <FlowType>`            | `let v: <TSType>`                    |
| Generics                | `type Generic<T: Super> = T`   | `type Generic<T extends Super> = T`  |
| Interface type          | `interface I { +p: number }`   | `interface I { readonly p: number }` |
| Intersection type       | `type Intersection = T1 & T2`  | `type Intersection = T1 & T2`        |
| Mixed type              | `mixed`                        | `unknown`                            |
| Null literal type       | `null`                         | `null`                               |
| Nullable type (Maybe)   | `?number`                      | `number \| null \| undefined`        |
| Number literal type     | `42`                           | `42`                                 |
| Number type             | `number`                       | `number`                             |
| Object type             | `{ [string]: number }`         | `{ [key: string]: number }`          |
| Opaque type             | `opaque type Opaque = number`  | `type Opaque = number`               |
| String literal type     | `'literal'`                    | `'literal'`                          |
| String type             | `string`                       | `string`                             |
| This type               | `this`                         | `this`                               |
| Tuple type              | `[Date, number]`               | `[Date, number]`                     |
| Type alias              | `type Type = <FlowType>`       | `type Type = <TSType>`               |
| Type casting            | `(t: T)`                       | `(t as T)`                           |
| Type exports / imports  | `import type T from './types'` | `import T from './types`             |
| Typeof type             | `typeof undefined`             | `undefined`                          |
| Union type              | `number \| null`               | `number \| null`                     |
| Void type               | `void`                         | `void`                               |

### Utility types

| Utility Type               | Flow                  | TypeScript                |
| -------------------------- | --------------------- | ------------------------- |
| Call                       | `$Call<F, T...>`      | `ReturnType<F>`           |
| Class                      | `Class<T>`            | `typeof T`                |
| Difference                 | `$Diff<A, B>`         | `Omit<A, keyof B>`        |
| Element type               | `$ElementType<T, K>`  | `T[k]`                    |
| Exact                      | `$Exact<T>`           | `T`                       |
| Existential type           | `*`                   | `any`                     |
| Keys                       | `$Keys<T>`            | `keyof T`                 |
| None maybe type            | `$NonMaybeType<T>`    | `NonNullable<T>`          |
| <s>Object map</s>          | `$ObjMap<T, F>`       | `any`                     |
| <s>Object map with key</s> | `$ObjMapi<T, F>`      | `any`                     |
| Property type              | `$PropertyType<T, k>` | `T[k]`                    |
| ReadOnly                   | `$ReadOnly<T>`        | `Readonly<T>`             |
| Rest                       | `$Rest<A, B>`         | `Omit<A, Union<keyof B>>` |
| Shape                      | `$Shape<T>`           | `Partial<T>`              |
| <s>Tuple map</s>           | `$TupleMap<T, F>`     | `any`                     |
| Values                     | `$Values<T>`          | `T[keyof T]`              |
| <s>Subtype</s>             | _deprecated_          | `any`                     |
| <s>Supertype</s>           | _deprecated_          | `any`                     |

<small><sup>\*</sup></small>

### Declarations

| Declaration | Flow                                  | TypeScript                                               |
| ----------- | ------------------------------------- | -------------------------------------------------------- |
| Class       | `declare class C {}`                  | `declare class C {}`                                     |
| Export      | `declare export default () => string` | `const _default: () => string; export default _default;` |
| Function    | `declare function f(number): any`     | `declare function f(p: number): any`                     |
| Interface   | `declare interface I {}`              | `declare interface I {}`                                 |
| Module      | `declare module 'esmodule' {}`        | `declare module 'esmodule' {}`                           |
| Type alias  | `declare type T = number`             | `declare type T = number`                                |
| Variable    | `declare var v: any`                  | `declare var v: any`                                     |

Unsupported: CommonJS export declarations.

---

### Unsupported Flow features / syntax

Some Flow features are not equivalently expressible in TypeScript. The Reflow
CLI will output a warning with the source code location, whenever one of the
following cases are encountered:

- **[Constructor return types](https://github.com/Microsoft/TypeScript/issues/11588)**

  TypeScript intentionally doesn't support return types for constructor
  functions. These will be removed by Reflow.

- **[Existential Type](https://github.com/Microsoft/TypeScript/issues/14466)**

  Flow's
  [existential type](https://flow.org/en/docs/types/utilities/#toc-existential-type)
  has been deprecated and should be avoided. Still Reflow supports it and will
  transform it to `any`.

- **[Function types with unnamed parameters](https://flow.org/en/docs/types/functions/#toc-function-types)**

  In contrast to TypeScript, parameter names can be omitted in Flow. Therefore
  Reflow inserts parameter names automatically (`p` for a single parameter and
  `p{i}` for multiple ones).

  ```
  type FunctionType = ({}, Date) => string;             // Flow
  type FunctionType = (p1: {}, p2: Date) => string;    // TypeScript
  ```

- **[Index signatures](https://flow.org/en/docs/types/objects/#toc-objects-as-maps)**

  Flow allows any type for keys in index signatures, but Typescript only accepts
  `string` or `number`. Reflow will add index signatures both for `string` and
  `number` if a different type is specified in Flow.

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

- **[Object type spread](https://flow.org/en/docs/types/objects/#toc-exact-object-types)**

  Object types can be spread into other object types in Flow. Unfortunately this
  syntax is not supported in TypeScript at the moment. Therefore, these
  properties will be ommited in output. Please fix affected object types
  manually.

  ```
  // Flow
  type ObjectWithSpread = {
    prop: mixed;
    ...ObjectType;
  };

  // TypeScript
  type ObjectWithSpread = {
    prop: unknown;
  };
  ```

- **[Opaque Type](https://github.com/Microsoft/TypeScript/issues/14520)**

  Opaque types are not supported in TypeScript and are transformed to an
  ordinary type alias.

  ```
  opaque type T = number;  // Flow
  type T = number;         // TypeScript
  ```

- **[Variance](https://github.com/Microsoft/TypeScript/issues/1394)**

  Flow's contravariance sigil `-` is not expressible in Typescript and will be
  omitted. However, TypeScript does support covariance for certain types (`+`
  becomes `readonly`).

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

  The `$Call<F, T...>` utility type is transformed to TypeScript's
  `ReturnType<F>`. Since this type only accepts the function type and not the
  function argument types, it is impossible to infer the return type of
  polymorphic functions. TypeScript will assume an `unknown` type then.

## Supported syntax

This Babel plugin enables a few other Babel plugins to support various kinds of
syntax:

- [Class properties](https://github.com/tc39/proposal-class-fields)
- [Decorators](https://github.com/tc39/proposal-decorators)
- [Dynamic imports](https://github.com/tc39/proposal-dynamic-import)
- [Nullish coalescence](https://github.com/tc39/proposal-nullish-coalescing)
- [Optional chaining](https://github.com/tc39/proposal-optional-chaining)
- [React](https://reactjs.org/)
- [JSX](https://reactjs.org/docs/introducing-jsx.html)

## Development

Clone this repository and install the project dependencies:

```
yarn install
```

There are various npm scripts for different tasks:

```
yarn build          # Create a production build
yarn dev            # Build in development mode and watch for changes
yarn format         # Format the code with Prettier
yarn lint           # Run ESLint
yarn test           # Run fixture tests
yarn test:coverage  # Run the tests with coverage report
yarn tsc            # Check the types (via TypeScript)
```
