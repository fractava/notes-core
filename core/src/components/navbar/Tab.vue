<template>
    <div class="navbarTab" v-if="id == activeNavbarTab">
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
};
</script>

<style>
.navbarTab {
	height: 100%;
}
</style>
