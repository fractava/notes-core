<template>
	<!--<md-button class="navbarButton" v-on:click="add">
			<md-icon>post_add</md-icon>
	</md-button>-->
</template>

<script>
import { mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	computed: {
		...mapActions(useCoreStore, ["switchEditingMode"]),
	},
	methods: {
		add: function() {
			this.switchEditingMode({mode: "addTextBox"});
		},
	},
};
</script>
<style scoped>
.addTextBoxButton {
	height: 100%;
	margin: 0px;
}
</style>
