import { mapState, mapGetters } from "vuex";

export const addShape = {
	data: function() {
		return {
			addShapeStartCoordinates: {},
			addShapeEndCoordinates: {},
		};
	},
	methods: {
		addShapePointerDown: function(event){
			this.addShapeStartCoordinates.x = this.pointer.x;
			this.addShapeStartCoordinates.y = this.pointer.y;
		},
		addShapePointerMove: function(event) {
			this.addShapeEndCoordinates.x = this.pointer.x;
			this.addShapeEndCoordinates.y = this.pointer.y;
		},
		addShapePointerUp: function(event) {
			let startX = Math.min(this.addShapeEndCoordinates.x, this.addShapeStartCoordinates.x);
			let endX = Math.max(this.addShapeEndCoordinates.x, this.addShapeStartCoordinates.x);
			let startY = Math.min(this.addShapeEndCoordinates.y, this.addShapeStartCoordinates.y);
			let endY = Math.max(this.addShapeEndCoordinates.y, this.addShapeStartCoordinates.y);

			let width = endX - startX;
			let height = endY - startY;
			console.log(startX, startY, width, height);
			this.$store.commit("newShape", {type: this.editingModeAdditionalInformation, x: startX, y: startY, width, height,}, {module: "core" });
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
		addShapePointerLeave: function() {
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
	},
};
