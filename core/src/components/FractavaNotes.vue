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

<style>
.FractavaNotes {
    width: 100%;
    height: 100%;
}
.grid {
	background-size: var(--backgroundSize) var(--backgroundSize) !important;
	background-image:
	linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
	linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px) !important;
}
.dottedGrid {
	background-size: var(--backgroundSize) var(--backgroundSize) !important;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px) !important;
}
.lines {
	background-size: var(--backgroundSize) var(--backgroundSize) !important;
	background-image: linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px) !important;
}
@media print {
  .PageContainer {
  }
  .Page {
    overflow: visible !important;
    transform: none !important;
  }
  .navbar {
    display: none;
  }
  html, body, .PageContainer {
    width: fit-content !important;
    height: fit-content !important;
    overflow: visible !important;
  }
  body {
    -webkit-print-color-adjust: exact;
  }
  .handle {
    display: none !important;
  }
}
@page {
    size: landscape;
    -webkit-print-color-adjust: exact;
}
* {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
}
</style>
