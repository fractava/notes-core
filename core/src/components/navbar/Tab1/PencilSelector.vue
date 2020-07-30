<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				:md-active="openedPencilSettingsId == id"
				class="navbarButton"
				v-on:click="select"
				:class="{'md-raised': id == selectedPencilId}"
			>
				<md-button>
					<md-icon :style="{color: pencils[id].color, opacity: pencils[id].opacity, }">create</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						Pencil Settings:
            <color-picker :colorRGBA="{...pencils[id].color, a: pencils[id].opacity, }" v-on:update="updateColor"/>
						Width: {{ pencils[id].width }}
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
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
    }),
    activeRGBString: function() {
      var color = tinycolor();
      return color.toRgbString();
    },
  },
	methods: {
		select: function() {
			if(this.selectedPencilId == this.id && this.openedPencilSettingsId != this.id) {
				this.$store.commit("switchPencilSettings", {id: this.id,}, {module: "core" });
			}else {
				this.$store.commit("closePencilSettings", {}, {module: "core" });
			}

			this.$store.commit("selectPencil", {id: this.id,}, {module: "core" });
		},
		updateColor: function(color) {
			console.log(color);
      let rgb = {r: color.rgba.r, g: color.rgba.g, b: color.rgba.b, };
      this.$store.commit("changePencilColor", {id: this.id, color: rgb, opacity: color.a }, {module: "core" });
		}
	}
};
</script>

<style scoped>
.selectPencilButton, .selectPencilButton button {
	height: 100%;
}
</style>
