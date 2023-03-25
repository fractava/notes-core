<template>
	<div class="textBoxesContainer">
		<text-box
			v-for="(textBox, index) in this.coreState.loadedPage.objects.textBoxes"
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
import { mapStores } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

import textBox from "./TextBox.vue";

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
		...mapStores(useCoreStore),
	},
};
</script>

<style>
</style>
