module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testRegex: "(\\.|/)(test|spec)\\.(jsx?|js?|tsx?|ts?)$",
  transform: { "^.+\\.tsx?$": "babel-jest" },
  testPathIgnorePatterns: [".next/", "node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/components/**",
    "src/lambdas/**",
    "src/pages/**",
    "!src/pages/_app.tsx",
    "!src/pages/_document.tsx"
  ],
  moduleNameMapper: {
    "\\.module\\.(css|scss)$": "identity-obj-proxy"
  }
};
