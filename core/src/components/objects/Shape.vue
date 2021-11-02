<template>
	<div class="shapeContainer" :class="{deactivated: !active}" :data-shape-id="id">
                <div
                    class="shape"
					:data-shape-id="id"
                    v-if="shape.type=='square'"
                    style="border: 4px solid;"
                    :style="{'border-color': shape.color.stroke, 'background-color': shape.color.fill,}"
                    v-on:click="activate"
                />
                <div
                    class="shape"
					:data-shape-id="id"
                    v-if="shape.type=='circle'"
                    v-on:click="activate"
                >
                    <svg viewBox="0 0 100 100" :preserveAspectRatio="aspectRatioAttribute" height="100%" width="100%">
                        <circle cx="50" cy="50" r="40" :fill="shape.color.fill" :stroke="shape.color.stroke" stroke-width="3" />
                    </svg>
                </div>
                <div
                    class="shape"
					:data-shape-id="id"
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
					:data-shape-id="id"
                    v-if="shape.type=='arrow'"
                    v-on:click="activate"
                >
                    <svg viewBox="0 5 24 14" :preserveAspectRatio="aspectRatioAttribute" width="100%" height="100%">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path :fill="shape.color.fill" :stroke="shape.color.stroke" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                    </svg>
        		</div>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
	props: {
		id: {
			type: Number,
		},
	},
	data: function() {
		return {
			isMounted: false,
		};
	},
	mounted: function() {
		this.isMounted = true;
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
			return (this.editingMode == "editing" || this.editingMode == "selecting") && this.$store.getters.objectFocused("shape", this.id);
		},
		aspectRatioAttribute: function() {
			return this.shape.distort ? "none" : "xMidYMid meet";
		},
	},
	methods: {
		activate: function() {
			console.log("activate");

			let objects = {
				shape: [this.id],
				textBox: [],
			}

			this.$store.commit("updateFocusedObjects", {objects,}, {module: "core" });
		},
		deactivate: function() {
			console.log("deactivate");
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
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
	width: 100%;
	height: 100%;
}
.moveable {
	position: absolute;
	width: 100%;
	height: 100%;
}
.shapeContainer.deactivated .moveable-control-box {
	display: none !important;
}
</style>
