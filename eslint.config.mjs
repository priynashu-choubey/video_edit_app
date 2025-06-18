import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Combine compat and new config
export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.config({
    rules: {
      // Disable base rule
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  }),
];
