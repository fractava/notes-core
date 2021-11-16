export const selectoEventHandlers = {
	methods: {
		onSelect: function(e) {
			let selectedObjects = this.domObjectsToIds(e.selected);

			this.$store.commit("updateFocusedObjects", {objects: selectedObjects,}, {module: "core" });

			this.targets = e.selected;
		},
		onDragStart: function(e) {
			if(!(this.editingMode === "selecting")) {
				e.stop();
			}
			console.log(e);
		},
	},
};