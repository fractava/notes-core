<template>
	<div class="zoomControlContainer">
		<md-button class="navbarButton" v-on:click="plus">
			<md-icon>add</md-icon>
		</md-button>
		<md-button class="navbarButton" v-on:click="minus">
			<md-icon>remove</md-icon>
		</md-button>
		<md-button class="navbarButton" v-on:click="reset">
			<md-icon>youtube_searched_for</md-icon>
			<md-tooltip md-direction="bottom">Reset Zoom</md-tooltip>
		</md-button>
		<md-button class="navbarButton" v-on:click="snapToWidth">
			<md-icon>highlight_alt</md-icon>
			<md-tooltip md-direction="bottom">Snap to objects</md-tooltip>
		</md-button>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	methods: {
		plus: function() {
			this.$store.commit("setScale", {scale: this.loadedPage.scale + 0.1,}, {module: "core" });
		},
		minus: function() {
			this.$store.commit("setScale", {scale: this.loadedPage.scale - 0.1,}, {module: "core" });
		},
		reset: function() {
			console.log("reset");
			this.$store.commit("setScale", {scale: 1,}, {module: "core" });
			this.$store.commit("scroll", {x: 0, y: 0,}, {module: "core" });
		},
		snapToWidth: function() {
			let bodyWidth = document.getElementsByTagName("body")[0].clientWidth;

			let mostLeft = this.loadedPage.objects.textBoxes[0].position.x;
			let mostRight = this.loadedPage.objects.textBoxes[0].position.x + this.loadedPage.objects.textBoxes[0].position.width;

			for(let textBoxId in this.loadedPage.objects.textBoxes) {
				let textBox = this.loadedPage.objects.textBoxes[textBoxId];
				if(textBox.position.x < mostLeft) {
					mostLeft = textBox.x;
				}

				if(textBox.position.x + textBox.position.width > mostRight) {
					mostRight = textBox.position.x + textBox.position.width;
				}
			}
			console.log(mostLeft, mostRight);

			let deltaX = mostRight - mostLeft;

			let scale = (bodyWidth / deltaX) - 0.1;

			console.log(scale);

			this.$store.commit("setScale", {scale,}, {module: "core" });
			this.$store.commit("scroll", {x: mostLeft,}, {module: "core" });
		},
	},
	computed: mapState({
		loadedPage: state => state.core.loadedPage,
	}),
};
</script>
