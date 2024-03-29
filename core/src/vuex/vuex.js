export default {
	state: {
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
	},
	mutations: {
		// System
		setDebug(state, value) {
			state.debug = value;
		},
		openedDialog(state) {
			state.openedDialog = true;
		},
		closedDialog(state) {
			state.openedDialog = false;
		},
		exportStarted(state) {
			state.exportInProgress = true;
		},
		exportStopped(state) {
			state.exportInProgress = false;
		},

		// Navbar
		selectNavbarTab(state, options) {
			state.activeNavbarTab = options.id;
		},

		// Page
		switchEditingMode(state, options) {
			state.editingMode = options.mode;
			state.editingModeAdditionalInformation = options.information;
		},
		setPageTitle(state, options) {
			state.loadedPage.title = options.title;
		},
		setScrollOffset(state, options) {
			state.loadedPage.scrollOffsetX = options.x;
			state.loadedPage.scrollOffsetY = options.y;
		},
		setPointer(state, options) {
			state.pointer = options;
		},
		updateFocusedObjects(state, options) {
			state.focusedObjects = options.objects;
		},
		scroll(state, options) {
			if(options.x != undefined) {
				state.loadedPage.scrollOffsetX = options.x;
				document.getElementsByClassName("PageContainer")[0].scrollLeft = options.x * state.loadedPage.scale;
			}
			if(options.y != undefined) {
				state.loadedPage.scrollOffsetY = options.y;
				document.getElementsByClassName("PageContainer")[0].scrollTop = options.y * state.loadedPage.scale;
			}
		},
		setScale(state, options) {
			if(options.scale >= 0.1) {
				state.loadedPage.scale = options.scale;
			}
		},
		selectBackground(state, options) {
			state.loadedPage.background.type = options.type;
		},
		setBackgroundSize(state, options) {
			state.loadedPage.background.size = options.size;
		},
		setPageWidth(state, options) {
			state.loadedPage.size.x = options.width;
		},
		setPageHeight(state, options) {
			state.loadedPage.size.y = options.height;
		},

		// Sketch
		newSketch(state, color) {
			state.loadedPage.objects.sketches.push({
				coordinates: [],
				color: JSON.parse(JSON.stringify(color)),
			});
		},
		drawLine(state, options) {
			options.sketch.coordinates.push({x: options.x, y: options.y, width: options.pressure});
		},
		addPencil(state, options) {
			state.pencils.push({color: options.color, width: options.width,});
		},
		changePencilColor(state, options) {
			state.pencils[options.id].color = options.color;
		},
		changePencilWidth(state, options) {
			state.pencils[options.id].width = options.width;
		},
		selectPencil(state, options) {
			if(options.id < state.pencils.length) {
				state.selectedPencilId = options.id;
			}

		},
		switchPencilSettings(state, options) {
			state.openedPencilSettingsId = options.id;
		},
		closePencilSettings(state) {
			state.openedPencilSettingsId = -1;
		},

		// Text Boxes
		newTextBox(state, options) {
			console.log("newTextBox");
			state.loadedPage.objects.textBoxes.push({
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
		setTextBoxContent(state, options) {
			state.loadedPage.objects.textBoxes[options.id].content = options.content;
		},
		assignQuillToTextBox(state, options) {
			state.loadedPage.objects.textBoxes[options.id].quill = options.quill;
		},
		formatText(state, options) {
			if(state.focusedObjectType == "textBoxes") {
				let quill;
				if(options.id) {
					quill = state.loadedPage.objects.textBoxes[options.id].quill;
				}else {
					quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
				}

				quill.format(options.format, options.value, "api");
			}
		},
		removeFormat(state) {
			if(state.focusedObjectType == "textBoxes") {
				let quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
				let selection = quill.getSelection();

				quill.removeFormat(selection.index, selection.length, "api");
			}
		},
		insertText(state, options) {
			if(state.focusedObjectType == "textBoxes") {
				let quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
				let selection = quill.getSelection();
				quill.insertText(selection.index, options.text, {});
			}
		},
		insertEmbed(state, options) {
			let quill = state.loadedPage.objects.textBoxes[state.focuseObjectId].quill;
			let selection = quill.getSelection();
			console.log(selection);
			quill.insertEmbed(selection.index, options.type, options.content);
		},

		// Shapes
		newShape(state, options) {
			console.log("newShape");
			state.loadedPage.objects.shapes.push({
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
		setShapeFillColor(state, options) {
			state.loadedPage.objects.shapes[options.id].color.fill = options.color;
		},
		setShapeStrokeColor(state, options) {
			state.loadedPage.objects.shapes[options.id].color.stroke = options.color;
		},
		setShapeDistort(state, options) {
			state.loadedPage.objects.shapes[options.id].distort = options.distort;
		},

		// Objects
		moveObject(state, options) {
			if(options.x >= 0 && options.x <= state.loadedPage.size.x) {
				state.loadedPage.objects[options.type][options.id].position.x = options.x;
			}
			if(options.y >= 0 && options.y <= state.loadedPage.size.y) {
				state.loadedPage.objects[options.type][options.id].position.y = options.y;
			}
		},
		resizeObject(state, options) {
			state.loadedPage.objects[options.type][options.id].position.width = options.width;
			state.loadedPage.objects[options.type][options.id].position.height = options.height;
		},
		rotateObject(state, options) {
			state.loadedPage.objects[options.type][options.id].position.rotation = options.rotation;
		},
		setObjectTransformOrigin(state, options) {
			state.loadedPage.objects[options.type][options.id].position.transformOrigin = options.transformOrigin;
		},
	},
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
		lastSketch: function (state) {
			if(state.loadedPage.objects.sketches.length != 0) {
				return state.loadedPage.objects.sketches[state.loadedPage.objects.sketches.length -1];
			}else {
				return false;
			}
		},
		selectedPencil: function(state) {
			return state.pencils[state.selectedPencilId];
		},

		// TextBoxes
		textSelection: function(state) {
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
		pointerUp: function({ commit }) {
			commit("setPointer", {down: false, x: false, y: false, pressure: false,});
		},

		// Sketches
		selectPencil: function({commit}, options) {
			commit("selectPencil", {id: options.id, }, {module: "core" });
			commit("switchEditingMode", {mode: "drawing", }, {module: "core" });
		}
	}
};
