export default {
  displayName: "my-package",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/dist/"],
};
