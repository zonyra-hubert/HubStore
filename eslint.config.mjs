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
      // General rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
    },
    overrides: [
      {
        files: ["app/api/stripe/route.ts"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
      {
        files: ["app/api/uploadthing/core.ts"],
        rules: {
          "@typescript-eslint/no-unused-vars": "off",
        },
      },
      {
        files: ["**/components/ui/**/*.tsx"],
        rules: {
          "@typescript-eslint/no-empty-interface": "off",
        },
      },
    ],
  },
];

export default eslintConfig;
