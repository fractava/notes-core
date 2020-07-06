<template>
	<div>
		<shape
			v-for="(shape, index) in loadedPage.objects.shapes"
			:id="index"
			:key="'shape'+index"
		/>
	</div>
</template>
<script>
import shape from "./Shape.vue";
import { mapState } from "vuex";

export default {
	components: {
		shape,
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	}
};
</script>
