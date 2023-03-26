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
import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

import textBox from "./TextBox.vue";

export default {
	methods: {
		stopPropagation: function(event) {
			console.log("preventing event");
			event.stopPropagation();
			this.pointerUp();
		},
	},
	components: {
		textBox,
	},
	computed: {
		...mapState(useCoreStore, {
			loadedPage: store => store.loadedPage,
		}),
		...mapActions(useCoreStore, ["pointerUp"]),
	},
};
</script>

<style>
</style>
