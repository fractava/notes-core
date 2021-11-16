export const isMountedMixin = {
	mounted() {
		this.isMounted = true;
	},
	data: function() {
		return {
			isMounted: false,
		};
	},
};