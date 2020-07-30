<template>
    <svg class="sketch" :style="{width: loadedPage.size.x + 'px', height: loadedPage.size.y + 'px'}">
        <g v-for="(sketch, index) in loadedPage.objects.sketch" :key="index" :opacity="sketch.color.a">
            <line
                v-for="(line, index) in sketch.coordinates"
                :key="'sketch-' + index"
                :x1="line.x"
                :y1="line.y"
                :x2="sketch.coordinates[index + 1].x"
                :y2="sketch.coordinates[index + 1].y"
                v-if="index != sketch.coordinates.length-1"
                :style="{'stroke-width': line.width, stroke: sketchRGBString(sketch),}"
            />
            <circle
                v-for="(line, index) in sketch.coordinates"
                :key="'line-' + index"
                :cx="line.x"
                :cy="line.y"
                :r="line.width/2"
                stroke=""
                stroke-width="0"
                :fill="sketchRGBString(sketch)"
            />
        </g>
    </svg>
</template>

<script>
import { mapState } from "vuex";
import * as tinycolor from "tinycolor2";

export default {
	computed: {
    ...mapState({
		  loadedPage: state => state.core.loadedPage,
	  }),
  },
  methods: {
    sketchRGBString: function(sketch) {
      console.log(tinycolor);
      var color = tinycolor(sketch.color);
      color.setAlpha(1);
      return color.toRgbString();
    },
  },
};
</script>
