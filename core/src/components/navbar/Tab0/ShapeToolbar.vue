<template>
	<div style="height: 100%;">
		<md-menu
			md-direction="bottom-start"
			md-align-trigger
			class="navbarButton"
		>
			<md-button md-menu-trigger>
				<span>Fill Color</span>
			</md-button>
			<md-menu-content class="symbolsMenu">
				<span>
					<span class="md-headline">Fill Color:</span>
					<div class="fillColorPickerContainer">
						<color-picker :color="fillColor" v-on:update="updateFillColor"/>
					</div>
				</span>
			</md-menu-content>
		</md-menu>

		<md-menu
			md-direction="bottom-start"
			md-align-trigger
			class="navbarButton"
		>
			<md-button md-menu-trigger>
				<span>Stroke Color</span>
			</md-button>
			<md-menu-content class="symbolsMenu">
				<span>
					<span class="md-headline">Stroke Color:</span>
					<div class="fillColorPickerContainer">
						<color-picker :color="strokeColor" v-on:update="updateStrokeColor"/>
					</div>
				</span>
			</md-menu-content>
		</md-menu>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import colorPicker from "../ColorPicker.vue";

export default {
	components: {
		colorPicker,
	},
	data: function(){
		return {
			fillColorPickerExtended: false,
			strokeColorPickerExtended: false,
		};
	},
	methods: {
		updateFillColor: function(color) {
			this.$store.commit("setFillColor", {id: this.focuseObjectId, color: color.hex8,}, {module: "core" });
		},
		updateStrokeColor: function(color) {
			this.$store.commit("setStrokeColor", {id: this.focuseObjectId, color: color.hex8,}, {module: "core" });
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		strokeColor: function() {
			return this.loadedPage.objects.shapes[this.focuseObjectId].color.stroke;
		},
		fillColor: function() {
			return this.loadedPage.objects.shapes[this.focuseObjectId].color.fill;
		},
	},
};
</script>
