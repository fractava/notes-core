<template>
	<div class="zoomedContainer" ref="zoomedContainer" :style="{width: (loadedPage.scale * loadedPage.size.x) + 'px', height: (loadedPage.scale * loadedPage.size.y) + 'px'}">
			<VueSelecto
				:rootContainer="$refs.zoomedContainer"
				:container="$refs.zoomedContainer"
				:dragContainer="$refs.zoomedContainer"
				:selectableTargets='[".shape", ".textBox"]'
				:style="{'top': '-300px'}"
				:selectByClick="true"
				:selectFromInside="true"
				:continueSelect="false"
				:toggleContinueSelect='"shift"'
				:hitRate="100"
				@select="onSelect"
				@dragStart="onDragStart"
				/>
		<div
			class="Page"
			ref="page"
			:class="[loadedPage.background.type]"
			v-on:pointerdown="pointerdown"
			v-on:pointermove="pointermove"
			v-on:pointerup="pointerup"
			v-on:pointerleave="pointerleave"
			:style="{width: loadedPage.size.x+'px', height: loadedPage.size.y+'px', transform: 'scale(' + loadedPage.scale + ')', '--backgroundSize': loadedPage.background.size+'px'}"
		>
			<pageTitle />
			<sketches class="collectionContainer" />
			<textBoxes class="collectionContainer" />
			<shapes class="collectionContainer" />
	</div>
  </div>
</template>

<script>
import { drawing } from "../../mixins/editingModes/drawing.js";
import { addTextBox } from "../../mixins/editingModes/addTextBox.js";
import { addShape } from "../../mixins/editingModes/addShape.js";
import Sketches from "../objects/Sketches.vue";
import textBoxes from "../objects/TextBoxes.vue";
import shapes from "../objects/Shapes.vue";
import pageTitle from "../objects/PageTitle.vue";
import { mapState, mapGetters } from "vuex";

import { VueSelecto } from "vue-selecto";

export default {
	components: {
		Sketches,
		pageTitle,
		textBoxes,
		shapes,
		VueSelecto,
	},
	mixins: [drawing, addTextBox, addShape],
	data: function() {
		return {
		};
	},
	methods: {
		onSelect: function(e) {
			console.log("onselect");
			console.log(e);

			let selectedObjects = {
				shape: [],
				textBox: [],
			}

			for(let object of e.selected) {
				console.log(object);
				if(object.hasAttribute("data-shape-id")) {
					selectedObjects.shape.push(parseInt(object.getAttribute("data-shape-id"), 10))
				}
				if(object.hasAttribute("data-textBox-id")) {
					selectedObjects.textBox.push(parseInt(object.getAttribute("data-textBox-id"), 10))
				}
			}

			console.log(selectedObjects);
			this.$store.commit("updateFocusedObjects", {objects: selectedObjects,}, {module: "core" });
		},
		onDragStart: function(e) {
			if(!(this.editingMode === 'selecting')) {
				e.stop();
			}
			console.log(e);
		},
		pointerdown: function(event) {
			if(this.debug) {
				console.log("pointerdown");
				console.log(event);
			}

			this.setPointerPositionFromEvent(event);

			switch(this.editingMode) {
			case "drawing":
				this.drawingPointerDown(event);
				break;
			case "addTextBox":
				this.addTextBoxPointerDown(event);
				break;
			case "addShape":
				this.addShapePointerDown(event);
				break;
			}
		},
		pointermove: function(event) {
			if(this.pointer.down) {
				if(this.debug) {
					console.log("pointermove");
					console.log(event);
				}

				this.setPointerPositionFromEvent(event);

				switch(this.editingMode) {
				case "drawing":
					this.drawingPointerMove(event);
					break;
				case "addTextBox":
					this.addTextBoxPointerMove(event);
					break;
				case "addShape":
					this.addShapePointerMove(event);
					break;
				}
			}
		},
		pointerup: function(event) {
			if(this.debug) {
				console.log("pointerup");
				console.log(event);
			}

			switch(this.editingMode) {
			case "drawing":
				this.drawingPointerUp(event);
				break;
			case "addTextBox":
				this.addTextBoxPointerUp(event);
				break;
			case "addShape":
				this.addShapePointerUp(event);
				break;
			}

			this.$store.dispatch("pointerUp");
		},
		pointerleave: function(event) {
			if(this.debug) {
				console.log("pointerleave");
				console.log(event);
			}

			switch(this.editingMode) {
			case "drawing":
				this.drawingPointerLeave(event);
				break;
			case "addTextBox":
				this.addTextBoxPointerLeave(event);
				break;
			case "addShape":
				this.addShapePointerLeave(event);
				break;
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
			editingModeAdditionalInformation: state => state.core.editingModeAdditionalInformation,
			pointer: state => state.core.pointer,
			exportInProgress: state => state.core.exportInProgress,
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
.collectionContainer {
		position: absolute;
    top: 0px;
    left: 0px;
}
</style>
