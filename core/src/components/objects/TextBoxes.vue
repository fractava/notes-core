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
			:focused="focusedObjectType == 'textBox' && focuseObjectId == index"
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
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
	},
};
</script>

<style>
</style>
