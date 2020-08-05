<template>
  <div class="navbarTab" v-if="id == activeNavbarTab">
    <mode-switch-buttons />
    <slot />
  </div>
</template>

<script>
import modeSwitchButtons from "./ModeSwitchButtons.vue";

import { mapState } from "vuex";

export default {
	components: {
		modeSwitchButtons,
	},
	props: {
		"id": {
			default: 0,
		},
	},
	computed: mapState({
		activeNavbarTab: state => state.core.activeNavbarTab,
	}),
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
