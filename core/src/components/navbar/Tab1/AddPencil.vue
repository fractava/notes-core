<template>
    <!--<md-button class="navbarButton" v-on:click="add">
        <md-icon>add</md-icon>
    </md-button>-->
	<div></div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	methods: {
		add: function() {
			this.addPencil({color: {r: 0, g: 0, b:0}, width: 8,});
			this.selectPencil({id: this.pencils.length - 1,});
		},
	},
	computed: {
		...mapState(useCoreStore, {
			pencils: store => store.pencils,
		}),
		...mapActions(useCoreStore, ["addPencil", "selectPencil"])
	}
};
</script>
