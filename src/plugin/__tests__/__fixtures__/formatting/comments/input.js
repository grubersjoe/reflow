// @flow
import styled from 'styled';

// Fixture file to test formatting
type P1 = Date;

// eslint-disable-line no-unused-vars
function m(x: number): ?number {
  const y = new Date(); // eslint-disable

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

const StyledComponent = styled.div`
  font-weight: 600;
  text-transform: 'uppercase'; /* a JS-in-CSS comment */

  a:hover {
    color: blue;
  }
`;

const doubleSlashString = 'http://www.w3.org/2000/svg';

// Muliple
// line comments
type P2 = number | null;
