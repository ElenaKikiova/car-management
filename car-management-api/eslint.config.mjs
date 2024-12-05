import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.js"],
		languageOptions: { sourceType: "commonjs" },
		rules: {
			indent: ["error", 4],
		},
	},
	{
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
];
