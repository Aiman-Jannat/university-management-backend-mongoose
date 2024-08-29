import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    ignores:["./node_modules","./dist"],
    rules: {
      "no-unused-vars":"error",
      "no-undef":"error",
      "no-console":"warn",
      "no-unused-expressions":"error",
    },
    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];