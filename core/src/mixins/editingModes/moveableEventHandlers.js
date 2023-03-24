export const moveableEventHandlers = {
	methods: {
		handleMoveableDragGroupStart({ events }) {
			console.log("handleDragGroupStart");
			for(let e of events) {
				this.handleMoveableDragStart(e);
			}
		},
		handleMoveableDragStart(e) {
			console.log("handleDragStart");
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set([shape.position.x, shape.position.y]);
		},
		handleMoveableDragGroup({ events }) {
			console.log("handleDragGroup");
			for(let e of events) {
				console.log(e);
				this.handleMoveableDrag(e);
			}
		},
		handleMoveableDrag({ target, transform, beforeTranslate }) {
			console.log("handleDrag");
			target.style.transform = transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("moveObject", {id, type, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},

		handleMoveableResizeGroupStart({ events }) {
			console.log("handleResizeGroupStart");
			for(let e of events) {
				this.handleMoveableResizeStart(e);
			}
		},
		handleMoveableResizeStart(e) {
			console.log("handleResizeStart");
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([shape.position.x, shape.position.y]);
		},

		handleMoveableResizeGroup({ events }) {
			console.log("handleResizeGroup");
			for(let e of events) {
				this.handleMoveableResize(e);
			}
		},

		handleMoveableResize({target, width, height, delta, drag, }) {
			console.log("handleResize");
			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("resizeObject", {id, type, width, height,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},

		handleMoveableRotateGroupStart({ events }) {
			console.log("handleRotateGroupStart");
			for(let e of events) {
				this.handleMoveableRotateStart(e);
			}
		},

		handleMoveableRotateStart(e) {
			console.log("handleRotateStart");
			console.log(e);
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set(shape.position.rotation);
		},

		handleMoveableRotateGroup({ events }) {
			console.log("handleRotateGroup");
			for(let e of events) {
				this.handleMoveableRotate(e);
			}
		},

		handleMoveableRotate({ target, rotate, drag }) {
			console.log("handleRotate");
			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("rotateObject", {id, type, rotation: rotate,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},
	},
};