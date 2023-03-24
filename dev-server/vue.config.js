module.exports = {
	devServer: {
		allowedHosts: "all"
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/notes-core/'
        : '/'
};