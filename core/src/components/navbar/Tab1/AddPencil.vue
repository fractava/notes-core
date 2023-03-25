<template>
    <md-button class="navbarButton" v-on:click="add">
        <md-icon>add</md-icon>
    </md-button>
</template>

<script>
import { mapStores } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	methods: {
		add: function() {
			this.$store.commit("addPencil", {color: {r: 0, g: 0, b:0}, width: 8,}, {module: "core" });
			this.$store.dispatch("selectPencil", {id: this.coreStore.pencils.length - 1,}, {module: "core" });
		},
	},
	computed: {
		...mapStores(useCoreStore),
	}
};
</script>
