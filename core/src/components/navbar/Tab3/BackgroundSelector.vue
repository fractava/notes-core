<template>
    <div>
			<!--<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="navbarButton"
			>
				<md-button
					md-menu-trigger
				>
					<md-icon>border_all</md-icon>
          <md-tooltip md-direction="bottom">Page Background</md-tooltip>
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
			</md-menu>-->
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	data: function() {
		return {
			backgroundTypes: ["none", "lines", "grid", "dottedGrid"],
		};
	},
	methods: {
		apply: function(type) {
			this.selectBackground({type,});
		},
	},
	computed: {
		...mapState(useCoreStore, {
			loadedPage: store => store.loadedPage,
		}),
		...mapActions(useCoreStore, ["selectBackground", "setBackgroundSize"]),
		size: {
			set(size) {
				this.setBackgroundSize({size,});
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
