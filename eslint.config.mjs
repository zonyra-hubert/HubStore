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
    rules: {
      // Disable unused variable warning for variables like setSorting
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Allow empty object type interfaces
      "@typescript-eslint/no-empty-interface": "off", // This is the correct rule for interface issues
      "@typescript-eslint/no-empty-object-type": "off", // Also disable if used in your config
    },
  },
];

export default eslintConfig;
