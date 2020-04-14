/*
  for some reason the globals part was causing the tests to be unable
  to render react components.
*/

module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.(test).(ts|tsx)"],
  coveragePathIgnorePatterns: ["/node_modules/", "enzyme.js"],
  setupFilesAfterEnv: ["<rootDir>/enzyme.js"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^~/services/firebase": "<rootDir>/__mocks__/firebaseMock.js",
    "^~/services/graphql/mutations": "<rootDir>/__mocks__/mutationsMock.js",
    "^~/services/graphql/queries": "<rootDir>/__mocks__/queriesMock.js",
    "^~/services/ErrorLogger": "<rootDir>/__mocks__/errorLoggerMock.js",
  },
};