import { config as nextConfig } from "@repo/eslint-config/next-js";
import { defineConfig } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
const config = defineConfig(nextConfig, {
  rules: {
    "turbo/no-undeclared-env-vars": [
      "error",
      {
        allowList: ["NODE_ENV"],
      },
    ],
  },
});

export default config;
