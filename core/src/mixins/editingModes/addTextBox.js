import { mapState, mapGetters } from "vuex";

export const addTextBox = {
	data: function() {
		return {
			addTextBoxStartCoordinates: {},
			addTextBoxEndCoordinates: {},
		};
	},
	methods: {
		addTextBoxPointerDown: function(event){
			this.addTextBoxStartCoordinates.x = this.pointer.x;
			this.addTextBoxStartCoordinates.y = this.pointer.y;
		},
		addTextBoxPointerMove: function(event) {
			this.addTextBoxEndCoordinates.x = this.pointer.x;
			this.addTextBoxEndCoordinates.y = this.pointer.y;
		},
		addTextBoxPointerUp: function(event) {
			let startX = Math.min(this.addTextBoxEndCoordinates.x, this.addTextBoxStartCoordinates.x);
			let endX = Math.max(this.addTextBoxEndCoordinates.x, this.addTextBoxStartCoordinates.x);
			let startY = Math.min(this.addTextBoxEndCoordinates.y, this.addTextBoxStartCoordinates.y);
			let endY = Math.max(this.addTextBoxEndCoordinates.y, this.addTextBoxStartCoordinates.y);

			let width = endX - startX;
			let height = endY - startY;
			console.log(width, height);
			this.$store.commit("newTextBox", {x: startX, y: startY, width, height,}, {module: "core" });
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
		addTextBoxPointerLeave: function() {
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
	},
};
