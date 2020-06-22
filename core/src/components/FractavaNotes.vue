 <template>
  <div class="FractavaNotes">
    <navbar style="height: 30%;" />
    <page style="height: 70%;" />
  </div>
</template>

<script>
import Page from "./Page.vue";
import Navbar from "./Navbar.vue";

export default {
	components: {
		Page,
        Navbar,
	},
	props: {
	},
	mounted: function() {
		console.log("mounted");
	},
	data: function() {
		return {
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
    background-color: gray;
    touch-action: none;
}
</style>