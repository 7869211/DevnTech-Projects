module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!some-module|another-module).+\\.js$'
  ]
};
