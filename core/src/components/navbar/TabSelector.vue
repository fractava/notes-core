<template>
    <!--<md-tab :md-label="content" v-on:click="select"></md-tab>-->
	<v-tab :value="id">{{ content }}</v-tab>
</template>

<script>
import { mapActions } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	props: {
		"id": {
			default: 0,
		},
		"content": {
			type: String,
			default: "",
		},
	},
	computed: {
		...mapActions(useCoreStore, ["selectNavbarTab"])
	},
	methods: {
		select: function() {
			this.selectNavbarTab({id: this.id,});
		},
	}
};
</script>

<style>
.tabSelector {
    padding-left: 5px;
    padding-right: 5px;
}
</style>