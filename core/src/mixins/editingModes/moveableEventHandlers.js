export const moveableEventHandlers = {
	methods: {
		handleDragGroupStart({ events }) {
			for(let e of events) {
				this.handleDragStart(e);
			}
		},
		handleDragStart(e) {
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set([shape.position.x, shape.position.y]);
		},
		handleDragGroup({ events }) {
			for(let e of events) {
				console.log(e);
				this.handleDrag(e);
			}
		},
		handleDrag({ target, transform, beforeTranslate }) {
			target.style.transform = transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("moveObject", {id, type, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},

		handleResizeGroupStart({ events }) {
			for(let e of events) {
				this.handleResizeStart(e);
			}
		},
		handleResizeStart(e) {
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([shape.position.x, shape.position.y]);
		},

		handleResizeGroup({ events }) {
			for(let e of events) {
				this.handleResize(e);
			}
		},

		handleResize({target, width, height, delta, drag, }) {
			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("resizeObject", {id, type, width, height,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},

		handleRotateGroupStart({ events }) {
			for(let e of events) {
				this.handleRotateStart(e);
			}
		},

		handleRotateStart(e) {
			console.log(e);
			let id = this.domShapeToId(e.target);
			let shape = this.loadedPage.objects.shapes[id];

			e.set(shape.position.rotation);
		},

		handleRotateGroup({ events }) {
			for(let e of events) {
				this.handleRotate(e);
			}
		},

		handleRotate({ target, rotate, drag }) {
			target.style.transform = drag.transform;

			let {id, type} = this.domObjectToId(target);

			this.$store.commit("rotateObject", {id, type, rotation: rotate,}, {module: "core" });
			this.$store.commit("moveObject", {id, type, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},
	},
};