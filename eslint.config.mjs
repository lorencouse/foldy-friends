const globals = require("globals");
const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const pluginReact = require("eslint-plugin-react");
const nextEslintConfig = require("eslint-config-next");

module.exports = {
  languageOptions: {
    globals: globals.browser,
    parser: tsParser,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:eslint-plugin-next-on-pages/recommended",
    "next",
    "next/core-web-vitals",
    "react-app",
  ],
  plugins: ["react", "@typescript-eslint", "eslint-plugin-next-on-pages"],
  rules: {
    // Add your custom rules here
  },
};
