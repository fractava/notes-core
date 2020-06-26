import FractavaNotes from "./components/FractavaNotes.vue";

export default {
	install: function (Vue, options) {
        console.log(options);

        // enable or disable debug output
        console.log(options.debug);
        options.store.commit("setDebug", options.debug, {module: 'core' });
        
        // global Functions
        Vue.prototype.distance = function(coordinate1, coordinate2) {
			let a = coordinate1.x - coordinate2.x;
			let b = coordinate1.y - coordinate2.y;
			return Math.sqrt( a*a + b*b );
		}
        
		Vue.component("FractavaNotes", FractavaNotes);
	}
};
