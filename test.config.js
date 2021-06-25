

module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
    "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: "<rootDir>/src/setupEnzyme.ts",
    reporters: [
        "default",
        ["jest-sonar-reporter", { reportPath: "build/sonar-test", reportFile: "test.xml" }],
      ]

    }
