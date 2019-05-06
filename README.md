# Reflow

> Babel Plugin to automatically migrate a [Flow JS](https://flow.org/) typed JavaScript code base to
> [TypeScript](https://www.typescriptlang.org/).

**Careful: this is still work in progress!**

[![Coverage Status](https://coveralls.io/repos/github/grubersjoe/reflow/badge.svg?branch=master)](https://coveralls.io/github/grubersjoe/reflow?branch=master)

This package transforms your Flow JS type annotations to equivalent TypeScript code. While this
should reduce the effort to migrate a large code base to TypeScript drastically, you will most
likely still need to manually fix and refactor the resulting code. After the transformation new type
errors will probably occur and existing type annotations _may_ prove to be inaccurate. This program
helps you with the tedious task to rewrite the syntax, but it can't magically fix semantic problems
obviously.

The type system of TypeScript and Flow share a lot of similarities but still there are some
fundamental and many subtle differences. See this excellent repository for a detailed
[comparison](https://github.com/niieani/typescript-vs-flowtype) and good overview. One major
difference for example is the purely structural type system of TypeScript versus the partly nominal
one used in Flow JS.

## Installation

```
yarn add --dev babel-reflow
```

## Usage

### CLI

Install the package as project dependency and run `npx reflow` afterwards. Alternatively you might
want to install Reflow globally so you can simply type `reflow`:

```shell
yarn global add babel-reflow
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
  -v, --verbose                    increase verbosity
  -h, --help                       output usage information

Examples:
  $ reflow --write src/
  $ reflow -exclude-patterns '**/__tests__/**/*','mocks/*.js' src/lib/

```

### Programmatically

TODO

### As Babel plugin (not recommended)

This is probably a bad idea. Please don't do that.

## Transformations

### Base types

The following examples have been chosen to show some of the syntax differences between Flow and
TypeScript. Bold types need to be transformed, the ones with a warning sign can't be expressed
completely equivalently in TypeScript and will result in a loss of (some) type information. See the
list of unsupported Flow features in TypeScript below. Some type annotations don't require any
transformation, since they share the same syntax in Flow and TypeScript.

| Done               | Type                         | Flow                                  | TypeScript                                    |
| ------------------ | ---------------------------- | ------------------------------------- | --------------------------------------------- |
| :white_check_mark: | Array type                   | `Array<number>`                       | `Array<number>`                               |
| :white_check_mark: | Boolean literal type         | `true`                                | `true`                                        |
| :white_check_mark: | Boolean type                 | `boolean`                             | `boolean`                                     |
| :white_check_mark: | **Empty type**               | `empty`                               | `never`                                       |
| :white_check_mark: | **Exact object type**        | `{\| p: number \|}`                   | `{ p: number }`                               |
| :white_check_mark: | **Function type**            | `(string, boolean) => number`         | `(p1: string, p2: boolean) => number`         |
| :white_check_mark: | Generic type annotation      | `let v: <FlowType>`                   | `let v: <TSType>`                             |
| :white_check_mark: | **Generics**                 | `type Generic<T: SuperClass> = T`     | `type Generic<T extends SuperClass> = T`      |
| :white_check_mark: | **Interface type** :warning: | `interface { +p1: number, p2: null }` | `interface { readonly p1: number, p2: null }` |
| :white_check_mark: | Intersection type            | `type Intersection = T1 & T2`         | `type Intersection = T1 & T2`                 |
| :white_check_mark: | **Mixed type**               | `mixed`                               | `unknown`                                     |
| :white_check_mark: | Null literal type            | `null`                                | `null`                                        |
| :white_check_mark: | **Nullable type** = Maybe    | `?number`                             | `number \| null \| undefined`                 |
| :white_check_mark: | Number literal type          | `42`                                  | `42`                                          |
| :white_check_mark: | Number type                  | `number`                              | `number`                                      |
| :white_check_mark: | **Module exports / imports** | `import type T from './types'`        | `import T from './types`                      |
| :white_check_mark: | **Object type**              | `{ [string]: number }`                | `{ [key: string]: number }`                   |
| :white_check_mark: | **Opaque type** :warning:    | `opaque type Opaque = number`         | `type Opaque = number`                        |
| :white_check_mark: | String literal type          | `'literal'`                           | `'literal'`                                   |
| :white_check_mark: | String type                  | `string`                              | `string`                                      |
| :white_check_mark: | This type                    | `this`                                | `this`                                        |
| :white_check_mark: | Tuple type                   | `[Date, number]`                      | `[Date, number]`                              |
| :white_check_mark: | **Type alias**               | `type Type = <FlowType>`              | `type Type = <TSType>`                        |
| :white_check_mark: | **Type casting**             | `(t: T)`                              | `(t as T)`                                    |
| :white_check_mark: | **Typeof type**              | `typeof undefined`                    | `undefined`                                   |
| :white_check_mark: | Union type                   | `number \| null`                      | `number \| null`                              |
| :white_check_mark: | Void type                    | `void`                                | `void`                                        |

### Utility types

| Done               | Utility Type                   | Flow                  | TypeScript    |
| ------------------ | ------------------------------ | --------------------- | ------------- |
| :construction:     | Call                           | `$Call<F, T...>`      | TODO          |
| :white_check_mark: | Class                          | `Class<T>`            | `typeof T`    |
| :construction:     | Difference                     | `$Diff<A, B>`         | TODO          |
| :construction:     | Element type                   | `$ElementType<T, K>`  | `T[k]`        |
| :construction:     | Exact                          | `$Exact<T>`           | `T`           |
| :white_check_mark: | **Existential type** :warning: | `*`                   | `any`         |
| :construction:     | Keys                           | `$Keys<T>`            | `keyof T`     |
| :construction:     | None maybe type                | `$NonMaybeType<T>`    | TODO          |
| :construction:     | Object map                     | `$ObjMap<T, F>`       | TODO          |
| :construction:     | Object map with key            | `$ObjMapi<T, F>`      | TODO          |
| :construction:     | Property type                  | `$PropertyType<T, k>` | `T[k]`        |
| :construction:     | Tuple map                      | `$TupleMap<T, F>`     | TODO          |
| :white_check_mark: | ReadOnly                       | `$ReadOnly<T>`        | `Readonly<T>` |
| :construction:     | Rest                           | `$Rest<A, B>`         | `Exclude`     |
| :construction:     | Return type                    | `$Call<F>`            | `ReturnType`  |
| :construction:     | Shape                          | `$Shape<T>`           | TODO          |
| :construction:     | Values                         | `$Values<T>`          | `T[keyof T]`  |
|                    | <s>Subtype</s>                 | _deprecated_          |               |
|                    | <s>Supertype</s>               | _deprecated_          |               |

### Declarations

| Done               | Declaration                        | Flow                                         | TypeScript                                               |
| ------------------ | ---------------------------------- | -------------------------------------------- | -------------------------------------------------------- |
| :white_check_mark: | Declare class                      | `declare class C {}`                         | `declare class C {}`                                     |
| :white_check_mark: | **Declare function**               | `declare function f(number): any`            | `declare function f(p: number): any`                     |
| :white_check_mark: | Declare interface                  | `declare interface I {}`                     | `declare interface I {}`                                 |
| :white_check_mark: | Declare module                     | `declare module 'esmodule' {}`               | `declare module 'esmodule' {}`                           |
| :white_check_mark: | **Declare module statement**       | `declare var varInModuleDeclaration: string` | `var varInModuleDeclaration: string`                     |
| :white_check_mark: | **Declare ES module export**       | `declare export default () => string`        | `const _default: () => string; export default _default;` |
| :construction:     | **Declare CommonJS module export** | `TODO`                                       | TODO                                                     |
| :white_check_mark: | **Declare type alias**             | `declare type T: number`                     | `declare type T = number`                                |
| :white_check_mark: | Declare variable                   | `declare var v: any`                         | `declare var v: any`                                     |

---

### Unsupported FlowJS features / syntax

The following Flow JS features are currently not supported in TypeScript:

- [Constructor return types](https://github.com/Microsoft/TypeScript/issues/11588)

  TypeScript intentionally doesn't support return types for constructor functions. These will be
  removed by Reflow.

- [Existential Type](https://github.com/Microsoft/TypeScript/issues/14466)

  `*` becomes `any`.

- [Function types with unnamed parameters](https://flow.org/en/docs/types/functions/#toc-function-types)

  In contrast to TypeScript, parameter names can be omitted in Flow (`({}, Date) => boolean`).
  Therefore Reflow inserts parameter names automatically (`p` for a single parameter and `p{i}` for
  multiple ones): `(p1: {}, p2: Date) => boolean`.

- Index signatures

  `{ [string]: number }`

  Flow allows any type for keys in index signatures, but Typescript only accepts `string` or
  `number`. Reflow will add index signatures both for `string` and `number` if a different type is
  specified in Flow.

- [Opaque Type](https://github.com/Microsoft/TypeScript/issues/14520)

  `opaque type T` is transformed to a plain type alias.

- [Variance](https://github.com/Microsoft/TypeScript/issues/1394)

  `interface I { -contravariant: any; } => interface I { contravariant: any }`

  Flow's contravariance sigil (`-`) is not expressible in Typescript. However, TypeScript does
  support covariance for certain type (`+` becomes `readonly`).
