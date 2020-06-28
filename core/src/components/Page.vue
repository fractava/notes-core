<template>
  <div id="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
    v-on:pointerleave="pointerleave"
    :style="{width: loadedPage.size.x+'px', height: loadedPage.size.y+'px'}"
  >
    <svg class="sketch" :style="{width: loadedPage.size.x, height: loadedPage.size.y}">
        <g v-for="(sketch, index) in loadedPage.objects.sketch" :key="index">
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
import { mapState, mapGetters } from 'vuex';

mapGetters

export default {
	components: {
	},
    mixins: [Sketch],
	data: function() {
		return {
			pointer: {
				down: false,
				x: false,
				y: false,
				pressure: false,
			},
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
			
            this.$store.commit("newSketch", this.selectedColor, {module: 'core' });
		},
		pointermove: function(event) {
			if(this.pointer.down) {
				if(this.debug) {
					console.log("pointermove");
					console.log(event);
				}

				let globalX = event.x;
				let globalY = event.y;

				let offsetX = this.$el.offsetLeft - this.scrollOffsetX;
				let offsetY = this.$el.offsetTop - this.scrollOffsetY;

				this.pointer.x = globalX - offsetX;
				this.pointer.y = globalY - offsetY;
				this.pointer.pressure = 2*(event.pressure || 0.5);
                                
                if(this.shouldDrawLine(this.pointer.x, this.pointer.y)) {
				    this.$store.commit("drawLine", {sketch: this.lastSketch, x: this.pointer.x, y: this.pointer.y, pressure: this.pointer.pressure}, {module: 'core' });
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
    computed: {
        ...mapState({
        debug: state => state.core.debug,
        loadedPage: state => state.core.loadedPage,
        navbarHeight: state => state.core.navbarHeight,
        selectedColor: state => state.core.selectedColor,
        scrollOffsetX: state => state.core.loadedPage.scrollOffsetX,
        scrollOffsetY: state => state.core.loadedPage.scrollOffsetY,
        }),
        ...mapGetters([
            "lastSketch",
        ]),
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