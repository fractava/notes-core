module.exports = {
	devServer: {
      allowedHosts: "all",
      host: '0.0.0.0',
      client: {
        webSocketURL: 'auto://0.0.0.0:0/ws',
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/notes-core/'
        : '/'
};