// @flow
function emptyFunction(): empty {
  throw new Error();
}

const emptyArrowFunction: () => empty = () => {
  throw new Error();
};
