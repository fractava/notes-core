export default {
    state: {
        debug: false,
        loadedPage: {
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
    },
    mutations: {
        setDebug(state, value) {
            state.debug = value;
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
        selectPencil: function(state, options) {
            if(options.id < state.pencils.length) {
                state.selectedPencilId = options.id;
            }
            console.log("selectPencil");
        },
        selectNavbarTab: function(state, options) {
            state.activeNavbarTab = options.id;
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
};
