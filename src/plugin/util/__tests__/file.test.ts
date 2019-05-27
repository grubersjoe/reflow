import { splitFixtureLines } from '../file';

const inputCode = `
  // @flow

  // A comment at the top of the file
  // (over multiple lines)

  const foo = 3;
  // I'm a comment
  console.log(foo);

  /*
  block
  comment
  */

  function bar(x: boolean): ?Date {
    return x ? new Date() : null;
  }


  const baz = true;
  //strange comment
`;

test('splitFixtureLines() with default arguments', () => {
  const output = splitFixtureLines(inputCode, 'flow');

  const expectedLines = [
    'const foo = 3;',
    'console.log(foo);',
    'function bar(x: boolean): ?Date {',
    'return x ? new Date() : null;',
    '}',
    'const baz = true;',
  ];

  expect(output).toHaveLength(expectedLines.length);
  expectedLines.forEach((expectedLine, i) => expect(output[i]).toEqual(expectedLine));
});

test('splitFixtureLines() with format', () => {
  const output = splitFixtureLines(inputCode, 'flow', false);

  const expectedLines = [
    '// @flow',
    '',
    '// A comment at the top of the file',
    '// (over multiple lines)',
    '',
    'const foo = 3;',
    `// I'm a comment`,
    'console.log(foo);',
    '',
    '/*',
    'block',
    'comment',
    '*/',
    '',
    'function bar(x: boolean): ?Date {',
    'return x ? new Date() : null;',
    '}',
    '',
    '',
    'const baz = true;',
    '//strange comment',
    undefined, // Empty line will be trimmed
  ];

  expect(output).toHaveLength(expectedLines.length - 1); // Last line is trimmed
  expectedLines.forEach((expectedLine, i) => expect(output[i]).toEqual(expectedLine));
});
