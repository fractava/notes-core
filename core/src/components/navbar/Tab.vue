<template>
  <div class="navbarTab" v-if="id == coreStore.activeNavbarTab">
    <mode-switch-buttons />
    <slot />
  </div>
</template>

<script>
import modeSwitchButtons from "./ModeSwitchButtons.vue";

import { mapStores } from "pinia";
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
		...mapStores(useCoreStore),
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
