export default {
	state: {
		debug: false,
		loadedPage: {
			title: "",
			objects: {
				sketch: [
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
		focusedObjectType: false,
		focuseObjectId: false,
		editingMode: "editing",
		editingModeAdditionalInformation: "",
		presetColors:["#f00", "#00ff00", "#00ff0055", "rgb(201, 76, 76)", "rgba(0,0,255,1)", "hsl(89, 43%, 51%)", "hsla(89, 43%, 51%, 0.6)"],
		openedDialog: false,
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
		focusObject(state, options) {
			state.focusedObjectType = options.type;
			state.focuseObjectId = options.id;
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

		// Sketch
		newSketch(state, color) {
			state.loadedPage.objects.sketch.push({
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
		moveTextBox(state, options) {
			if(options.x >= 0 && options.x <= state.loadedPage.size.x) {
				state.loadedPage.objects.textBoxes[options.id].position.x = options.x;
			}
			if(options.y >= 0 && options.y <= state.loadedPage.size.y) {
				state.loadedPage.objects.textBoxes[options.id].position.y = options.y;
			}
		},
		resizeTextBox(state, options) {
			state.loadedPage.objects.textBoxes[options.id].position.width = options.width;
			state.loadedPage.objects.textBoxes[options.id].position.height = options.height;
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
				},
				color: {
					stroke: "#000000",
					fill: "#ffffff00",
				},
			});
		},
		moveShape(state, options) {
			if(options.x >= 0 && options.x <= state.loadedPage.size.x) {
				state.loadedPage.objects.shapes[options.id].position.x = options.x;
			}
			if(options.y >= 0 && options.y <= state.loadedPage.size.y) {
				state.loadedPage.objects.shapes[options.id].position.y = options.y;
			}
		},
		resizeShape(state, options) {
			state.loadedPage.objects.shapes[options.id].position.width = options.width;
			state.loadedPage.objects.shapes[options.id].position.height = options.height;
		},
		setFillColor(state, options) {
			state.loadedPage.objects.shapes[options.id].color.fill = options.color;
		},
		setStrokeColor(state, options) {
			state.loadedPage.objects.shapes[options.id].color.stroke = options.color;
		},
	},
	getters: {
		// Page
		focusedObject: (state) => () => {
			return state.objects[state.focusedObjectType][state.focuseObjectId];
		},

		// Sketch
		lastSketch: function (state) {
			if(state.loadedPage.objects.sketch.length != 0) {
				return state.loadedPage.objects.sketch[state.loadedPage.objects.sketch.length -1];
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
