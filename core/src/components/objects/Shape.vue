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
			@deactivated="deactivate"
			:parent="false"
			:enabled="active"
			:maxX="loadedPage.size.x"
			:maxY="loadedPage.size.y"
		>
			<div
				class="shape"
				v-if="shape.type=='square'"
				style="border: 4px solid;"
				:style="{'border-color': shape.color.stroke, 'background-color': shape.color.fill,}"
				v-on:click="activate"
			/>
			<div
				class="shape"
				v-if="shape.type=='circle'"
				style="border: 4px solid; border-radius: 100%;"
				:style="{'border-color': shape.color.stroke, 'background-color': shape.color.fill,}"
				v-on:click="activate"
			/>
		</draggable-resizable>
	</div>
</template>
<script>
import { mapState } from "vuex";
import draggableResizable from "../miscellaneous/draggable-resizable/draggable-resizable.vue";

export default {
	components: {
		draggableResizable,
	},
	props: {
		id: {
			type: Number,
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		shape: function() {
			return this.loadedPage.objects.shapes[this.id];
		},
		active: function() {
			return this.editingMode == "editing" && this.focusedObjectType == "shapes" && this.focuseObjectId == this.id;
		},
	},
	methods: {
		activate: function() {
			this.$store.commit("focusObject", {type: "shapes", id: this.id,}, {module: "core" });
		},
		deactivate: function() {
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
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
