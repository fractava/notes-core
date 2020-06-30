<template>
    <div
        class="pageTitleContainer"
        v-on:pointerdown="stopPropagation"
        v-on:pointermove="stopPropagation"
        v-on:pointerup="stopPropagation"
        v-on:pointerleave="stopPropagation"
    >
        <md-field
            class="pageTitle"
            :style="{top: navbarHeight+'%'}"
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
		...mapState({
			loadedPage: state => state.core.loadedPage,
			navbarHeight: state => state.core.navbarHeight,
		}),
	},
};
</script>

<style scoped>
.pageTitleContainer {
    position: absolute;
    left: 0px;
    margin-top: 20px;
    margin-left: 20px;
    z-index: 2;
}
</style>