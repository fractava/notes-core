<template>
    <div>
			<md-menu
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
			</md-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
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
		...mapState({
			pencils: state => state.core.pencils,
			selectedPencilId: state => state.core.selectedPencilId,
			openedPencilSettingsId: state => state.core.openedPencilSettingsId,
			editingMode: state => state.core.editingMode,
		}),
		pencilRGBAString: function() {
			var color = tinycolor(this.pencils[this.id].color);
			return color.toRgbString();
		},
		width: {
			set(width) {
				this.$store.commit("changePencilWidth", {id: this.id, width,}, {module: "core" });
			},
			get() {
				return this.pencils[this.id].width;
			}
		},
	},
	methods: {
		select: function() {
			if(this.editingMode == "drawing" && this.selectedPencilId == this.id && this.openedPencilSettingsId != this.id) {
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
