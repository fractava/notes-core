<template>
  <div class="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
  >
    <svg style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" v-for="(sketch, index) in objects.sketch" :key="index">
        <line
            v-for="(line, index) in sketch.coordinates"
            :x1="line.x"
            :y1="line.y"
            :x2="sketch.coordinates[index + 1].x"
            :y2="sketch.coordinates[index + 1].y"
            v-if="index != sketch.coordinates.length-1"
            :style="{'stroke-width': line.width, stroke: sketch.color,}"
        />
    </svg>
    <span>pointer: {{ pointer }}</span><br>
  </div>
</template>

<script>
export default {
    props: {
    },
    mounted: function() {
        console.log("mounted");
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
        };
    },
    methods: {
        pointerdown: function(event) {
            console.log("pointerdown");
            console.log(event);
            this.pointer.down = true;
            this.pointer.x = event.x;
            this.pointer.y = event.y;
            this.objects.sketch.push({coordinates: [], color: "#ffffff"});
        },
        pointermove: function(event) {
            if(this.pointer.down) {
                console.log("pointermove");
                console.log(event);
                this.pointer.x = event.x;
                this.pointer.y = event.y;
                this.pointer.pressure = event.pressure || 0.5;

                this.objects.sketch[this.objects.sketch.length -1].coordinates.push({x: event.x, y: event.y, width: event.pressure});
            }
        },
        pointerup: function(event) {
            console.log("pointerup");
            console.log(event);
            this.pointer.down = false;
            this.pointer.x = false;
            this.pointer.y = false;
            this.pointer.pressure = false;
        },
    },
}
</script>

<style scoped>
.Page {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>