import html2canvas from "html2canvas";
import canvas2image from "canvas2image-module-wrapper";
import * as jsPDF from "jspdf";

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
	}
};
