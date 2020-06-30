<template>
    <div v-if="id == activeNavbarTab">
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

</style>