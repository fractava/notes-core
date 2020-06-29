export default {
    state: {
        debug: false,
        loadedPage: {
            title: "Baum",
            objects: {
				sketch: [
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
    },
    mutations: {
        setDebug(state, value) {
            state.debug = value;
        },
        setPageTitle(state, options) {
            state.loadedPage.title = options.title;
        },
        newSketch(state, color) {
            state.loadedPage.objects.sketch.push({
                coordinates: [],
                color: JSON.parse(JSON.stringify(color))
            });
        },
        drawLine: function(state, options) {
            options.sketch.coordinates.push({x: options.x, y: options.y, width: options.pressure});
        },
        setScrollOffset: function(state, options) {
            state.loadedPage.scrollOffsetX = options.x;
            state.loadedPage.scrollOffsetY = options.y;
        },
        addPencil: function(state, options) {
            state.pencils.push({color: options.color, width: options.width,})
        },
        selectPencil: function(state, options) {
            if(options.id < state.pencils.length) {
                state.selectedPencilId = options.id;
            }
            console.log("selectPencil");
        },
        selectNavbarTab: function(state, options) {
            state.activeNavbarTab = options.id;
        },
        switchPencilSettings(state, options) {
            state.openedPencilSettingsId = options.id;
        },
        closePencilSettings(state, options) {
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
    },
    actions: {
        pointerUp: function({ commit }) {
            commit("setPointer", {down: false, x: false, y: false, pressure: false,});
        }
    }
};
