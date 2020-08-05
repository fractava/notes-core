<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="navbarButton"
			>
				<md-button
					md-menu-trigger
				>
					<md-icon>border_all</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						<span class="md-headline">Page Background:</span>
						<div class="backgroundsContainer">
							<div style="margin-bottom: 15px;">
								<md-button
									v-for="(type, index) in backgroundTypes"
									v-on:click="apply(type)"
									:key="'backgroundType'+index"
									:class="{'md-raised': loadedPage.background.type == type}"
								>
									{{ type }}
								</md-button>
							</div>
							<div v-if="loadedPage.background.type != 'none'">
								<input
									class="sizeSlider"
									type="range"
									v-model.number="size"
									min="10"
									max="90"
								>
								{{ size }}
							</div>
						</div>
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data: function() {
		return {
			backgroundTypes: ["none", "lines", "grid", "dottedGrid"],
		};
	},
	methods: {
		apply: function(type) {
			this.$store.commit("selectBackground", {type,}, {module: "core" });
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
		size: {
			set(size) {
				this.$store.commit("setBackgroundSize", {size,}, {module: "core" });
			},
			get() {
				return this.loadedPage.background.size;
			}
		},
	},
};
</script>
<style scoped>
.sizeSlider {
	width: 90%;
}
</style>
