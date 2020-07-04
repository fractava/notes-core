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
			let width = this.addTextBoxEndCoordinates.x - this.addTextBoxStartCoordinates.x;
			let height = this.addTextBoxEndCoordinates.y - this.addTextBoxStartCoordinates.y;
			console.log(width, height);
			this.$store.commit("newTextBox", {x: this.addTextBoxStartCoordinates.x, y: this.addTextBoxStartCoordinates.y, width, height,}, {module: "core" });
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
		addTextBoxPointerLeave: function() {
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
	},
};
