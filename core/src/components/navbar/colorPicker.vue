<template>
	<chrome-picker :value="color" @input="update"></chrome-picker>
</template>

<script>
import { Chrome } from "vue-color";

export default {
	components: {
		Chrome,
	},
	props: {
		color: {
			type: String,
		}
	},
	methods: {
		update: function() {

		},
	},
};
</script>
