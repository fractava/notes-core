<template>
	<div>
		<div ref="container" v-if="isMounted">
		<Moveable
			class="moveable"
			v-bind="moveableOptions"
			:container="$refs.container"
			ref="moveable"
			:target="$refs.shape"
			:groupable="true"
			@dragStart="handleDragStart"
			@drag="handleDrag"
			@resizeStart="handleResizeStart"
			@resize="handleResize"
			@rotateStart="handleRotateStart"
			@rotate="handleRotate"
			@render="handleRender"
			:rootContainer="zoomedContainer"
		>
			<shape
				ref="shape"
				v-for="(shape, index) in loadedPage.objects.shapes"
				:id="index"
				:key="'shape'+index"
			/>
		</Moveable>
		</div>
	</div>
</template>
<script>
import Moveable from "vue-moveable";

import shape from "./Shape.vue";
import { mapState, mapGetters } from "vuex";

import { domToOjectId } from "../../mixins/editingModes/domToOjectId.js";

export default {
	props: {
		rootContainer: Object,
	},
	data: function() {
		return {
			beforeDragX: false,
			beforeDragY: false,
			beforeRotationDeg: false,
			isMounted: false,
			zoomedContainer: {},
			frame: {
				transformOrigin: "50% 50%",
			}
		}
	},
	components: {
		shape,
		Moveable,
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
		...mapGetters({
			moveableOptions: "moveableOptions",
		}),
	},
	mounted: function() {
		//this.$nextTick(function () {
			//this.updateStyles(this.$refs.moveable.$el);
			//this.$refs.moveable.updateRect();
		//});
		this.zoomedContainer = this.$parent.$refs.zoomedContainer;
		console.log("rootContainer from parent", this.$parent.$refs.zoomedContainer);
		console.log("rootContainer", this.rootContainer);
		this.isMounted = true;
	},
	methods: {
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
	mixins: [
		domToOjectId,
	]
};
</script>
