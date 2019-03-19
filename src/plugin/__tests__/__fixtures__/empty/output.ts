
function emptyFunction(): never {
  throw new Error();
}

const emptyArrowFunction: () => never = () => {
  throw new Error();
};
