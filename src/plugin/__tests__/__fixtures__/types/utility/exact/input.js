// @flow
type T = {
  p: ?number,
};

type ExactType = $Exact<T>;
type ExactTypeLiteral = $Exact<{
  name: string,
}>;
