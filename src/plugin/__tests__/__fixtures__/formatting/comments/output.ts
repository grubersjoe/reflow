
// $FlowFixMe
import styled from 'styled';

// Fixture file to test formatting
type P1 = Date;

// eslint-disable-line no-unused-vars
function m(x: number): number | null | undefined {
  const y = new Date(); // eslint-disable

  /**
   * This is a multi-line
   * comment
   */

  return null;
}

// eslint-disable-next-line
interface Interface {
  // http://www.w3.org/2000/svg
  p: boolean; //comment without space
}

const StyledComponent = styled.div`
  font-weight: 600;
  text-transform: 'uppercase'; /* a CSS-in-JS comment */

  a:hover {
    color: blue;
  }
`;

const doubleSlashString = 'http://www.w3.org/2000/svg'; /* block comment */

// Muliple
// line comments
type P2 = number | null;
