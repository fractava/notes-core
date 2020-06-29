 <template>
    <div class="navbar">
        <md-tabs>
            <tab-selector content="Start" id="0" />
            <tab-selector content="Drawing" id="1" />
            <tab-selector content="Insert" id="2" />
            
            <!--<md-tab id="tab-drawing" md-label="Drawing"></md-tab>
            <md-tab id="tab-insert" md-label="Insert"></md-tab>-->
        </md-tabs>
        <div class="navbarContent">
            <tab id="0">
                <material-card><span>Tab 0 content</span></material-card>
            </tab>
            <tab id="1">
                <material-card><span>Tab 1 content</span></material-card>
            </tab>
        </div>
    </div>
</template>

<script>
import materialCard from "../miscellaneous/MaterialCard.vue";
import tabSelector from "./TabSelector.vue";
import tab from "./Tab.vue";
import { mapState, mapGetters } from 'vuex';

export default {
	components: {
        materialCard,
        tabSelector,
        tab,
	},
	data: function() {
		return {
		};
	},
    computed: mapState({
        activeNavbarTab: state => state.core.activeNavbarTab,
    }),
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
    display: flex;
}
.navbarContent {
    height: 80%;
}
</style>