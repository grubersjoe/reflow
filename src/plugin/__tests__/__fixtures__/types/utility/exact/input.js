// @flow
type TExact = {
  p: ?number,
};

type ExactType = $Exact<TExact>;
type ExactTypeLiteral = $Exact<{
  name: string,
}>;
