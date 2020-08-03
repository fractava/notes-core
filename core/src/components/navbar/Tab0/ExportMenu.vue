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
        <md-button class="exportButton" v-on:click="exportJPG()">JPG</md-button>
      </div>
    </md-menu-content>
  </md-menu>
</template>

<script>
import html2canvas from "html2canvas";
import canvas2image from "canvas2image-2";
import html2pdf from "html2pdf.js";

import { mapState } from "vuex";

export default {
	methods: {
		toCanvas: function() {
			return html2canvas(document.querySelector(".Page"), this.html2canvasOptions);
		},
		exportPNG: function() {
			this.$store.commit("exportStarted", {}, {module: "core" });
			this.toCanvas().then(canvas => {
				canvas2image.saveAsPNG(canvas, this.loadedPage.size.x, this.loadedPage.size.y);
				this.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportJPG: function() {
			this.$store.commit("exportStarted", {}, {module: "core" });
			this.toCanvas().then(canvas => {
				canvas2image.saveAsJPEG(canvas, this.loadedPage.size.x, this.loadedPage.size.y);
				this.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportPDF: function() {
			this.$store.commit("exportStarted", {}, {module: "core" });
        var element = document.getElementsByClassName('Page')[0];
        var opt = {
          filename:     'download.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  this.html2canvasOptions,
          jsPDF:        {unit: "pt", format: [this.loadedPage.size.x, this.loadedPage.size.y]}
        };
        html2pdf().set(opt).from(element).save().then(function() {
          this.$store.commit("exportStopped", {}, {module: "core" });
        });
		},
	},
	computed: {
		...mapState({
			exportInProgress: state => state.core.exportInProgress,
			loadedPage: state => state.core.loadedPage,
		}),
		html2canvasOptions: function() {
			return {
				ignoreElements: function(element) {
					return element.classList.contains("handle");
				},
				/*width: this.loadedPage.size.x,
				height: this.loadedPage.size.y,*/
			};
		}
	},
};
</script>
