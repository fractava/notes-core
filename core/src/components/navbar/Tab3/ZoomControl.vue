<template>
	<div>
		<md-button v-on:click="plus">
			<md-icon>add</md-icon>
		</md-button>
		<md-button v-on:click="minus">
			<md-icon>remove</md-icon>
		</md-button>
		<md-button v-on:click="reset">
			<md-icon>highlight_alt</md-icon>
		</md-button>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	methods: {
		plus: function() {
			this.$store.commit("setScale", {scale: this.loadedPage.scale + 0.1,}, {module: "core" });
		},
		minus: function() {
			this.$store.commit("setScale", {scale: this.loadedPage.scale - 0.1,}, {module: "core" });
		},
		reset: function() {
			this.$store.commit("setScale", {scale: 1,}, {module: "core" });
		},
	},
	computed: mapState({
		loadedPage: state => state.core.loadedPage,
	}),
};
</script>