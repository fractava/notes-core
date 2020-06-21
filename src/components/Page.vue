<template>
  <div class="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
  >
    <svg style="width: 100%; height: 100%;">
        <g v-for="(sketch, index) in objects.sketch" :key="index" :style="{stroke: sketch.color,}">
            <line
                v-for="(line, index) in sketch.coordinates"
                :x1="line.x"
                :y1="line.y"
                :x2="sketch.coordinates[index + 1].x"
                :y2="sketch.coordinates[index + 1].y"
                v-if="index != sketch.coordinates.length-1"
                :style="{'stroke-width': line.width,}"
            />
        </g>
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
                    {
                        coordinates: [
                            {
                                x: 0,
                                y: 0,
                                width: 1,
                            },
                            {
                                x: 10,
                                y: 15,
                                width: 2,
                            },
                            {
                                x: 100,
                                y: 150,
                                width: 1,
                            },
                        ],
                        color: "#ffffff",
                    
                    },
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
        },
        pointermove: function(event) {
            if(this.pointer.down) {
                console.log("pointermove");
                console.log(event);
                this.pointer.x = event.x;
                this.pointer.y = event.y;
                this.pointer.pressure = event.pressure || 0.5;
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