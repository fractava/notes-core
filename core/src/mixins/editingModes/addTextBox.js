import { mapActions } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export const addTextBox = {
	data: function() {
		return {
			addTextBoxStartCoordinates: {},
			addTextBoxEndCoordinates: {},
		};
	},
	computed: {
		...mapActions(useCoreStore, ["newTextBox", "switchEditingMode"]),
	},
	methods: {
		addTextBoxPointerDown: function(){
			this.addTextBoxStartCoordinates.x = this.pointer.x;
			this.addTextBoxStartCoordinates.y = this.pointer.y;
		},
		addTextBoxPointerMove: function() {
			this.addTextBoxEndCoordinates.x = this.pointer.x;
			this.addTextBoxEndCoordinates.y = this.pointer.y;
		},
		addTextBoxPointerUp: function() {
			let startX = Math.min(this.addTextBoxEndCoordinates.x, this.addTextBoxStartCoordinates.x);
			let endX = Math.max(this.addTextBoxEndCoordinates.x, this.addTextBoxStartCoordinates.x);
			let startY = Math.min(this.addTextBoxEndCoordinates.y, this.addTextBoxStartCoordinates.y);
			let endY = Math.max(this.addTextBoxEndCoordinates.y, this.addTextBoxStartCoordinates.y);

			let width = endX - startX;
			let height = endY - startY;
			console.log(width, height);
			this.newTextBox({x: startX, y: startY, width, height,});
			this.switchEditingMode({mode: "editing"});
		},
		addTextBoxPointerLeave: function() {
			this.switchEditingMode({mode: "editing"});
		},
	},
};
