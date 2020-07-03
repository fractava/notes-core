<template>
	<sketch-picker
	class="sketchPicker"
	@input="update"
	:value="color"
	:presetColors="[
		'#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
	]"
	></sketch-picker>
</template>

<script>
import { Sketch } from "vue-color";

console.log(Sketch);

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
			console.log(color);
		},
	},
};
</script>

<style>
.sketchPicker {
	z-index: 1;
}
</style>
