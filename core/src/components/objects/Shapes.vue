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
import { mapState } from "vuex";

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
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	},
};
</script>
