<template>
	<!--<div class="zoomedContainer" ref="zoomedContainer" :style="{width: (loadedPage.scale * loadedPage.size.x) + 'px', height: (loadedPage.scale * loadedPage.size.y) + 'px'}">
		<VueSelecto
			:selectableTargets.sync='selectableTargets'
			:selectByClick="true"
			:selectFromInside="false"
			:continueSelect="false"
			:toggleContinueSelect='"shift"'
			:hitRate="100"
			@select="onSelectoSelect"
			@dragStart="onSelectoDragStart"
			@drag="onSelectoDrag"
			ref="selecto"
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
			<Moveable
				class="moveable"
				v-bind="moveableOptions"
				
				:rootContainer="body"
				:container="$refs.page"
				v-if="isMounted"
				ref="moveable"
				:target="targets"
				:origin="false"
				
				@dragGroupStart="handleMoveableDragGroupStart"
				@dragStart="handleMoveableDragStart"
				@dragGroup="handleMoveableDragGroup"
				@drag="handleMoveableDrag"

				@resizeGroupStart="handleMoveableResizeGroupStart"
				@resizeStart="handleMoveableResizeStart"
				@resizeGroup="handleMoveableResizeGroup"
				@resize="handleMoveableResize"

				@rotateGroupStart="handleMoveableRotateGroupStart"
				@rotateStart="handleMoveableRotateStart"
				@rotateGroup="handleMoveableRotateGroup"
				@rotate="handleMoveableRotate"
				
			/>
	</div>
  </div>-->
  <div>{{ debug }}</div>
</template>

<script>
import { drawing } from "../../mixins/editingModes/drawing.js";
import { addTextBox } from "../../mixins/editingModes/addTextBox.js";
import { addShape } from "../../mixins/editingModes/addShape.js";
import { domToOjectId } from "../../mixins/editingModes/domToOjectId.js";
import { selectoEventHandlers } from "../../mixins/editingModes/selectoEventHandlers.js";
import { moveableEventHandlers } from "../../mixins/editingModes/moveableEventHandlers.js";
import { isMountedMixin } from "../../mixins/editingModes/isMountedMixin.js";

import Sketches from "../objects/Sketches.vue";
import textBoxes from "../objects/TextBoxes.vue";
import shapes from "../objects/Shapes.vue";
import pageTitle from "../objects/PageTitle.vue";

import { VueSelecto } from "vue-selecto";
import Moveable from "vue-moveable";

import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

console.log(useCoreStore);

export default {
	components: {
		Sketches,
		pageTitle,
		textBoxes,
		shapes,
		VueSelecto,
		Moveable,
	},
	mixins: [drawing, addTextBox, addShape, domToOjectId, selectoEventHandlers, moveableEventHandlers, isMountedMixin],
	data: function() {
		return {
			targets: [],
			selectableTargets: [".object"],
			body: document.body,
		};
	},
	methods: {
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

			this.setPointer({
				down: true,
				x: pageCoordinates.x,
				y: pageCoordinates.y,
				pressure: this.calculatePressure(event),
			});
		},
		globalCoordinatesToPageCoordinates: function(globalX, globalY) {
			let offsetX =  ((1 / this.loadedPage.scale) * this.loadedPage.scrollOffsetX);
			let offsetY =  ((1 / this.loadedPage.scale) * this.loadedPage.scrollOffsetY);

			let pageX =  ((1 / this.loadedPage.scale) * (globalX - this.$el.offsetLeft)) + offsetX;
			let pageY =  ((1 / this.loadedPage.scale) * (globalY - this.$el.offsetTop)) + offsetY;

			return {x: pageX, y: pageY,};
		},
		calculatePressure: function(event) {
			return this.selectedPencil.width * 2 * (event.pressure || 0.5);
		},
	},
	computed: {
		...mapState(useCoreStore, {
			debug: store => store.debug,
			loadedPage: store => store.loadedPage,
			selectedPencil: store => store.selectedPencil,
			moveableOptions: store => store.moveableOptions,
			editingMode: store => store.editingMode,
			pointer: store => store.pointer,
		}),
		...mapActions(useCoreStore, ["setPointer"]),
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
