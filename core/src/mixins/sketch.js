export const Sketch = {
	methods: {
        lastSketch: function () {
            return this.objects.sketch[this.objects.sketch.length -1];
        },
        newSketch: function(color){
            this.objects.sketch.push({
                coordinates: [],
                color: JSON.parse(JSON.stringify(color))
            });
        },
        shouldDrawLine: function(x, y) {
            let lastSketch = this.lastSketch();
            let drawLine = false;
            
			if(lastSketch.coordinates.length == 0) {
                // First Line of Sketch -> draw line
				if(this.debug) {
					console.log("first Line of Sketch");
				}
				drawLine = true;
			} else {
				let lastCoordinates = lastSketch.coordinates[lastSketch.coordinates.length -1];

				if(this.distance({x, y}, lastCoordinates) > 3) {
                    // distance to last line > 3 -> draw line
					drawLine = true;
				}
			}
			if(!drawLine && this.debug) {
				console.log("skipping line");
			}
            
            return drawLine;
        },
        drawLine: function(x, y, pressure) {
            let lastSketch = this.lastSketch();

            lastSketch.coordinates.push({x, y, width: pressure});
        },
    },
};