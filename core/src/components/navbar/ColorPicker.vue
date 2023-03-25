<template>
	<sketch-picker
	class="sketchPicker"
	@input="update"
	:value="color || colorRGBA"
	:presetColors="coreStore.presetColors"
	></sketch-picker>
</template>

<script>
import { mapStores } from "pinia";
import { useCoreStore } from "../../pinia/core.js";
import { Sketch } from "vue-color";

export default {
	components: {
		sketchPicker: Sketch,
	},
	props: {
		colorRGBA: {
			type: Object,
			default() {
				return {r: 0, g: 0, b: 0, a: 0};
			}
		},
		color: {
			type: String,
			default: "",
		},
	},
	methods: {
		update: function(color) {
			this.$emit("update", color);
		},
	},
	computed: {
		...mapStores(useCoreStore),
	},
};
</script>

<style>
.sketchPicker {
	z-index: 1;
}
.vc-sketch {
	box-shadow: none !important;
}
.vc-sketch-presets {
	display: flex;
	flex-wrap: wrap;
}
</style>
