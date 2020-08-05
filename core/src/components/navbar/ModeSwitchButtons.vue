<template>
  <div style="height: 100%; display: flex;">
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('editing')" :class="{'md-raised': editingMode == 'editing'}">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('selecting')" :class="{'md-raised': editingMode == 'selecting'}">
      <md-icon>highlight_alt</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('drawing')" :class="{'md-raised': editingMode == 'drawing'}">
      <md-icon>gesture</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: mapState({
		editingMode: state => state.core.editingMode,
	}),
	methods: {
		switchEditingMode: function(mode) {
			this.$store.commit("switchEditingMode", {mode, }, {module: "core" });
		},
	},
};
</script>
