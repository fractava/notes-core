 <template>
  <div class="FractavaNotes">
    <navbar :style="{height: navbarHeight+'%'}" :navbarHeight="navbarHeight" />
    <p>{{ debug }}</p>
    <pageContainer
        v-on:scroll.native="scroll"
        :style="{height: 100-navbarHeight+'%'}"
    >
        <page :navbarHeight="navbarHeight" :scrollOffsetX="scrollOffsetX" :scrollOffsetY="scrollOffsetY"/>
    </pageContainer>
  </div>
</template>

<script>
import Page from "./Page.vue";
import Navbar from "./Navbar.vue";
import PageContainer from "./PageContainer.vue";
import { mapState } from 'vuex'

export default {
	components: {
		Page,
		Navbar,
		PageContainer,
	},
	data: function() {
		return {
			navbarHeight: 10,
			scrollOffsetX: 0,
			scrollOffsetY: 0,
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
	computed: mapState(['debug']),
};
</script>

<style scoped>
.FractavaNotes {
    width: 100%;
    height: 100%;
}
</style>