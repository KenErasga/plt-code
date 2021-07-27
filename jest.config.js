module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|js)",
      "**/?(*.)+(spec).+(ts|js)"
    ],
    "transform": {
      "^.+\\.(ts)$": "ts-jest"
    },
  }