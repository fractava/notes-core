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
        <shape-toolbar v-if="focusedObjectType == 'shapes'" />
      </tab>
      <tab id="1" style="display: flex; flex-direction: row;">
        <pencilSelector v-for="(pencil, index) in pencils" :id="index" :key="index"></pencilSelector>
        <add-pencil/>
      </tab>
      <tab id="2" style="display: flex; flex-direction: row;">
        <add-text-box />
        <add-shapes />
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
import shapeToolbar from "./Tab0/ShapeToolbar.vue";

// Tab 1
import addPencil from "./Tab1/AddPencil.vue";
import pencilSelector from "./Tab1/PencilSelector.vue";

// Tab 2
import addTextBox from "./Tab2/AddTextBox.vue";
import addShapes from "./Tab2/AddShapes.vue";

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
		shapeToolbar,
		addTextBox,
		addShapes,
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

<style>
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
.navbarButton, .navbarButton button {
	height: 100% !important;
	margin: 0px !important;
}
.smallNavbarButton {
	min-width: 40px !important;
}
.navbarMenu, .md-menu-content-container, .md-list {
	min-width: fit-content !important;
	max-width: fit-content !important;
  height: fit-content;
	max-width: 60vh;
}
</style>
