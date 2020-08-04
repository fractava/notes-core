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
					<md-icon>aspect_ratio</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						<span class="md-headline">Page Size:</span>
						<div class="backgroundsContainer">
              width: {{ width }}
              height: {{ height }}
              <input
                type="range"
                v-model.number="width"
                min="100"
                max="9000"
              >
              <input
                type="range"
                v-model.number="height"
                min="100"
                max="9000"
              >
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
		};
	},
	methods: {
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
		width: {
			set(width) {
				this.$store.commit("setPageWidth", {width,}, {module: "core" });
			},
			get() {
				return this.loadedPage.size.x;
			}
		},
    height: {
      set(height) {
        this.$store.commit("setPageHeight", {height,}, {module: "core" });
      },
      get() {
        return this.loadedPage.size.y;
      }
    },
	},
};
</script>
<style scoped>
</style>
