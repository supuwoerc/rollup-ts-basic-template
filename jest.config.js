// https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
https: module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
