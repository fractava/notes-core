import FractavaNotes from "./components/FractavaNotes.vue";

// Vuex Modules
import main from "./vuex/mainModule.js";
import sketchModule from "./vuex/sketchModule.js";

export default {
	install: function (Vue, options) {
        console.log(options);
        
        // register vuex modules
        options.store.registerModule('main', main);
        options.store.registerModule('sketch', sketchModule);

        // enable or disable debug output
        options.store.commit("setDebug", options.debug);
        
        // global Functions
        Vue.prototype.distance = function(coordinate1, coordinate2) {
			let a = coordinate1.x - coordinate2.x;
			let b = coordinate1.y - coordinate2.y;
			return Math.sqrt( a*a + b*b );
		}
        
		Vue.component("FractavaNotes", FractavaNotes);
	}
};
