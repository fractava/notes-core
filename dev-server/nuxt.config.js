export default {
	target: "static",
	head: {
		title: "dev-server",
		meta: [
			{ charset: "utf-8", },
			{ name: "viewport", content: "width=device-width, initial-scale=1", },
			{ hid: "description", name: "description", content: "", },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico", },
		],
	},
	css: [
	],
	plugins: [
    { src: "~/plugins/core.js", mode: 'client' },
	],
	components: true,
	buildModules: [
		"@nuxtjs/eslint-module",
		"@nuxtjs/stylelint-module",
	],
	modules: [
		"@nuxtjs/pwa",
	],
	pwa: {
		manifest: {
			lang: "en",
		},
	},
	build: {
	},
};
