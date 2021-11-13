<template>
	<div class="zoomedContainer" ref="zoomedContainer" :style="{width: (loadedPage.scale * loadedPage.size.x) + 'px', height: (loadedPage.scale * loadedPage.size.y) + 'px'}">
		<VueSelecto
			:selectableTargets.sync='selectableTargets'
			:selectByClick="true"
			:selectFromInside="true"
			:continueSelect="false"
			:toggleContinueSelect='"shift"'
			:hitRate="100"
			@selectStart="onSelectStart"
			@select="onSelect"
			@dragStart="onDragStart"
			@drag="onDrag"
			@dragEnd="onDragEnd"
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
			<shapes class="collectionContainer" ref="shapes" />
			<Moveable
				class="moveable"
				v-bind="moveableOptions"
				
				:rootContainer="body"
				:container="$refs.page"
				v-if="isMounted"
				ref="moveable"
				:target="targets"
				
				@dragGroupStart="handleDragGroupStart"
				@dragStart="handleDragStart"
				@dragGroup="handleDragGroup"
				@drag="handleDrag"

				@resizeGroupStart="handleResizeGroupStart"
				@resizeStart="handleResizeStart"
				@resizeGroup="handleResizeGroup"
				@resize="handleResize"

				@rotateGroupStart="handleRotateGroupStart"
				@rotateStart="handleRotateStart"
				@rotateGroup="handleRotateGroup"
				@rotate="handleRotate"
				
			/>
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
			targets: [],
			selectableTargets: [".object"],
			body: document.body,
			isMounted: false,
		};
	},
	methods: {
		onSelectStart: function(e) {

		},
		onSelect: function(e) {
			let selectedObjects = this.domObjectsToIds(e.selected);

			this.$store.commit("updateFocusedObjects", {objects: selectedObjects,}, {module: "core" });

			this.targets = e.selected;
		},
		onDragStart: function(e) {
			if(!(this.editingMode === 'selecting')) {
				e.stop();
			}
			console.log(e);
		},
		onDrag: function(e) {

		},
		onDragEnd: function(e) {

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
		handleDragGroupStart({ events }) {
			for(let e of events) {
				this.handleDragStart(e);
			}
		},
		handleDragStart(e) {
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set([shape.position.x, shape.position.y]);
		},
		handleDragGroup({ events }) {
			for(let e of events) {
				console.log(e);
				this.handleDrag(e);
			}
		},
		handleDrag({ target, transform, beforeTranslate }) {
			target.style.transform = transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("moveObject", {id, type, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},

		handleResizeGroupStart({ events }) {
			for(let e of events) {
				this.handleResizeStart(e);
			}
		},
		handleResizeStart(e) {
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([shape.position.x, shape.position.y]);
		},

		handleResizeGroup({ events }) {
			for(let e of events) {
				this.handleResize(e);
			}
		},

		handleResize({target, width, height, delta, drag, }) {
			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("resizeObject", {id, type, width, height,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},

		handleRotateGroupStart({ events }) {
			for(let e of events) {
				this.handleRotateStart(e);
			}
		},

		handleRotateStart(e) {
			console.log(e);
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set(shape.position.rotation);
		},

		handleRotateGroup({ events }) {
			for(let e of events) {
				this.handleRotate(e);
			}
		},

		handleRotate({ target, rotate, transform, drag }) {
			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("rotateObject", {id, type, rotation: rotate,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
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
	},
	mounted() {
		console.log(this.$refs.shapes);
		console.log(this.$refs.zoomedContainer);
		this.isMounted = true;
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
