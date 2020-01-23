module.exports = {
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules/',
    'components/Icon/',
    'utils/.*-mock.js$',
    'src/setupTests.js',
    'src/tempPollyfills.js',
  ],
  moduleNameMapper: {
    '^.+\\.(css)$': '<rootDir>/src/utils/empty-mock.js',
    '^.+\\.(svg)$': '<rootDir>/src/utils/svg-mock.js',
  },
  testRegex: '(/src/.*/tests/.*|\\.(test|spec))\\.(js|json|node|ts|tsx)$',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/localstorage-mock.js'],
  setupFiles: ['<rootDir>/src/setupTests.js'],
};
