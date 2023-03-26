import { mapActions } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export const selectoEventHandlers = {
	computed: {
		...mapActions(useCoreStore, ["updateFocusedObjects"]),
	},
	methods: {
		onSelectoSelect: function(e) {
			let selectedObjects = this.domObjectsToIds(e.selected);

			this.updateFocusedObjects({objects: selectedObjects,});

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
				console.log("stop");
				e.stop();
			}
			//console.log(e);
		},
	},
};