import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "no-unused-vars": "error", "no-undef": "error"   },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
