module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "roots": [
    "<rootDir>/src"
  ],
  moduleNameMapper: {
    '^@adapter/(.*)$':  '<rootDir>/src/adapter/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@core/(.*)$':  '<rootDir>/src/core/$1',
    '^@domain/(.*)$':  '<rootDir>/src/domain/$1',
    '^@infra/(.*)$':  '<rootDir>/src/infra/$1'
  }
};
