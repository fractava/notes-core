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
            <tab id="1" style="display: flex; flex-direction: row;">
                <pencilSelector v-for="(pencil, index) in pencils" :id="index" :key="index"></pencilSelector>
                <add-pencil/>
            </tab>
						<tab id="2" style="display: flex; flex-direction: row;">
							<add-text-box />
							<add-forms />
							<add-symbol />
						</tab>
						<tab id="3" style="display: flex; flex-direction: row;">
							<zoom-control/>
							<background-selector />
						</tab>
        </div>
    </div>
</template>

<script>
// miscellaneous
import tabSelector from "./TabSelector.vue";
import tab from "./Tab.vue";

// Tab 0
import quillToolbar from "./Tab0/QuillToolbar.vue";

// Tab 1
import addPencil from "./Tab1/AddPencil.vue";
import pencilSelector from "./Tab1/PencilSelector.vue";

// Tab 2
import addTextBox from "./Tab2/AddTextBox.vue";
import addSymbol from "./Tab2/AddSymbol.vue";
import addForms from "./Tab2/AddForms.vue";

// Tab 3
import zoomControl from "./Tab3/ZoomControl.vue";
import backgroundSelector from "./Tab3/BackgroundSelector.vue";

import { mapState } from "vuex";

export default {
	components: {
		tabSelector,
		tab,
		pencilSelector,
		addPencil,
		zoomControl,
		backgroundSelector,
		quillToolbar,
		addTextBox,
		addSymbol,
		addForms,
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
.navbarTabs {
    height: 20%;
    display: flex;
}
.navbarContent {
    height: 100%;
}
</style>
