import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Standalone CommonJS maintenance script, run by hand and not part of the
      // app source or the build. package.json declares no "type": "module", so
      // require() is correct there; next/typescript's no-require-imports rule is
      // written for the TS app code and does not apply to it.
      "compress.js",
    ],
  },
];

export default eslintConfig;
