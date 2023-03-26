<template>
  <div class="navbar">
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
    </v-tabs>
    <!--<md-tabs>
      <tab-selector content="Start" id="0" />
      <tab-selector content="Drawing" id="1" />
      <tab-selector content="Insert" id="2" />
      <tab-selector content="View" id="3" />
    </md-tabs>-->
    <div class="navbarContent">
      <tab id="0">
        <!--<md-button class="navbarButton smallNavbarButton" onclick="window.print()">
          <md-icon>print</md-icon>
        </md-button>-->
        <export-menu />
        <quill-toolbar v-if="editingMode == 'editing' && focusedObjects.textBoxes && focusedObjects.textBoxes.length === 1 && numberOfObjectsFocused === 1" />
        <shape-toolbar v-if="editingMode == 'editing' && focusedObjects.shapes && focusedObjects.shapes.length === 1 && numberOfObjectsFocused === 1" />
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
        <page-resize />
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
import exportMenu from "./Tab0/ExportMenu.vue";
// Tab 1
import addPencil from "./Tab1/AddPencil.vue";
import pencilSelector from "./Tab1/PencilSelector.vue";

// Tab 2
import addTextBox from "./Tab2/AddTextBox.vue";
import addShapes from "./Tab2/AddShapes.vue";

// Tab 3
import zoomControl from "./Tab3/ZoomControl.vue";
import backgroundSelector from "./Tab3/BackgroundSelector.vue";
import pageResize from "./Tab3/PageResize.vue";

import { mapState } from "pinia";
import { useCoreStore } from "../../pinia/core.js";

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
		exportMenu,
		pageResize,
	},
	data: function() {
		return {
			openedPencilSettingsId: -1,
		};
	},
	computed: {
		...mapState(useCoreStore, {
			editingMode: store => store.editingMode,
      focusedObjects: store => store.focusedObjects,
      numberOfObjectsFocused: store => store.numberOfObjectsFocused,
      pencils: store => store.pencils,
		}),
  },
	mixins: [],
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
  max-height: unset !important;
}
.exportButtonContainer {
  display: flex;
  flex-direction: column;
}
.exportButton {
  margin-left: 8px !important;
}
</style>
