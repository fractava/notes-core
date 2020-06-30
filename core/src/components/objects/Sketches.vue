<template>
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
            <circle 
                v-for="(line, index) in sketch.coordinates"
				:key="index"
                :cx="line.x"
                :cy="line.y"
                :r="line.width/2"
                stroke=""
                stroke-width="0"
                :fill="sketch.color"
            />
        </g>
    </svg>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: mapState({
		loadedPage: state => state.core.loadedPage,
	}),
};
</script>