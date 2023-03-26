<template>
    <div>
			<!--<md-menu
				md-direction="bottom-start"
				md-align-trigger
				md-close-on-click
				class="navbarButton"
			>
				<md-button md-menu-trigger>
					<md-icon>category</md-icon>
				</md-button>

				<md-menu-content class="navbarMenu">
					<span>
						<div class="addFormContainer">
							<md-button v-for="(shape, index) in shapes" :key="'shape_selector' + index" v-on:click="add(shape)">
								<md-icon>{{ shape.icon }}</md-icon>
							</md-button>
						</div>
					</span>
				</md-menu-content>
			</md-menu>-->
    </div>
</template>

<script>

export default {
	data: function() {
		return {
			shapes: [
				{
					name: "square",
					distort: true,
					icon: "crop_square",
				},
				{
					name: "circle",
					distort: false,
					icon: "radio_button_unchecked"
				},
				{
					name: "star",
					distort: false,
					icon: "star_border",
				},
				{
					name: "arrow",
					distort: true,
					icon: "arrow_right_alt",
				}
			]
		};
	},
	methods: {
		add: function(information) {
			this.$store.commit("switchEditingMode", {mode: "addShape", information,}, {module: "core" });
		},
	},
};
</script>
