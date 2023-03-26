<template>
    <div
        class="pageTitleContainer"
        :style="containerStyle"
    >
        <md-field
            class="pageTitle"
            md-inline
        >
          <label>Title</label>
          <md-input
            v-model="loadedPage.title"
            :disabled="editingMode != 'editing'"
          ></md-input>
        </md-field>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	computed: {
		inputHeight: function() {
			let size = this.loadedPage.background.size;

			while(size < 32) {
				size = size + this.loadedPage.background.size;
			}

			return size;
		},
		inputWidth: function() {
			let size = this.loadedPage.background.size;

			while(size < 250) {
				size = size + this.loadedPage.background.size;
			}

			return size;
		},
		containerStyle: function() {
			return {
				"top": this.loadedPage.background.size + 1  + "px",
				"left": this.loadedPage.background.size + 1 + "px",
				"height": this.inputHeight   + "px",
				"min-width": this.inputWidth - 1 + "px",
			};
		},
		...mapState(useCoreStore, {
			loadedPage: store => store.loadedPage,
			editingMode: store => store.editingMode,
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
