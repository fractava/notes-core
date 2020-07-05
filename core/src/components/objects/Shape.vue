<template>
	<div class="shapeContainer">
		<draggable-resizable
			:w="shape.position.width"
			:h="shape.position.height"
			:x="shape.position.x"
			:y="shape.position.y"
			:minHeight="50"
			:minWidth="50"
			@dragging="onDrag"
			@resizing="onResize"
			:parent="false"
			:active="active"
			:maxX="loadedPage.size.x"
			:maxY="loadedPage.size.y"
			v-on:click="activate"
		>
			<div
				class="shape"
				v-if="shape.type=='square'"
				style="border: 4px solid;"
			/>
			<div
				class="shape"
				v-if="shape.type=='circle'"
				style="border: 4px solid; border-radius: 100%;"
			/>
		</draggable-resizable>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import draggableResizable from '../miscellaneous/draggable-resizable/draggable-resizable.vue';

export default {
	components: {
		draggableResizable,
	},
	props: {
		id: {
			type: Number,
		},
	},
	data: function() {
		return {
			active: false,
		};
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
		shape: function() {
			return this.loadedPage.objects.shapes[this.id];
		},
	},
	methods: {
		activate: function() {
			this.$store.commit("focusObject", {type: "shapes", id: this.id,}, {module: "core" });
		},
		onResize: function (x, y, width, height) {
			this.$store.commit("moveShape", {id: this.id, x, y,}, {module: "core" });
			this.$store.commit("resizeShape", {id: this.id, width, height,}, {module: "core" });
		},
		onDrag: function (x, y) {
			this.$store.commit("moveShape", {id: this.id, x, y,}, {module: "core" });
		},
	},
};
</script>
<style>
.shape {
	width: 100%;
	height: 100%;
}
.shapeContainer {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 0px;
	height: 0px;
}
</style>
