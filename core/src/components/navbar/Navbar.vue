 <template>
    <div class="navbar">
        <div class="navbarTabs">
            
        </div>
        <div class="navbarContent">
            <material-card><span>Test</span></material-card>
        </div>
    </div>
</template>

<script>
import materialCard from "../miscellaneous/MaterialCard.vue";
import tabSelector from "./TabSelector.vue";


export default {
	components: {
        materialCard,
	},
	data: function() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style scoped>
.navbar {
    background-color: #F8F8F8;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.navbarTabs {
    height: 20%;
}
.navbarContent {
    height: 80%;
}
</style>