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
import Page from "./Page.vue";
import Navbar from "./Navbar.vue";
import PageContainer from "./PageContainer.vue";
import { mapState } from 'vuex';

export default {
	components: {
		Page,
		Navbar,
		PageContainer,
	},
    mounted: function() {
    },
	data: function() {
		return {
		};
	},
	methods: {
		scroll: function(event) {
			if(this.debug) {
				console.log(event);
			}
			this.scrollOffsetX = event.srcElement.scrollLeft;
			this.scrollOffsetY = event.srcElement.scrollTop;
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