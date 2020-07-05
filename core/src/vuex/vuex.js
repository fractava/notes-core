export default {
	state: {
		debug: false,
		loadedPage: {
			title: "Baum",
			objects: {
				sketch: [
				],
				textBoxes: [
				],
				forms: {
				},
				images: {
				},
				files: {
				},
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
				color: "#000000",
				width: 10,
			},
			{
				color: "#ff0000",
				width: 15,
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
		editingMode: "addTextBox",
	},
	mutations: {
		// System
		setDebug(state, value) {
			state.debug = value;
		},

		// Navbar
		selectNavbarTab(state, options) {
			state.activeNavbarTab = options.id;
		},

		// Page
		switchEditingMode(state, options) {
			state.editingMode = options.mode;
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
			console.log(options);
		},
		scroll(state, options) {
			if(options.x != undefined) {
				console.log("scroll x");
				state.loadedPage.scrollOffsetX = options.x;
				document.getElementsByClassName("PageContainer")[0].scrollLeft = options.x * state.loadedPage.scale;
				console.log(document.getElementsByClassName("PageContainer")[0].scrollLeft);
			}else {
				console.log("no scroll x");
			}
			if(options.y != undefined) {
				console.log("scroll y");
				state.loadedPage.scrollOffsetY = options.y;
				document.getElementsByClassName("PageContainer")[0].scrollTop = options.y * state.loadedPage.scale;
			}else {
				console.log("no scroll y")
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
		selectPencil(state, options) {
			if(options.id < state.pencils.length) {
				state.selectedPencilId = options.id;
			}
			console.log("selectPencil");
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
				content: "",
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
				state.loadedPage.objects.textBoxes[state.focuseObjectId].quill.format(options.format, options.value, "user");
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

			console.log(state.loadedPage.objects.textBoxes[options.id]);
		},
		resizeTextBox(state, options) {
			state.loadedPage.objects.textBoxes[options.id].position.width = options.width;
			state.loadedPage.objects.textBoxes[options.id].position.height = options.height;
		},
	},
	getters: {
		// Page
		focusedObject: (state) => (options) => {
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
				if(state.loadedPage.objects.textBoxes[state.focuseObjectId].quill) {
					return state.loadedPage.objects.textBoxes[state.focuseObjectId].quill.getSelection();
				}
			}

			return false;
		},
		getFormat: (state) => (options) => {
			if(state.focusedObjectType == "textBoxes") {
				if(state.loadedPage.objects.textBoxes[state.focuseObjectId].quill) {
					return state.loadedPage.objects.textBoxes[state.focuseObjectId].quill.getFormat(options.index, options.length)[options.format];
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
	}
};
