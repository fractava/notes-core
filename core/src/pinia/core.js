import { defineStore } from 'pinia';

export const useCoreStore = defineStore('core', {
	state: () => ({
		debug: false,
		loadedPage: {
			title: "",
			objects: {
				sketches: [
				],
				textBoxes: [
				],
				shapes: [
				],
				images: [
				],
				files: [
				],
			},
			background: {
				type: "grid",
				size: 50,
			},
			size: {
				x: 4000,
				y: 4000,
			},
			scrollOffsetX: 0,
			scrollOffsetY: 0,
			scale: 1,
		},
		navbarHeight: 10,
		pencils: [
			{
				color: {r: 0, g: 0, b:0, },
				width: 10,
				opacity: 1,
			},
			{
				color: {r: 255, g: 0, b:0, },
				width: 15,
				opacity: 1,
			}
		],
		selectedPencilId: 0,
		activeNavbarTab: 0,
		openedPencilSettingsId: -1,
		pointer: {
			down: false,
			x: false,
			y: false,
			pressure: false,
		},
		focusedObjects: {
			textBoxes: [],
			shapes: [],
		},
		editingMode: "editing",
		editingModeAdditionalInformation: "",
		presetColors:["#f00", "#00ff00", "#00ff0055", "rgb(201, 76, 76)", "rgba(0,0,255,1)", "hsl(89, 43%, 51%)", "hsla(89, 43%, 51%, 0.6)"],
		openedDialog: false,
		exportInProgress: false,
	}),
	getters: {
		// Page
		objectFocused: (state) => (type, id) => {
			console.log(state.focusedObjects[type]);
			return state.focusedObjects[type].includes(id);
		},

		numberOfObjectsFocused: (state) => {
			let res = 0;

			for(let objectType in state.focusedObjects) {
				res += state.focusedObjects[objectType].length;
			}

			return res;
		},

		moveableOptions: (state) => {
			let horizontalGuidelines = [];
			for(let coordinate = 0; coordinate <= state.loadedPage.size.x; coordinate += state.loadedPage.background.size) {
				horizontalGuidelines.push(coordinate);
			}

			let verticalGuidelines = [];
			for(let coordinate = 0; coordinate <= state.loadedPage.size.y; coordinate += state.loadedPage.background.size) {
				verticalGuidelines.push(coordinate);
			}

			return {
				draggable: true,
				throttleDrag: 1,
				resizable: true,
				throttleResize: 1,
				keepRatio: false,
				scalable: false,
				throttleScale: 1,
				rotatable: true,
				throttleRotate: 1,
				pinchable: true,
				originDraggable: true,
				edge: true,
				renderDirections: ["nw","n","ne","w","e","sw","s","se"],
				//bounds: {"left": 0,"top": 0,"right": 0,"bottom": 0},
				bounds: {
					left: 0,
					top: 0,
				},
				//padding: {"left": 0,"top": 0,"right": 0,"bottom": 0},
				horizontalGuidelines,
				verticalGuidelines,
				snappable: true,
				snapThreshold: 5,
				snapVertical: true,
				snapHorizontal: true,
				snapElement: true,
			};
		},

		// Sketch
		lastSketch: (state) => {
			if(state.loadedPage.objects.sketches.length != 0) {
				return state.loadedPage.objects.sketches[state.loadedPage.objects.sketches.length -1];
			}else {
				return false;
			}
		},
		selectedPencil: (state) => {
			return state.pencils[state.selectedPencilId];
		},

		// TextBoxes
		textSelection: (state) => {
			if(state.focusedObjectType == "textBoxes") {
				let quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
				if(quill) {
					if(state.openedDialog == false) {
						return quill.getSelection();
					}
				}
			}

			return false;
		},
		getFormat: (state) => (options) => {
			if(state.focusedObjectType == "textBoxes") {
				let quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
				if(quill) {
					return quill.getFormat(options.index, options.length)[options.format];
				}
				return false;
			}
		},
	},
	actions: {
		// Page
		pointerUp() {
			this.setPointer({down: false, x: false, y: false, pressure: false,});
		},

		// Sketches
		/*selectPencil: function(options) {
			this.selectPencil({id: options.id, });
			this.switchEditingMode({mode: "drawing", });
		},*/

		// System
		setDebug(value) {
			this.debug = value;
		},
		openedDialog() {
			this.openedDialog = true;
		},
		closedDialog() {
			this.openedDialog = false;
		},
		exportStarted() {
			this.exportInProgress = true;
		},
		exportStopped() {
			this.exportInProgress = false;
		},

		// Navbar
		selectNavbarTab(options) {
			this.activeNavbarTab = options.id;
		},

		// Page
		switchEditingMode(options) {
			this.editingMode = options.mode;
			this.editingModeAdditionalInformation = options.information;
		},
		setPageTitle(options) {
			this.loadedPage.title = options.title;
		},
		setScrollOffset(options) {
			this.loadedPage.scrollOffsetX = options.x;
			this.loadedPage.scrollOffsetY = options.y;
		},
		setPointer(options) {
			this.pointer = options;
		},
		updateFocusedObjects(options) {
			this.focusedObjects = options.objects;
		},
		scroll(options) {
			if(options.x != undefined) {
				this.loadedPage.scrollOffsetX = options.x;
				document.getElementsByClassName("PageContainer")[0].scrollLeft = options.x * this.loadedPage.scale;
			}
			if(options.y != undefined) {
				this.loadedPage.scrollOffsetY = options.y;
				document.getElementsByClassName("PageContainer")[0].scrollTop = options.y * this.loadedPage.scale;
			}
		},
		setScale(options) {
			if(options.scale >= 0.1) {
				this.loadedPage.scale = options.scale;
			}
		},
		selectBackground(options) {
			this.loadedPage.background.type = options.type;
		},
		setBackgroundSize(options) {
			this.loadedPage.background.size = options.size;
		},
		setPageWidth(options) {
			this.loadedPage.size.x = options.width;
		},
		setPageHeight(options) {
			this.loadedPage.size.y = options.height;
		},

		// Sketch
		newSketch(color) {
			this.loadedPage.objects.sketches.push({
				coordinates: [],
				color: JSON.parse(JSON.stringify(color)),
			});
		},
		drawLine(options) {
			options.sketch.coordinates.push({x: options.x, y: options.y, width: options.pressure});
		},
		addPencil(options) {
			this.pencils.push({color: options.color, width: options.width,});
		},
		changePencilColor(options) {
			this.pencils[options.id].color = options.color;
		},
		changePencilWidth(options) {
			this.pencils[options.id].width = options.width;
		},
		selectPencil(options) {
			if(options.id < this.pencils.length) {
				this.selectedPencilId = options.id;
			}
		},
		switchPencilSettings(options) {
			this.openedPencilSettingsId = options.id;
		},
		closePencilSettings() {
			this.openedPencilSettingsId = -1;
		},

		// Text Boxes
		newTextBox(options) {
			console.log("newTextBox");
			this.loadedPage.objects.textBoxes.push({
				position: {
					x: options.x,
					y: options.y,
					width: options.width,
					height: options.height,
					rotation: 0,
					transformOrigin: "50% 50%",
				},
				content: {},
				quill: undefined,
			});
		},
		setTextBoxContent(options) {
			this.loadedPage.objects.textBoxes[options.id].content = options.content;
		},
		assignQuillToTextBox(options) {
			this.loadedPage.objects.textBoxes[options.id].quill = options.quill;
		},
		formatText(options) {
			if(this.focusedObjectType == "textBoxes") {
				let quill;
				if(options.id) {
					quill = this.loadedPage.objects.textBoxes[options.id].quill;
				}else {
					quill = this.loadedPage.objects.textBoxes[this.focuseObjectId].quill;
				}

				quill.format(options.format, options.value, "api");
			}
		},
		removeFormat() {
			if(this.focusedObjectType == "textBoxes") {
				let quill = this.loadedPage.objects.textBoxes[this.focuseObjectId].quill;
				let selection = quill.getSelection();

				quill.removeFormat(selection.index, selection.length, "api");
			}
		},
		insertText(options) {
			if(this.focusedObjectType == "textBoxes") {
				let quill = this.loadedPage.objects.textBoxes[this.focuseObjectId].quill;
				let selection = quill.getSelection();
				quill.insertText(selection.index, options.text, {});
			}
		},
		insertEmbed(options) {
			let quill = this.loadedPage.objects.textBoxes[this.focuseObjectId].quill;
			let selection = quill.getSelection();
			console.log(selection);
			quill.insertEmbed(selection.index, options.type, options.content);
		},

		// Shapes
		newShape(options) {
			console.log("newShape");
			this.loadedPage.objects.shapes.push({
				type: options.type,
				position: {
					x: options.x,
					y: options.y,
					width: options.width,
					height: options.height,
					rotation: 0,
					transformOrigin: "50% 50%",
				},
				strokeWeight: options.strokeWeight,
				color: {
					stroke: "#000000",
					fill: "#ffffff00",
				},
				distort: options.distort,
			});
		},
		setShapeFillColor(options) {
			this.loadedPage.objects.shapes[options.id].color.fill = options.color;
		},
		setShapeStrokeColor(options) {
			this.loadedPage.objects.shapes[options.id].color.stroke = options.color;
		},
		setShapeDistort(options) {
			this.loadedPage.objects.shapes[options.id].distort = options.distort;
		},

		// Objects
		moveObject(options) {
			if(options.x >= 0 && options.x <= this.loadedPage.size.x) {
				this.loadedPage.objects[options.type][options.id].position.x = options.x;
			}
			if(options.y >= 0 && options.y <= this.loadedPage.size.y) {
				this.loadedPage.objects[options.type][options.id].position.y = options.y;
			}
		},
		resizeObject(options) {
			this.loadedPage.objects[options.type][options.id].position.width = options.width;
			this.loadedPage.objects[options.type][options.id].position.height = options.height;
		},
		rotateObject(options) {
			this.loadedPage.objects[options.type][options.id].position.rotation = options.rotation;
		},
		setObjectTransformOrigin(options) {
			this.loadedPage.objects[options.type][options.id].position.transformOrigin = options.transformOrigin;
		},
	}
});
