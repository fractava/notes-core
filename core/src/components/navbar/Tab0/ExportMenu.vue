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
        <md-button class="exportButton" v-on:click="exportWEBP()">WEBP</md-button>
        <md-button class="exportButton" v-on:click="exportJPG()">JPG</md-button>
      </div>
    </md-menu-content>
  </md-menu>
</template>

<script>
import html2pdf from "html2pdf.js";

import { mapState } from "vuex";

export default {
	methods: {
		html2pdfStart: function(imageType) {
			this.$store.commit("exportStarted", {}, {module: "core" });

			var element = this.getPageClone();
			var opt = {
				filename:     "download.pdf",
				image:        { type: imageType},
				html2canvas:  this.html2canvasOptions,
				jsPDF:        {unit: "pt", format: [this.loadedPage.size.x, this.loadedPage.size.y]}
			};

			return html2pdf().set(opt).from(element);
		},
		exportPNG: function() {
			let self = this;
			this.html2pdfStart("png").outputImg("datauristring").then(function(result) {
				console.log(result);
				self.saveFile(result, "png", "download");
				self.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportWEBP: function() {
			let self = this;
			this.html2pdfStart("webp").outputImg("datauristring").then(function(result) {
				console.log(result);
				self.saveFile(result, "webp", "download");
				self.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportJPG: function() {
			let self = this;
			this.html2pdfStart("jpeg").outputImg("datauristring").then(function(result) {
				console.log(result);
				self.saveFile(result, "jpg", "download");
				self.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		exportPDF: function() {
			let self = this;
			this.html2pdfStart("png").save().then(function() {
				self.$store.commit("exportStopped", {}, {module: "core" });
			});
		},
		getPageClone: function() {
			let element = document.getElementsByClassName("Page")[0].cloneNode(true);
			element.style.transform = "";
			console.log(element);
			return element;
		},
		saveFile: function(strData, fileType, fileName = "download") {
			console.log("save");
			let saveLink = document.createElement("a");
			saveLink.download = fileName + "." + fileType;
			saveLink.href = strData;
			saveLink.click();
		}
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
				width: this.loadedPage.size.x,
				height: this.loadedPage.size.y,
				onclone: (element) => {
					const svgElements = Array.from(element.querySelectorAll("svg:not(.sketch)"));
					svgElements.forEach(s => {
						const bBox = s.getBBox();
            console.log(s, bBox, s.parentElement.clientWidth, s.parentElement.clientHeight);
						s.setAttribute("x", bBox.x);
						s.setAttribute("y", bBox.y);
						s.setAttribute("width", s.parentElement.clientWidth);
						s.setAttribute("height", s.parentElement.clientHeight);
					});
				},
			};
		},
	}
};
</script>
