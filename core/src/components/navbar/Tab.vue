<template>
  <div class="navbarTab" v-if="id == activeNavbarTab">
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('editing')">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('selecting')">
      <md-icon>highlight_alt</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="switchEditingMode('drawing')">
      <md-icon>gesture</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" />

    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		"id": {
			default: 0,
		},
	},
	computed: mapState({
		activeNavbarTab: state => state.core.activeNavbarTab,
	}),
  methods: {
    switchEditingMode: function(mode) {
      this.$store.commit("switchEditingMode", {mode, }, {module: "core" });
    },
  },
};
</script>

<style>
.navbarTab {
	height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
