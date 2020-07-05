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
                <quill-toolbar v-if="focusedObjectType == 'textBoxes'" />
            </tab>
            <tab id="1" class="tab-flex">
                <pencil-selector v-for="(pencil, index) in pencils" :id="index" :key="index"></pencil-selector>
                <add-pencil/>
            </tab>
            <tab id="2" class="tab-flex">
                <history-control />
                <add-text-box />
            </tab>
			<tab id="3" class="tab-flex">
                <history-control />
				<zoom-control/>
			</tab>
        </div>
    </div>
</template>

<script>
// miscellaneous
import TabSelector from "./TabSelector.vue";
import Tab from "./Tab.vue";

// MultiTab
import HistoryControl from "./MultiTab/HistoryControl";

// Tab 0
import QuillToolbar from "./Tab0/QuillToolbar.vue";

// Tab 1
import AddPencil from "./Tab1/AddPencil.vue";
import PencilSelector from "./Tab1/PencilSelector.vue";

// Tab 2
import AddTextBox from "./Tab2/AddTextBox.vue";

// Tab 3
import ZoomControl from "./Tab3/ZoomControl.vue";

import { mapState } from "vuex";

export default {
	components: {
		HistoryControl,
		TabSelector,
		Tab,
		PencilSelector,
		AddPencil,
		ZoomControl,
		QuillToolbar,
		AddTextBox,
	},
	data: function() {
		return {
			openedPencilSettingsId: -1,
		};
	},
	computed: mapState({
		activeNavbarTab: state => state.core.activeNavbarTab,
		pencils: state => state.core.pencils,
		focusedObjectType: state => state.core.focusedObjectType,
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

.navbarContent {
    height: 100%;
}

.tab-flex {
    display: flex;
    flex-direction: row;
}
</style>
