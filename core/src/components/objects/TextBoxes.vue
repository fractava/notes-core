<template>
	<div class="textBoxesContainer">
		<text-box
			v-for="(textBox, index) in this.loadedPage.objects.textBoxes"
			:key="'text-box-' + index"
			:id="index"
			v-on:pointerdown="stopPropagation"
			v-on:pointermove="stopPropagation"
			v-on:pointerup="stopPropagation"
			v-on:pointerleave="stopPropagation"
		/>
	</div>
</template>

<script>
import textBox from "./TextBox.vue";
import { mapState } from "vuex";

export default {
	methods: {
		stopPropagation: function(event) {
			console.log("preventing event");
			event.stopPropagation();
			this.$store.dispatch("pointerUp");
		},
	},
	components: {
		textBox,
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	},
};
</script>

<style>
</style>
