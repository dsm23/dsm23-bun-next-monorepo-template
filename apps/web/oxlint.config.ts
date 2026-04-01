import nextConfig from "@repo/oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nextConfig],
  ignorePatterns: ["coverage/**"],
  env: {
    browser: true,
    node: true,
    serviceworker: true,
    worker: true,
  },
});
