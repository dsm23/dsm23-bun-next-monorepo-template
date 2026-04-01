import { defineConfig } from "oxlint";
import reactConfig from "#react";

export default defineConfig({
  extends: [reactConfig],
  plugins: ["nextjs"],
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "storybook-static/**",
  ],
});
