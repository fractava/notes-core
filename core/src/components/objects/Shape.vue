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
			:mouseDragFromInside="true"
			:touchDragFromInside="true"
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
			<div
				class="shape"
				v-if="shape.type=='star'"
				v-on:click="activate"
			>
				<svg viewBox="0 0 24 24" width="100%" height="100%">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path
						d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
						:fill="shape.color.fill"
						:stroke="shape.color.stroke"
					/>
				</svg>
			</div>
			<div
				class="shape"
				v-if="shape.type=='arrow'"
				v-on:click="activate"
			>
				<svg viewBox="0 5 24 14" preserveAspectRatio="none" width="100%" height="100%">
						<path d="M0 0h24v24H0z" fill="none"/>
						<path :fill="shape.color.fill" :stroke="shape.color.stroke" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
				</svg>
			</div>
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
