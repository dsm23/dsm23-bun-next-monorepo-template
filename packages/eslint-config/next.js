import next from "@next/eslint-plugin-next";
import { globalIgnores } from "eslint/config";
import { config as reactConfig } from "./react-internal.js";

export const config = [
  reactConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  next.configs["core-web-vitals"],
];
