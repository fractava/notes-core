<template>
	<div class="zoomedContainer" :style="{width: (loadedPage.scale * loadedPage.size.x) + 'px', height: (loadedPage.scale * loadedPage.size.y) + 'px'}">
		<div
			class="Page"
			v-on:pointerdown="pointerdown"
			v-on:pointermove="pointermove"
			v-on:pointerup="pointerup"
			v-on:pointerleave="pointerleave"
			:style="{width: loadedPage.size.x+'px', height: loadedPage.size.y+'px', transform: 'scale(' + loadedPage.scale + ')'}"
		>
			<pageTitle />
			<sketches />
			<textBoxes />
	</div>
  </div>
</template>

<script>
import { Sketch } from "../../mixins/editingModes/sketch.js";
import Sketches from "../objects/Sketches.vue";
import textBoxes from "../objects/TextBoxes.vue";
import pageTitle from "../objects/PageTitle.vue";
import { mapState, mapGetters } from "vuex";

export default {
	components: {
		Sketches,
		pageTitle,
		textBoxes,
	},
	mixins: [Sketch],
	data: function() {
		return {
		};
	},
	methods: {
		pointerdown: function(event) {
			if(this.debug) {
				console.log("pointerdown");
				console.log(event);
			}

			this.setPointerPositionFromEvent(event);

			if(this.editingMode == "drawing") {
				this.sketchPointerDown(event);
			}
		},
		pointermove: function(event) {
			if(this.pointer.down) {
				if(this.debug) {
					console.log("pointermove");
					console.log(event);
				}

				this.setPointerPositionFromEvent(event);

				if(this.editingMode == "drawing") {
					this.sketchPointerMove(event);
				}
			}
		},
		pointerup: function(event) {
			if(this.debug) {
				console.log("pointerup");
				console.log(event);
			}

			if(this.editingMode == "drawing") {
				this.sketchPointerUp(event);
			}

			this.$store.dispatch("pointerUp");
		},
		pointerleave: function(event) {
			if(this.debug) {
				console.log("pointerleave");
				console.log(event);
			}

			if(this.editingMode == "drawing") {
				this.sketchPointerLeave(event);
			}

			this.$store.dispatch("pointerUp");
		},
		setPointerPositionFromEvent: function(event) {
			let pageCoordinates = this.globalCoordinatesToPageCoordinates(event.x, event.y);

			this.$store.commit("setPointer", {
				down: true,
				x: pageCoordinates.x,
				y: pageCoordinates.y,
				pressure: this.calculatePressure(event),
			});
		},
		globalCoordinatesToPageCoordinates: function(globalX, globalY) {
			let offsetX =  ((1 / this.loadedPage.scale) * this.scrollOffsetX);
			let offsetY =  ((1 / this.loadedPage.scale) * this.scrollOffsetY);

			let pageX =  ((1 / this.loadedPage.scale) * (globalX - this.$el.offsetLeft)) + offsetX;
			let pageY =  ((1 / this.loadedPage.scale) * (globalY - this.$el.offsetTop)) + offsetY;

			return {x: pageX, y: pageY,};
		},
		calculatePressure: function(event) {
			return this.selectedPencil.width * 2 * (event.pressure || 0.5);
		},
	},
	computed: {
		...mapState({
			debug: state => state.core.debug,
			loadedPage: state => state.core.loadedPage,
			navbarHeight: state => state.core.navbarHeight,
			scrollOffsetX: state => state.core.loadedPage.scrollOffsetX,
			scrollOffsetY: state => state.core.loadedPage.scrollOffsetY,
			editingMode: state => state.core.editingMode,
			pointer: state => state.core.pointer,
		}),
		...mapGetters([
			"lastSketch",
			"selectedPencil",
		]),
	},
};
</script>

<style scoped>
.Page {
  touch-action: none;
  background-color: white;
	transform-origin: left top;
	transition: all 1s ease 0s;
}
.sketch {
    width: 100%;
    position: relative;
}
</style>
