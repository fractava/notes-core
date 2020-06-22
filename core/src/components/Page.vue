<template>
  <div id="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
    v-on:pointerleave="pointerleave"
    :style="{width: size.x+'px', height: size.y+'px'}"
  >
    <svg class="sketch" v-for="(sketch, index) in objects.sketch" :style="{top: navbarHeight+'%', height: 100-navbarHeight+'%'}" :key="index" v-on:onclick="console.log('test')">
        <line
            v-for="(line, index) in sketch.coordinates"
            :key="index"
            :x1="line.x"
            :y1="line.y"
            :x2="sketch.coordinates[index + 1].x"
            :y2="sketch.coordinates[index + 1].y"
            v-if="index != sketch.coordinates.length-1"
            :style="{'stroke-width': line.width, stroke: sketch.color,}"
        />
    </svg>
  </div>
</template>

<script>
export default {
    components: {
    },
	props: {
        navbarHeight: {
            type: Number,
        }
    },
	data: function() {
		return {
			pointer: {
				down: false,
				x: false,
				y: false,
				pressure: false,
			},
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
			selectedColor: "#000000",
            size: {
                x: 4000,
                y: 4000,
            }
		};
	},
	methods: {
		pointerdown: function(event) {
			console.log("pointerdown");
			//console.log(event);
			this.pointer.down = true;
			this.pointer.x = event.x;
			this.pointer.y = event.y;
			this.objects.sketch.push({coordinates: [], color: JSON.parse(JSON.stringify(this.selectedColor))});
		},
		pointermove: function(event) {
			if(this.pointer.down) {
				console.log("pointermove");
				console.log(event);

                let globalX = event.x;
                let globalY = event.y;

                let offsetX = document.getElementById("Page").offsetLeft;
                let offsetY = document.getElementById("Page").offsetTop;

				let pointerX = globalX - offsetX;
				let pointerY = globalY - offsetY;
				let pressure = 2*(event.pressure || 0.5);

				this.pointer.x = pointerX;
				this.pointer.y = pointerY;
				this.pointer.pressure = pressure;
                
				let lastSketch = this.objects.sketch[this.objects.sketch.length -1];

				let drawLine = false;
				if(lastSketch.coordinates.length == 0) {
					console.log("first Line of Sketch");
					drawLine = true;
				} else {
					let lastCoordinates = lastSketch.coordinates[lastSketch.coordinates.length -1];
					console.log(lastCoordinates);

					if(this.distance({x: pointerX, y: pointerY}, lastCoordinates) > 3) {
						drawLine = true;
					}
				}
				if(drawLine) {
					lastSketch.coordinates.push({x: pointerX, y: pointerY, width: pressure,});
				} else {
					console.log("skipping line");
				}
			}
		},
		pointerup: function(/*event*/) {
			console.log("pointerup");
			//console.log(event);
			this.pointer.down = false;
			this.pointer.x = false;
			this.pointer.y = false;
			this.pointer.pressure = false;
		},
        pointerleave: function(event) {
            this.pointer.down = false;
			this.pointer.x = false;
			this.pointer.y = false;
			this.pointer.pressure = false;
        },
		distance: function(coordinate1, coordinate2) {
			let a = coordinate1.x - coordinate2.x;
			let b = coordinate1.y - coordinate2.y;
			return Math.sqrt( a*a + b*b );
		}
	},
};
</script>

<style scoped>
.Page {
    touch-action: none;
}
.sketch {
    width: 100%;
    position: absolute;
    left: 0px;
    z-index: -1;
}
</style>