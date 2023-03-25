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
            v-model="title"
            :disabled="coreState.editingMode != 'editing'"
          ></md-input>
        </md-field>
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

export default {
	computed: {
		title: {
			set(title) {
				this.$store.commit("setPageTitle", { title }, {module: "core" });
			},
			get() {
				return this.coreState.loadedPage.title;
			}
		},
		inputHeight: function() {
			let size = this.coreState.loadedPage.background.size;

			while(size < 32) {
				size = size + this.coreState.loadedPage.background.size;
			}

			return size;
		},
		inputWidth: function() {
			let size = this.coreState.loadedPage.background.size;

			while(size < 250) {
				size = size + this.coreState.loadedPage.background.size;
			}

			return size;
		},
		containerStyle: function() {
			return {
				"top": this.coreState.loadedPage.background.size + 1  + "px",
				"left": this.coreState.loadedPage.background.size + 1 + "px",
				"height": this.inputHeight   + "px",
				"min-width": this.inputWidth - 1 + "px",
			};
		},
		...mapStores(useCoreStore),
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
