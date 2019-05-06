module.exports = {
  coverageDirectory: 'plugin/__tests__/__coverage__/',
  coverageReporters: ['lcov', 'text'],
  preset: 'ts-jest',
  rootDir: 'src/',
  testRegex: '/__tests__/.*.test.ts$',
};
