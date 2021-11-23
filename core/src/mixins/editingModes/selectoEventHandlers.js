export const selectoEventHandlers = {
	methods: {
		onSelect: function(e) {
			let selectedObjects = this.domObjectsToIds(e.selected);

			this.$store.commit("updateFocusedObjects", {objects: selectedObjects,}, {module: "core" });

			this.targets = e.selected;
		},
		onDrag: function(e) {
			console.log("onDrag", e.currentTarget.gesto.isDrag, e);
			// && !(e.inputEvent.target.classList.contains("object") || e.inputEvent.target.parentElement.classList.contains("object"))
			if(this.editingMode !== "selecting" && e.currentTarget.gesto.isDrag) {
				/*this.$store.commit(
					"updateFocusedObjects",
					{
						objects: {
						shapes: [],
						textBoxes: [],
					},
				}, {module: "core" });
				console.log("set no selected and stop");
				e.currentTarget.target.__vue__.$parent.$refs.selecto.setSelectedTargets([]);
				console.log(e.currentTarget.target.__vue__.$parent.$refs.selecto.getSelectedTargets())
				e.currentTarget.target.__vue__.$parent.onSelect({selected: []});*/
				console.log("stop");
				e.stop();
			}
			console.log(e);
		},
	},
};