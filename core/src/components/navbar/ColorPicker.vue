<template>
	<sketch-picker
	class="sketchPicker"
	@input="update"
	:value="color"
	:presetColors="presetColors"
	></sketch-picker>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Sketch } from "vue-color";

export default {
	components: {
		sketchPicker: Sketch,
	},
	props: {
		color: {
			type: String,
			default: "#000000",
		}
	},
	methods: {
		update: function(color) {
			this.$emit('update', color);
		},
	},
	computed: {
		...mapState({
			presetColors: state => state.core.presetColors,
		}),
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
