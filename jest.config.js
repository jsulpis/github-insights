module.exports = {
  testRegex: "(\\.|/)(test|spec)\\.(jsx?|js?|tsx?|ts?)$",
  transform: { "^.+\\.tsx?$": "babel-jest" },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleDirectories: ["node_modules", "."],
  collectCoverageFrom: [
    "components/**",
    "infrastructure/**",
    "pages/**",
    "!pages/_app.tsx",
    "!pages/_document.tsx",
    "!**/__tests__/**" // skip json files
  ],
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
