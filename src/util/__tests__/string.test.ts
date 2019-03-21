import { splitFixtureLines } from '../string';

test('splitLines() should ', () => {
  const code = `
    const foo = 3;
    // I'm a comment
    console.log(foo);

    //


    const bar = true;
    //strange comment

  `;
  const result = splitFixtureLines(code);

  expect(result).toHaveLength(3);
  expect(result[0]).toMatch('const foo = 3;');
  expect(result[1]).toMatch('console.log(foo);');
  expect(result[2]).toMatch('const bar = true');
});
