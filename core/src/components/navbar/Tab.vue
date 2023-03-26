<template>
  <div class="navbarTab" v-if="id == activeNavbarTab">
    <mode-switch-buttons />
    <slot />
  </div>
</template>

<script>
import modeSwitchButtons from "./ModeSwitchButtons.vue";

import { mapState } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	components: {
		modeSwitchButtons,
	},
	props: {
		"id": {
			default: 0,
		},
	},
	computed: {
		...mapState(useCoreStore, {
			activeNavbarTab: store => store.activeNavbarTab,
		}),
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
