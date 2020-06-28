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
        selectedColor: "#000000",
    },
    mutations: {
        setDebug(state, value) {
            state.debug = value;
        },
        newSketch(state, color) {
            console.log(color);
            state.loadedPage.objects.sketch.push({
                coordinates: [],
                color: JSON.parse(JSON.stringify(color))
            });
        },
        drawLine: function(state, options) {
            store.getters.lastSketch.coordinates.push({x: options.x, y: options.y, width: options.pressure});
        },
    },
    getters: {
        lastSketch: function (state) {
            console.log(state.objects);
            if(state.objects.sketch.length != 0) {
                return state.loadedPage.objects.sketch[state.objects.sketch.length -1];
            }else {
                return false;
            }
        },
    },
};
