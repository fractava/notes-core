<template>
	<md-card class="relativeMenu" :style="{width: width+'px'}">
		<md-card-header>
				<div class="md-title">{{ title }}</div>
		</md-card-header>
		<md-card-content>
				<slot />
		</md-card-content>
	</md-card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		width: {
			type: Number,
			default: 100,
		}
	},
};
</script>

<style>
.relativeMenu {
	position: relative;
}
</style>
