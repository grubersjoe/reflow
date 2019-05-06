module.exports = {
  coverageDirectory: '.coverage',
  coverageReporters: ['lcov', 'text'],
  preset: 'ts-jest',
  rootDir: '.',
  testRegex: 'src/.*/__tests__/.*.test.ts$',
};
