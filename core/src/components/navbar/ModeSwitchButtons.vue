<template>
  <div style="height: 100%; display: flex;">
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('editing')" :class="{'md-raised': editingMode == 'editing'}">
      <md-icon>edit</md-icon>
      <md-tooltip md-direction="bottom">Edit</md-tooltip>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('selecting')" :class="{'md-raised': editingMode == 'selecting'}">
      <md-icon>highlight_alt</md-icon>
      <md-tooltip md-direction="bottom">Select</md-tooltip>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('drawing')" :class="{'md-raised': editingMode == 'drawing'}">
      <md-icon>gesture</md-icon>
      <md-tooltip md-direction="bottom">Draw</md-tooltip>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	computed: {
    ...mapStores(useCoreStore),
  },
	methods: {
		switchEditingMode: function(mode) {
			this.$store.commit("switchEditingMode", {mode, }, {module: "core" });
		},
	},
};
</script>
