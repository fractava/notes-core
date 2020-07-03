import FractavaNotes from "./components/FractavaNotes.vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import VueQuillEditor from "vue-quill-editor";
console.log(VueQuillEditor);
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

export default {
	install: function (Vue, options) {
		console.log(options);

		Vue.use(VueQuillEditor, /* { default global options } */);

		Vue.use(VueMaterial);

		// enable or disable debug output
		console.log(options.debug);
		options.store.commit("setDebug", options.debug, {module: "core" });

		// global Functions
		Vue.prototype.distance = function(coordinate1, coordinate2) {
			let a = coordinate1.x - coordinate2.x;
			let b = coordinate1.y - coordinate2.y;
			return Math.sqrt( a*a + b*b );
		};

		Vue.component("FractavaNotes", FractavaNotes);
	}
};
