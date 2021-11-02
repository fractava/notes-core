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
			<Moveable
				class="moveable"
				v-bind="moveableOptions"
				:container="$refs.zoomedContainer"
				ref="moveable"
				:target="targets"
				:groupable="true"
				@dragStart="handleDragStart"
				@drag="handleDrag"
				@resizeStart="handleResizeStart"
				@resize="handleResize"
				@rotateStart="handleRotateStart"
				@rotate="handleRotate"
				@render="handleRender"
				:rootContainer="$refs.zoomedContainer"
			>
				<sketches class="collectionContainer" />
				<textBoxes class="collectionContainer" />
				<shapes class="collectionContainer" ref="shapes" />
			</Moveable>
	</div>
  </div>
</template>

<script>
import { drawing } from "../../mixins/editingModes/drawing.js";
import { addTextBox } from "../../mixins/editingModes/addTextBox.js";
import { addShape } from "../../mixins/editingModes/addShape.js";
import { domToOjectId } from "../../mixins/editingModes/domToOjectId.js";
import Sketches from "../objects/Sketches.vue";
import textBoxes from "../objects/TextBoxes.vue";
import shapes from "../objects/Shapes.vue";
import pageTitle from "../objects/PageTitle.vue";
import { mapState, mapGetters } from "vuex";

import { VueSelecto } from "vue-selecto";
import Moveable from "vue-moveable";

export default {
	components: {
		Sketches,
		pageTitle,
		textBoxes,
		shapes,
		VueSelecto,
		Moveable,
	},
	mixins: [drawing, addTextBox, addShape, domToOjectId],
	data: function() {
		return {
			beforeDragX: false,
			beforeDragY: false,
			beforeRotationDeg: false,
			frame: {
				transformOrigin: "50% 50%",
			}
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





		// Moveable

		handleDragStart(e) {
			let id = this.domShapeToId(target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set([shape.position.x, shape.position.y]);
		},
		handleDrag({ target, transform, beforeTranslate }) {
			//console.log("handleDrag", target);

			console.log("onDrag left, top", transform);
			target.style.transform = transform;

			let id = this.domShapeToId(target);

			this.$store.commit("moveShape", {id, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},
		handleResizeStart(e) {
			let id = this.domShapeToId(target);
			let shape = this.loadedPage.objects.shapes[id];

			console.log("handleResizeStart", e);

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([shape.position.x, shape.position.y]);
		},
		handleResize({target, width, height, delta, drag, }) {
			console.log("onResize", width, height);

			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			let id = this.domShapeToId(target);

			this.$store.commit("resizeShape", {id, width, height,}, {module: "core" });
			this.$store.commit("moveShape", {id, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},
		handleRotateStart(e) {
			let id = this.domShapeToId(target);
			let shape = this.loadedPage.objects.shapes[id];

			console.log("onRotateStart", e);

			e.set(shape.position.rotation);
		},
		handleRotate({ target, rotate, transform, }) {
			console.log("onRotate", rotate);

			target.style.transform = transform;

			let id = this.domShapeToId(target);

			this.$store.commit("rotateShape", {id, rotation: rotate,}, {module: "core" });
		},
		handleRender(e) {
			this.updateStyles(e.target);
		},
		updateStyles(target) {
			let id = this.domShapeToId(target);
			let shape = this.loadedPage.objects.shapes[id];

			console.log(target);
			target.style.transformOrigin = this.frame.transformOrigin;
			target.style.width = `${shape.position.width}px`;
			target.style.height = `${shape.position.height}px`;
			target.style.transform = `translate(${shape.position.x}px, ${shape.position.y}px)` + ` rotate(${shape.position.rotation}deg)`;
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
			"moveableOptions",
		]),
		targets: function() {
			if(this.$refs.shapes && this.$refs.shapes.$refs.shape) {
				return this.$refs.shapes.$refs.shape;
			} else {
				return [];
			}
		}
	},
	mounted() {
		console.log(this.$refs.shapes);
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
