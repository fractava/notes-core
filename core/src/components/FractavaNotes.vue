 <template>
  <div class="FractavaNotes">
    <navbar :style="{height: navbarHeight+'%'}" :navbarHeight="navbarHeight" />
    <pageContainer
        v-on:scroll.native="scroll"
        :style="{height: 100-navbarHeight+'%'}"
    >
        <page/>
    </pageContainer>
  </div>
</template>

<script>
import Page from "./page/Page.vue";
import Navbar from "./navbar/Navbar.vue";
import PageContainer from "./page/PageContainer.vue";
import { mapState } from "vuex";

export default {
	components: {
		Page,
		Navbar,
		PageContainer,
	},
	mounted: function() {
	},
	methods: {
		scroll: function(event) {
			if(this.debug) {
				console.log(event);
			}
			let scrollOffsetX = event.srcElement.scrollLeft;
			let scrollOffsetY = event.srcElement.scrollTop;

			this.$store.commit("setScrollOffset", {x: scrollOffsetX, y: scrollOffsetY}, {module: "core" });
		}
	},
	computed: mapState({
		debug: state => state.core.debug,
		navbarHeight: state => state.core.navbarHeight,
		scrollOffsetX: state => state.core.loadedPage.scrollOffsetX,
		scrollOffsetY: state => state.core.loadedPage.scrollOffsetY,
	}),
};
</script>

<style scoped>
.FractavaNotes {
    width: 100%;
    height: 100%;
}
</style>