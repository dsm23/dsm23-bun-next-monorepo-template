import reactConfig from "@repo/oxlint-config/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [reactConfig],
  ignorePatterns: ["coverage/**"],
  env: {
    browser: true,
    node: true,
    serviceworker: true,
    worker: true,
  },
});
