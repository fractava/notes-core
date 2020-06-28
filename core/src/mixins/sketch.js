export const Sketch = {
	methods: {
        shouldDrawLine: function(x, y) {
            console.log(this.lastSketch);
            let drawLine = false;
            
			if(this.lastSketch.coordinates.length == 0) {
                // First Line of Sketch -> draw line
				if(this.debug) {
					console.log("first Line of Sketch");
				}
				drawLine = true;
			} else {
				let lastCoordinates = this.lastSketch.coordinates[this.lastSketch.coordinates.length -1];
                
                console.log(lastCoordinates);

                console.log(this.distance({x, y}, lastCoordinates) );

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
    },
};