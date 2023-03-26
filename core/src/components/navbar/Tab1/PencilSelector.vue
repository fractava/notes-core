<template>
    <div>
			<!--<md-menu
				md-direction="bottom-start"
				md-align-trigger
				:md-active="openedPencilSettingsId == id"
				class="navbarButton"
				v-on:click="select"
			>
				<md-button
          :class="{'md-raised': id == selectedPencilId && editingMode == 'drawing'}"
        >
					<md-icon :style="{color: pencilRGBAString, }">create</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						Pencil Settings:
            <color-picker :colorRGBA="pencils[id].color" v-on:update="updateColor"/>
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
			</md-menu>-->
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

import tinycolor from "tinycolor2";
import ColorPicker from "../ColorPicker.vue";

export default {
	components: {
		ColorPicker,
	},
	props: {
		id: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		...mapState(useCoreStore, {
			pencils: store => store.pencils,
			openedPencilSettingsId: store => store.openedPencilSettingsId,
			editingMode: store => store.editingMode,
			selectedPencilId: store => store.selectedPencilId,
		}),
		...mapActions(useCoreStore, ["changePencilWidth", "switchPencilSettings", "closePencilSettings", "selectPencil", "changePencilColor"]),
		pencilRGBAString: function() {
			var color = tinycolor(this.pencils[this.id].color);
			return color.toRgbString();
		},
		width: {
			set(width) {
				this.changePencilWidth({id: this.id, width,});
			},
			get() {
				return this.pencils[this.id].width;
			}
		},
	},
	methods: {
		select: function() {
			if(this.editingMode == "drawing" && this.selectedPencilId == this.id && this.openedPencilSettingsId != this.id) {
				this.switchPencilSettings({id: this.id,});
			}else {
				this.closePencilSettings();
			}

			this.selectPencil({id: this.id,});
		},
		updateColor: function(color) {
			console.log(color);
			this.changePencilColor({id: this.id, color: color.rgba, });
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
