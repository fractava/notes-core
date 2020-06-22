 <template>
  <div class="FractavaNotes">
    <navbar :style="{height: navbarHeight+'%'}" :navbarHeight="navbarHeight" />
    <pageContainer :style="{height: 100-navbarHeight+'%'}">
        <page :navbarHeight="navbarHeight" />
    </pageContainer>
  </div>
</template>

<script>
import Page from "./Page.vue";
import Navbar from "./Navbar.vue";
import PageContainer from "./PageContainer.vue";

export default {
	components: {
		Page,
        Navbar,
        PageContainer,
	},
	props: {
	},
	mounted: function() {
		console.log("mounted");
	},
	data: function() {
		return {
            navbarHeight: 10,
		};
	},
	computed: {

	},
	methods: {
	}
};
</script>

<style scoped>
.FractavaNotes {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>