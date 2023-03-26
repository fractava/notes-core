<template>
	<div class="zoomControlContainer">
		<!--<md-button class="navbarButton" v-on:click="plus">
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
		</md-button>-->
	</div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCoreStore } from "../../../pinia/core.js";

export default {
	methods: {
		plus: function() {
			this.setScale({scale: this.loadedPage.scale + 0.1,});
		},
		minus: function() {
			this.setScale({scale: this.loadedPage.scale - 0.1,});
		},
		reset: function() {
			console.log("reset");
			this.setScale({scale: 1,});
			this.scroll({x: 0, y: 0,});
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

			this.setScale({scale,});
			this.scroll({x: mostLeft,});
		},
	},
	computed: {
		...mapState(useCoreStore, {
			loadedPage: store => store.loadedPage,
		}),
		...mapActions(useCoreStore, ["setScale", "scroll"]),
	}
};
</script>
