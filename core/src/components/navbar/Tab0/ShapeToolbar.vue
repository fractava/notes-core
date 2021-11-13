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
		<md-button class="navbarButton" v-on:click="toggleDistort()" :class="{'md-raised': shape.distort }">
        Distort
    </md-button>
	</div>
</template>
<script>
import { mapState } from "vuex";
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
			this.$store.commit("setShapeFillColor", {id: this.focuseObjectId, color: color.hex8,}, {module: "core" });
		},
		updateStrokeColor: function(color) {
			this.$store.commit("setShapeStrokeColor", {id: this.focuseObjectId, color: color.hex8,}, {module: "core" });
		},
		toggleDistort: function() {
			this.$store.commit("setShapeDistort", {id: this.focuseObjectId, distort: !this.shape.distort,}, {module: "core" });
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		shape: function() {
			return this.loadedPage.objects.shapes[this.focuseObjectId];
		},
		strokeColor: function() {
			return this.shape.color.stroke;
		},
		fillColor: function() {
			return this.shape.color.fill;
		},
	},
};
</script>
