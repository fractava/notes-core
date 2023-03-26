<template>
	<!--<md-button class="navbarButton" v-on:click="add">
			<md-icon>post_add</md-icon>
	</md-button>-->
</template>

<script>
export default {
	methods: {
		add: function() {
			this.$store.commit("switchEditingMode", {mode: "addTextBox"}, {module: "core" });
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
