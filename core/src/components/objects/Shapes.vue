<template>
	<div>
		<shape
			v-for="(shape, index) in loadedPage.objects.shapes"
			:id="index"
		/>
	</div>
</template>
<script>
import shape from './Shape.vue';
import { mapState, mapGetters } from "vuex";

export default {
	components: {
		shape,
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	}
}
</script>
