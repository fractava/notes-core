<template>
  <div
    class="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
    v-on:pointerleave="pointerleave"
    :style="{width: loadedPage.size.x+'px', height: loadedPage.size.y+'px'}"
  >
    <sketches />
  </div>
</template>

<script>
import { Sketch } from "../../mixins/sketch.js";
import Sketches from "../objects/Sketches.vue";
import { mapState, mapGetters } from 'vuex';

export default {
	components: {
        Sketches,
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
            
            let pageCoordinates = this.globalCoordinatesToPageCoordinates(event.x, event.y);
            this.pointer.x = pageCoordinates.x;
            this.pointer.y = pageCoordinates.y;
			this.pointer.pressure = this.selectedPencil.width * 2 * (event.pressure || 0.5);
			
            this.$store.commit("newSketch", this.selectedPencil.color, {module: 'core' });

            this.$store.commit("drawLine", {sketch: this.lastSketch, x: this.pointer.x, y: this.pointer.y, pressure: this.pointer.pressure}, {module: 'core' });

            this.$store.commit("closePencilSettings", {}, {module: 'core' });
},
		pointermove: function(event) {
			if(this.pointer.down) {
				if(this.debug) {
					console.log("pointermove");
					console.log(event);
				}

                let pageCoordinates = this.globalCoordinatesToPageCoordinates(event.x, event.y);
                
                this.pointer.x = pageCoordinates.x;
                this.pointer.y = pageCoordinates.y;
				this.pointer.pressure = this.selectedPencil.width * 2 * (event.pressure || 0.5);
                                
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
        globalCoordinatesToPageCoordinates(globalX, globalY) {
            let offsetX = this.$el.offsetLeft - this.scrollOffsetX;
            let offsetY = this.$el.offsetTop - this.scrollOffsetY;
            
            let pageX = globalX - offsetX;
            let pageY = globalY - offsetY;
            
            return {x: pageX, y: pageY,};
        }
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
            "selectedPencil",
        ]),
    },
};
</script>

<style scoped>
.Page {
    touch-action: none;
    background-color: white;
}
.sketch {
    width: 100%;
    position: relative;
}
</style>