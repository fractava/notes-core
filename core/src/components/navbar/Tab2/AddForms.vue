<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="addFormButton"
			>
				<md-button md-menu-trigger>
					<md-icon>category</md-icon>
				</md-button>

				<md-menu-content class="addFormMenu">
					<span>
						<div class="addFormContainer">
							<md-button v-on:click="add('circle')">
								<md-icon>radio_button_unchecked</md-icon>
							</md-button>
							<md-button v-on:click="add('square')">
								<md-icon>crop_square</md-icon>
							</md-button>
						</div>
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
	methods: {
		add: function(type) {
			this.$store.commit("addForm", {type,}, {module: "core" });
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	},
};
</script>
<style scoped>
.addFormButton, .addFormButton button {
	height: 100%;
}
</style>
