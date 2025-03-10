module.exports = {
extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
],
parser: "@typescript-eslint/parser",
plugins: ["@typescript-eslint"],
parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
    jsx: true
    }
}
};

