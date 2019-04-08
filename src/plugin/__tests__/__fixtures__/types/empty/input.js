// @flow
type EmptyAlias = empty;

function emptyFunction(): empty {
  throw new Error();
}

const emptyArrowFunction: () => empty = () => {
  throw new Error();
};
