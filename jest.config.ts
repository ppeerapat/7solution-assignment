export default {
  projects: ["<rootDir>/packages/*", "<rootDir>/apps/*"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  coverageDirectory: "./coverage",
};
