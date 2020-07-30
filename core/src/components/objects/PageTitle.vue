<template>
    <div
        class="pageTitleContainer"
        v-on:pointerdown="stopPropagation"
        v-on:pointermove="stopPropagation"
        v-on:pointerup="stopPropagation"
        v-on:pointerleave="stopPropagation"
        :style="{'top': loadedPage.background.size + 1  + 'px', 'left': loadedPage.background.size + 1 + 'px', 'height': inputSize   + 'px', 'min-width': loadedPage.background.size * 5 - 1 + 'px'}"
    >
        <md-field
            class="pageTitle"
            md-inline
        >
        <label>Title</label>
        <md-input v-model="title"></md-input>
        </md-field>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	methods: {
		stopPropagation: function(event) {
			console.log("preventing event");
			event.stopPropagation();
			this.$store.dispatch("pointerUp");
		},
	},
	computed: {
		title: {
			set(title) {
				this.$store.commit("setPageTitle", { title }, {module: "core" });
			},
			get() {
				return this.loadedPage.title;
			}
		},
    inputSize: function() {
      let size = this.loadedPage.background.size;

      while(size < 32) {
        size = size + this.loadedPage.background.size;
      }

      return size;
    },
		...mapState({
			loadedPage: state => state.core.loadedPage,
			navbarHeight: state => state.core.navbarHeight,
      loadedPage: state => state.core.loadedPage,
		}),
	},
};
</script>

<style scoped>
.pageTitleContainer {
    position: absolute;
    left: 0px;
    z-index: 2;
    display: grid;
    place-items: end;
    transition: all 1s ease 0s;
    background: white;
}
.pageTitle {
  margin: 0px;
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
