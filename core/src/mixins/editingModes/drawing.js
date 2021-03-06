import { mapState } from "vuex";

export const drawing = {
	methods: {
		drawingPointerDown: function(event) {
			this.$store.commit("newSketch", this.selectedPencil.color, {module: "core" });

			if(this.shouldDrawLine(this.pointer.x, this.pointer.y, event)) {
				this.$store.commit("drawLine", {sketch: this.lastSketch, x: this.pointer.x, y: this.pointer.y, pressure: this.pointer.pressure}, {module: "core" });
			}

			this.$store.commit("closePencilSettings", {}, {module: "core" });
		},
		drawingPointerMove: function(event) {
			if(this.shouldDrawLine(this.pointer.x, this.pointer.y, event)) {
				this.$store.commit("drawLine", {sketch: this.lastSketch, x: this.pointer.x, y: this.pointer.y, pressure: this.pointer.pressure}, {module: "core" });
			}
		},
		drawingPointerUp: function() {

		},
		drawingPointerLeave: function() {

		},
		shouldDrawLine: function(x, y, /*event*/) {
			let drawLine = false;

			if(this.lastSketch.coordinates.length == 0) {
				// First Line of Sketch -> draw line
				if(this.debug) {
					console.log("first Line of Sketch");
				}
				drawLine = true;
			} else {
				let lastCoordinates = this.lastSketch.coordinates[this.lastSketch.coordinates.length -1];

				if(this.distance({x, y}, lastCoordinates) > 3) {
					// distance to last line > 3 -> draw line
					drawLine = true;
				}
			}
			if(!drawLine && this.debug) {
				console.log("skipping line");
			}

			return drawLine;
		},
	},
	computed: {
		...mapState({
			selectedColor: state => state.core.selectedColor,
		})
	},
};
