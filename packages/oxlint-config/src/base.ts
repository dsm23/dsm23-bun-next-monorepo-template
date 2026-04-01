import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "oxc", "promise", "typescript", "unicorn", "vitest"],
  categories: {
    correctness: "warn",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
    restriction: "warn",
    nursery: "warn",
  },
  ignorePatterns: ["dist/**"],
  options: {
    typeAware: true,
  },
  rules: {
    "max-lines": "off",
    "max-lines-per-function": [
      "warn",
      {
        max: 200,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    "no-warning-comments": "off",
    "no-inline-comments": "off",
    "no-undefined": "off",
    "no-void": [
      "warn",
      {
        allowAsStatement: true,
      },
    ],
    "no-console": [
      "warn",
      {
        allow: ["debug", "error", "info", "trace", "warn"],
      },
    ],
    "no-empty-function": ["warn", { allow: ["arrowFunctions"] }],
    "no-negated-condition": "off",
    "no-optional-chaining": "off",
    "typescript/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: false,
        fixStyle: "separate-type-imports",
        prefer: "type-imports",
      },
    ],
    "typescript/explicit-function-return-type": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/no-confusing-void-expression": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/strict-boolean-expressions": "off",
    "unicorn/filename-case": [
      "warn",
      {
        case: "camelCase",
      },
    ],
    "vitest/consistent-vitest-vi": "warn",
    "vitest/no-conditional-expect": "off",
    "vitest/no-conditional-in-test": "off",
    "vitest/no-importing-vitest-globals": "off",
    "vitest/no-standalone-expect": [
      "warn",
      {
        additionalTestBlockFunctions: ["fc.property"],
      },
    ],
  },
});
