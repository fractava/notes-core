 <template>
    <div class="navbar">
        <md-tabs>
            <tab-selector content="Start" id="0" />
            <tab-selector content="Drawing" id="1" />
            <tab-selector content="Insert" id="2" />
			<tab-selector content="View" id="3" />
        </md-tabs>
        <div class="navbarContent">
            <tab id="0">
                <material-card><span>Tab 0 content</span></material-card>
            </tab>
            <tab id="1" style="display: flex; flex-direction: row;">
                <pencilSelector v-for="(pencil, index) in pencils" :id="index" :key="index"></pencilSelector>
                <add-pencil/>
            </tab>
			<tab id="2"></tab>
			<tab id="3">
				<zoom-control/>
			</tab>
        </div>
    </div>
</template>

<script>
import materialCard from "../miscellaneous/MaterialCard.vue";
import tabSelector from "./TabSelector.vue";
import addPencil from "./AddPencil.vue";
import zoomControl from "./ZoomControl.vue";
import pencilSelector from "./pencilSelector.vue";
import tab from "./Tab.vue";
import { mapState } from "vuex";

export default {
	components: {
		materialCard,
		tabSelector,
		tab,
		pencilSelector,
		addPencil,
		zoomControl,
	},
	data: function() {
		return {
			openedPencilSettingsId: -1,
		};
	},
	computed: mapState({
		activeNavbarTab: state => state.core.activeNavbarTab,
		pencils: state => state.core.pencils,
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