module.exports = {
    verbose: true,
    testTimeout: 10000,
    collectCoverage: true,
    reporters: [ "default", "jest-junit" ],
    coverageReporters: [
        "text",
        "cobertura",
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/tests/',
    ],
    collectCoverageFrom: [
        "**/*.ts",
        "!**/*.controller.ts",
        "!**/*.router.ts",
        "!**/*forbidden.error.ts",
        "!**/*index.ts"
    ],
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|js)$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
