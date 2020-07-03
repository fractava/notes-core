<template>
    <md-button v-on:click="add">
        <md-icon>add</md-icon>
    </md-button>
</template>

<script>
import { mapState } from "vuex";

export default {
	methods: {
		add: function() {
			this.$store.commit("addPencil", {color: "#000000", width: 8,}, {module: "core" });
			this.$store.commit("selectPencil", {id: this.pencils.length - 1,}, {module: "core" });
			this.$store.commit("switchPencilSettings", {id: this.pencils.length - 1,}, {module: "core" });
		},
	},
	computed: mapState({
		pencils: state => state.core.pencils,
	}),
};
</script>