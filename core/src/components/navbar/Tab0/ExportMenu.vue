<template>
  <md-menu
    md-direction="bottom-start"
    md-align-trigger
    md-close-on-click
  >
    <md-button md-menu-trigger class="navbarButton smallNavbarButton" :class="{'md-raised': exportInProgress}">
      <md-icon>save_alt</md-icon>
    </md-button>

    <md-menu-content class="exportMenu navbarMenu">
      <div class="exportButtonContainer">
        <md-button class="exportButton" v-on:click="exportPDF()">PDF</md-button>
        <md-button class="exportButton" v-on:click="exportPNG()">PNG</md-button>
      </div>
    </md-menu-content>
  </md-menu>
</template>

<script>
import html2canvas from "html2canvas";
import canvas2image from "canvas2image-2";
import * as jsPDF from "jspdf";

import { mapState } from "vuex";

console.log(html2canvas);
console.log(canvas2image);

export default {
	methods: {
		toCanvas: function() {
			return html2canvas(document.querySelector(".Page"));
		},
		exportPNG: function() {
			this.$store.commit("exportStarted", {}, {module: "core" });
			this.toCanvas().then(canvas => {
				canvas2image.saveAsPNG(canvas, 4000, 4000);
				this.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportPDF: function() {
			this.$store.commit("exportStarted", {}, {module: "core" });
			this.toCanvas().then(canvas => {
				let image = canvas2image.convertToPNG(canvas, 4000, 4000);

				var pdf = new jsPDF({
					unit: "px",
					format: [4000, 4000]
				});

				pdf.addImage(image, "PNG", 0, 0);
				pdf.save("download.pdf");
				console.log("save done");
				this.$store.commit("exportStopped", {}, {module: "core" });
			});
		}
	},
  computed: mapState({
    exportInProgress: state => state.core.exportInProgress,
  }),
};
</script>
