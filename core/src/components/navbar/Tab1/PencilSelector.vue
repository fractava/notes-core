<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				:md-active="coreStore.openedPencilSettingsId == id"
				class="navbarButton"
				v-on:click="select"
			>
				<md-button
          :class="{'md-raised': id == coreStore.selectedPencilId && coreStore.editingMode == 'drawing'}"
        >
					<md-icon :style="{color: pencilRGBAString, }">create</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						Pencil Settings:
            <color-picker :colorRGBA="coreStore.pencils[id].color" v-on:update="updateColor"/>
            <div class="widthSliderContainer">
              <input
                class="widthSlider"
                type="range"
                v-model.number="width"
                min="1"
                max="50"
              >
            </div>
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

import tinycolor from "tinycolor2";
import colorPicker from "../ColorPicker.vue";

export default {
	components: {
		colorPicker,
	},
	props: {
		id: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		...mapStores(useCoreStore),
		pencilRGBAString: function() {
			var color = tinycolor(this.coreStore.pencils[this.id].color);
			return color.toRgbString();
		},
		width: {
			set(width) {
				this.$store.commit("changePencilWidth", {id: this.id, width,}, {module: "core" });
			},
			get() {
				return this.coreStore.pencils[this.id].width;
			}
		},
	},
	methods: {
		select: function() {
			if(this.coreStore.editingMode == "drawing" && this.coreStore.selectedPencilId == this.id && this.coreStore.openedPencilSettingsId != this.id) {
				this.$store.commit("switchPencilSettings", {id: this.id,}, {module: "core" });
			}else {
				this.$store.commit("closePencilSettings", {}, {module: "core" });
			}

			this.$store.dispatch("selectPencil", {id: this.id,}, {module: "core" });
		},
		updateColor: function(color) {
			console.log(color);
			this.$store.commit("changePencilColor", {id: this.id, color: color.rgba, }, {module: "core" });
		},
	}
};
</script>

<style scoped>
.selectPencilButton, .selectPencilButton button {
	height: 100%;
}
.widthSlider {
  width: 100%;
}
.widthSliderContainer {
  width: 100%;
  padding: 10px 10px 0;
}
</style>
