<template>
	<div class="shapeContainer">
		<drr
			:w="shape.position.width"
			:h="shape.position.height"
			:x="shape.position.x + (shape.position.width / 2)"
			:y="shape.position.y + (shape.position.height / 2)"
			:angle="shape.rotation"
			:minHeight="50"
			:minWidth="50"
			:outerBound="{x: loadedPage.size.x/2, y: loadedPage.size.y/2, w: loadedPage.size.x, h: loadedPage.size.y}"
			:innerBound="{x: 0, y: 0, w: 50, h: 50}"
			@change="onChange"
			:selected="active"
			@select="activate"
		>
			<!-- :grid="[loadedPage.background.size, loadedPage.background.size]" -->
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
				v-on:click="activate"
			>
				<svg viewBox="0 0 100 100" :preserveAspectRatio="aspectRatioAttribute" height="100%" width="100%">
					<circle cx="50" cy="50" r="40" :fill="shape.color.fill" :stroke="shape.color.stroke" stroke-width="3" />
				</svg>
			</div>
			<div
				class="shape"
				v-if="shape.type=='star'"
				v-on:click="activate"
			>
				<svg viewBox="0 0 24 24" :preserveAspectRatio="aspectRatioAttribute" width="100%" height="100%">
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
				<svg
					viewBox="0 5 24 14"
					:preserveAspectRatio="aspectRatioAttribute"
					width="100%"
					height="100%"
					:style="{}"

				>
						<path d="M0 0h24v24H0z" fill="none"/>
						<path
							:fill="shape.color.fill"
							:stroke="shape.color.stroke"
							d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"
						/>
				</svg>
			</div>
		</drr>
	</div>
</template>
<script>
import { mapState } from "vuex";
//import draggableResizable from "../miscellaneous/draggable-resizable/draggable-resizable.vue";
import drr from '@minogin/vue-drag-resize-rotate'

export default {
	components: {
		//draggableResizable,
		drr,
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
		aspectRatioAttribute: function() {
			return this.shape.distort ? "none" : "xMidYMid meet";
		},
	},
	methods: {
		activate: function() {
			this.$store.commit("focusObject", {type: "shapes", id: this.id,}, {module: "core" });
		},
		deactivate: function() {
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
		},
		onChange: function(rect) {
			let x = rect.x - (rect.w / 2);
			let y = rect.y - (rect.h / 2);

			this.$store.commit("moveShape", {id: this.id, x, y,}, {module: "core" });
			this.$store.commit("resizeShape", {id: this.id, width: rect.w, height: rect.h,}, {module: "core" });
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
