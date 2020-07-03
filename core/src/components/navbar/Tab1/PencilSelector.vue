<template>
    <div>
			<md-menu
				md-direction="bottom-start"
				md-align-trigger
				class="selectPencilButton"
				v-on:click="select"
				:class="{'md-raised': id == selectedPencilId}"
			>
				<md-button md-menu-trigger>
					<md-icon :style="{color: pencils[id].color,}">create</md-icon>
				</md-button>

				<md-menu-content>
					<span>
						Pencil Settings:
						Color: {{ pencils[id].color }}
						Width: {{ pencils[id].width }}
					</span>
				</md-menu-content>
			</md-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		id: {
			type: Number,
			default: 0,
		},
	},
	computed: mapState({
		pencils: state => state.core.pencils,
		selectedPencilId: state => state.core.selectedPencilId,
		openedPencilSettingsId: state => state.core.openedPencilSettingsId,
	}),
	methods: {
		select: function() {
			if(this.selectedPencilId == this.id && this.openedPencilSettingsId != this.id) {
				this.$store.commit("switchPencilSettings", {id: this.id,}, {module: "core" });
			}else {
				this.$store.commit("closePencilSettings", {}, {module: "core" });
			}

			this.$store.commit("selectPencil", {id: this.id,}, {module: "core" });
		}
	}
};
</script>

<style scoped>
.selectPencilButton, .selectPencilButton button {
	height: 100%;
}
</style>
