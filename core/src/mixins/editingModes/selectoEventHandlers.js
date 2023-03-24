export const selectoEventHandlers = {
	methods: {
		onSelectoSelect: function(e) {
			let selectedObjects = this.domObjectsToIds(e.selected);

			this.$store.commit("updateFocusedObjects", {objects: selectedObjects,}, {module: "core" });

			this.targets = e.selected;
		},
		onSelectoDragStart: function(e) {
			const target = e.inputEvent.target;
            if (
                this.$refs.moveable.isMoveableElement(target)
                || this.targets.some(t => t === target || t.contains(target))
            ) {
                e.stop();
            }
		},
		onSelectoDrag: function(e) {
			//console.log("onDrag", e.currentTarget.gesto.isDrag, e.currentTarget.selectedTargets, e.currentTarget.selectedTargets.length, e);
			// && !(e.inputEvent.target.classList.contains("object") || e.inputEvent.target.parentElement.classList.contains("object"))
			if(this.editingMode !== "selecting" && e.currentTarget.selectedTargets.length == 0 && e.isFirstDrag) {
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
			//console.log(e);
		},
	},
};