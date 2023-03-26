import FractavaNotes from "./components/FractavaNotes.vue";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default {
	install: function (app, options) {
		console.log(options);
		
		const vuetify = createVuetify();

		app.use(vuetify);

		// enable or disable debug output
		//options.store.commit("setDebug", options.debug, {module: "core" });

		// global Functions
		app.config.globalProperties.distance = function(coordinate1, coordinate2) {
			let a = coordinate1.x - coordinate2.x;
			let b = coordinate1.y - coordinate2.y;
			return Math.sqrt( a*a + b*b );
		};

		app.component("FractavaNotes", FractavaNotes);
	}
};
