<template>
    <!--<md-button class="navbarButton" v-on:click="add">
        <md-icon>add</md-icon>
    </md-button>-->
	<div></div>
</template>

<script>
import { mapState } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	methods: {
		add: function() {
			this.$store.commit("addPencil", {color: {r: 0, g: 0, b:0}, width: 8,}, {module: "core" });
			this.$store.dispatch("selectPencil", {id: this.pencils.length - 1,}, {module: "core" });
		},
	},
	computed: {
		...mapState(useCoreStore, {
			pencils: store => store.pencils,
		}),
	}
};
</script>
