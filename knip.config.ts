import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],
  workspaces: {
    // ".": {
    //   ignoreBinaries: ["playwright"],
    // },
    // "apps/storybook": {
    //   entry: [".storybook/*.{ts,tsx}"],
    //   oxlint: {
    //     config: ["oxlint.config.ts"],
    //   },
    // },
    "apps/web": {
      entry: ["src/**/*.d.ts", "src/app/**/*.tsx"],
      oxlint: {
        config: ["oxlint.config.ts"],
      },
      // playwright: {
      //   config: ["playwright.config.ts", "playwright.prod.config.ts"],
      //   entry: ["playwright-tests/*.@(spec|test).?(c|m)[jt]s?(x)"],
      // },
    },
    "packages/oxlint-config": {
      entry: ["src/**/*.ts"],
      // ignoreDependencies: ["eslint-plugin-storybook"],
    },
    "packages/stylelint-config": {
      ignoreDependencies: [
        "stylelint-config-standard",
        "stylelint-order",
        "stylelint-selector-bem-pattern",
      ],
    },
    "packages/typescript-config": {
      entry: ["base.json", "nextjs.json", "react-library.json"],
      ignoreUnresolved: ["next"],
    },
    "packages/ui": {
      entry: ["src/**/index.{ts,tsx}"],
      ignoreDependencies: ["@turbo/gen"],
      ignoreFiles: ["turbo/**/*.{ts,tsx}"],
      oxlint: {
        config: ["oxlint.config.ts"],
      },
    },
  },
};

export default config;
