<template>
  <div id="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
    v-on:pointerleave="pointerleave"
    :style="{width: size.x+'px', height: size.y+'px'}"
  >
    <svg class="sketch" :style="{width: size.x, height: size.y}">
        <g v-for="(sketch, index) in objects.sketch" :key="index">
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
        </g>
    </svg>
  </div>
</template>

<script>
import { Sketch } from "../mixins/sketch.js";

export default {
	components: {
	},
    mixins: [Sketch],
	props: {
		navbarHeight: {
			type: Number,
		},
		scrollOffsetX: {
			type: Number,
		},
		scrollOffsetY: {
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
			if(this.debug) {
				console.log("pointerdown");
				console.log(event);
			}
			this.pointer.down = true;
			this.pointer.x = event.x;
			this.pointer.y = event.y;
			
            this.newSketch(this.selectedColor);
		},
		pointermove: function(event) {
			if(this.pointer.down) {
				if(this.debug) {
					console.log("pointermove");
					console.log(event);
				}

				let globalX = event.x;
				let globalY = event.y;

				let offsetX = document.getElementById("Page").offsetLeft - this.scrollOffsetX;
				let offsetY = document.getElementById("Page").offsetTop - this.scrollOffsetY;

				this.pointer.x = globalX - offsetX;
				this.pointer.y = globalY - offsetY;
				this.pointer.pressure = 2*(event.pressure || 0.5);
                                
                if(this.shouldDrawLine(this.pointer.x, this.pointer.y)) {
				    this.drawLine(this.pointer.x, this.pointer.y, this.pointer.pressure);
                }
			}
		},
		pointerup: function(event) {
			if(this.debug) {
				console.log("pointerup");
				console.log(event);
			}
			this.pointer.down = false;
			this.pointer.x = false;
			this.pointer.y = false;
			this.pointer.pressure = false;
		},
		pointerleave: function(event) {
			if(this.debug) {
				console.log("pointerleave");
				console.log(event);
			}
			this.pointer.down = false;
			this.pointer.x = false;
			this.pointer.y = false;
			this.pointer.pressure = false;
		},
	},
};
</script>

<style scoped>
.Page {
    touch-action: none;
}
.sketch {
    width: 100%;
    position: relative;
    z-index: -1;
}
</style>