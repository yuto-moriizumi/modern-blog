/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
  },
  // ignorePatterns: 'graphql.ts',
};
module.exports = { config };
