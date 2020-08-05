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
						<div class="pageResizeContainer">
              <div style="margin-bottom: 15px;">
                <md-button
                  v-for="(preset, index) in presets"
                  v-on:click="apply(index)"
                  :key="'preset'+index"
                  :class="{'md-raised': preset.name === selectedPresetName, }"
                >
                  {{ preset.name }}
                </md-button>
              </div>
              <span>
                width: {{ width }}
                height: {{ height }}
              </span>
              <input
                class="pageResizeInput"
                v-if="selectedPresetName === 'custom'"
                type="range"
                v-model.number="width"
                min="200"
                max="9000"
              >
              <input
                class="pageResizeInput"
                v-if="selectedPresetName === 'custom'"
                type="range"
                v-model.number="height"
                min="200"
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
			custom: false,
			presets: [
				{
					name: "A4",
					width: 1240,
					height: 1754,
					tooltip: "A4 150 DPI"
				},
				{
					name: "A3",
					width: 1754,
					height: 2480,
					tooltip: "A3 150 DPI"
				},
				{
					name: "A5",
					width: 874,
					height: 1240,
					tooltip: "A3 150 DPI"
				},
				{
					name: "square",
					width: 1000,
					height: 1000,
					tooltip: "Square"
				},
				{
					name: "custom",
				}
			],
		};
	},
	methods: {
		apply: function(id) {
			let preset = this.presets[id];
			this.custom = preset.name == "custom";

			if(preset.width) {
				this.width = preset.width;
			}
			if(preset.height) {
				this.height = preset.height;
			}
		},
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
		selectedPresetName: function() {
			if(this.custom) {
				return "custom";
			}
			for(let id in this.presets) {
				let preset = this.presets[id];

				if(this.loadedPage.size.x == preset.width &&  this.loadedPage.size.y == preset.height) {
					return preset.name;
				}
			}
			return "custom";
		}
	},
};
</script>
<style>
.pageResizeContainer {
  display: flex;
  flex-direction: column;
}
.pageResizeInput {
  width: 90%;
}
</style>
