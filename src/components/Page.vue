 <template>
  <div class="Page"
    v-on:pointerdown="pointerdown"
    v-on:pointermove="pointermove"
    v-on:pointerup="pointerup"
  >
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
      }
  },
  computed: {

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
  }
}
</script>

<style scoped>
.Page {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>