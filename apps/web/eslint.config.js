import { config as nextConfig } from "@repo/eslint-config/next-js";
import { defineConfig } from "eslint/config";

const config = defineConfig(nextConfig);

export default config;
