import { defineConfig } from "oxlint";
import baseConfig from "#base";

export default defineConfig({
  extends: [baseConfig],
  plugins: ["jsx-a11y", "react"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/heading-has-content": "off",
    "oxc/no-async-await": "off",
    "oxc/no-rest-spread-properties": "off",
    "react/button-has-type": "off",
    // TODO: remove when it supports tsx
    "react/jsx-filename-extension": "off",
    "react/no-multi-comp": "off",
    "react/only-export-components": "off",
    // "react/only-export-components": [
    //   "warn",
    //   {
    //     allowExportNames: [
    //       "metadata",
    //       "viewport",
    //       "generateMetadata",
    //       "generateStaticParams",
    //       "dynamic",
    //       "revalidate",
    //       "fetchCache",
    //       "runtime",
    //       "preferredRegion",
    //     ],
    //   },
    // ],
    "react/react-in-jsx-scope": "off",
  },
});
