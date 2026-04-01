import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/index.{ts,tsx}",
  dts: true,
  clean: true,
});
