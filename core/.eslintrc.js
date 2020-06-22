module.exports = {
	"env": {
		"browser": true,
		"es2020": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential"
	],
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"vue/no-use-v-if-with-v-for": ["warn"],
	}
};
