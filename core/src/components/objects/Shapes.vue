<template>
	<div>
		<div ref="container">
			<shape
				ref="shape"
				v-for="(shape, index) in loadedPage.objects.shapes"
				:id="index"
				:key="'shape'+index"
			/>
		</div>
	</div>
</template>
<script>

import shape from "./Shape.vue";

import { mapState } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	props: {
		rootContainer: Object,
	},
	data: function() {
		return {
		};
	},
	components: {
		shape,
	},
	computed: {
		...mapState(useCoreStore, {
			loadedPage: store => store.loadedPage,
		}),
	},
};
</script>
