export default {
	state: {
		debug: false,
		loadedPage: {
			title: "Baum",
			objects: {
				sketch: [
				],
				textBoxes: [
					{
						position: {
							x: 50,
							y: 100,
							width: 500,
							height: 600,
						},
						content: "Dies ist ein Test",
						quill: undefined,
					},
				],
				forms: {
				},
				images: {
				},
				files: {
				},
			},
			background: {
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
		editingMode: "editing",
	},
	mutations: {
		switchEditingMode(state, options) {
			state.editingMode = options.mode;
		},
		setDebug(state, value) {
			state.debug = value;
		},
		setPageTitle(state, options) {
			state.loadedPage.title = options.title;
		},
		newSketch(state, color) {
			state.loadedPage.objects.sketch.push({
				coordinates: [],
				color: JSON.parse(JSON.stringify(color)),
			});
		},
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
		drawLine(state, options) {
			options.sketch.coordinates.push({x: options.x, y: options.y, width: options.pressure});
		},
		setScrollOffset(state, options) {
			state.loadedPage.scrollOffsetX = options.x;
			state.loadedPage.scrollOffsetY = options.y;
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
		selectNavbarTab(state, options) {
			state.activeNavbarTab = options.id;
		},
		switchPencilSettings(state, options) {
			state.openedPencilSettingsId = options.id;
		},
		closePencilSettings(state) {
			state.openedPencilSettingsId = -1;
		},
		setPointer(state, options) {
			state.pointer = options;
		},
		setScale(state, options) {
			if(options.scale >= 0.1) {
				state.loadedPage.scale = options.scale;
			}
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
	},
	getters: {
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
		focusedObject: (state) => (options) => {
			return state.objects[state.focusedObjectType][state.focuseObjectId];
		},
	},
	actions: {
		pointerUp: function({ commit }) {
			commit("setPointer", {down: false, x: false, y: false, pressure: false,});
		},
	}
};
