 <template>
  <div class="FractavaNotes">
    <span>FRACTAVA Notes</span><br>
    <page />
  </div>
</template>

<script>
import Page from "./Page.vue";

export default {
	components: {
		Page,
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