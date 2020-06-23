import FractavaNotes from "./components/FractavaNotes.vue";

export default {
	install: function (Vue, options) {
        console.log(options);
        Vue.prototype.debug = options.debug;

		Vue.component("FractavaNotes", FractavaNotes);
	}
};
