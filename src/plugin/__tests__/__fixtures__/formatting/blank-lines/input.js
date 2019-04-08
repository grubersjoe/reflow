//@flow
// Fixture file to test formatting
type P1 = Date;

function m(x: number): ?number {
  const y = new Date();

  /**
   * This is a multi-line
   * comment
   */

  return null;
}

// eslint-disable-next-line
interface Interface {
  p: boolean;
}


type P2 = number | null;
