export const addShape = {
	data: function() {
		return {
			addShapeStartCoordinates: {},
			addShapeEndCoordinates: {},
		};
	},
	methods: {
		addShapePointerDown: function(){
			this.addShapeStartCoordinates.x = this.pointer.x;
			this.addShapeStartCoordinates.y = this.pointer.y;
		},
		addShapePointerMove: function() {
			this.addShapeEndCoordinates.x = this.pointer.x;
			this.addShapeEndCoordinates.y = this.pointer.y;
		},
		addShapePointerUp: function() {
			let startX = Math.min(this.addShapeEndCoordinates.x, this.addShapeStartCoordinates.x);
			let endX = Math.max(this.addShapeEndCoordinates.x, this.addShapeStartCoordinates.x);
			let startY = Math.min(this.addShapeEndCoordinates.y, this.addShapeStartCoordinates.y);
			let endY = Math.max(this.addShapeEndCoordinates.y, this.addShapeStartCoordinates.y);

			let width = endX - startX;
			let height = endY - startY;
			console.log(startX, startY, width, height);
			this.$store.commit("newShape", {
				type: this.editingModeAdditionalInformation.name,
				x: startX,
				y: startY,
				width,
				height,
				distort: this.editingModeAdditionalInformation.distort,
				strokeWeight: 4,
				rotation: this.editingModeAdditionalInformation.rotation,
			}, {module: "core" });
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
		addShapePointerLeave: function() {
			this.$store.commit("switchEditingMode", {mode: "editing"}, {module: "core" });
		},
	},
};
