<template>
	<div
		class="textBoxContainer"
		:class="{disabled: disabled}"
	>
		<vue-draggable-resizable
			class="textBoxContainer"
			:w="textBox.position.width"
			:h="textBox.position.height"
			:x="textBox.position.x"
			:y="textBox.position.y"
			@dragging="onDrag"
			@resizing="onResize"
			:parent="false">
			<quill
				class="textBox"
				v-model="content"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)"
				v-on:assign:quill="assignQuill"
				:focused="focused"
				:disabled="disabled"
			/>
		</vue-draggable-resizable>
	</div>
</template>

<script>
import { mapState } from "vuex";
import quill from "./quill.vue";
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
	components: {
		quill,
		VueDraggableResizable,
	},
	props: {
		id: {
			type: Number,
		},
		focused: {
			type: Boolean,
		},
	},
	data: function() {
		return {
			active: false,
		};
	},
	computed: {
		textBox: function() {
			console.log(this.loadedPage.objects.textBoxes[this.id]);
			return this.loadedPage.objects.textBoxes[this.id];
		},
		content: {
			set(content) {
				this.$store.commit("setTextBoxContent", { id: this.id, content }, {module: "core" });
			},
			get() {
				return this.textBox.content;
			}
		},
		disabled: function() {
			console.log("disabled: " + (this.editingMode != "editing"));
			console.log(this.editingMode);
			return this.editingMode != "editing";
		},
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
		}),
	},
	methods: {
		onResize: function (x, y, width, height) {
			this.$store.commit("resizeTextBox", {id: this.id, width, height,}, {module: "core" });
		},
		onDrag: function (x, y) {
			this.$store.commit("moveTextBox", {id: this.id, x, y,}, {module: "core" });
		},
		onEditorFocus: function() {
			this.active = true;
			if(this.editingMode == "editing"){
				this.$store.commit("focusObject", {type: "textBoxes", id: this.id,}, {module: "core" });
			}
		},
		onEditorReady: function() {

		},
		onEditorBlur: function() {
			this.active = false;
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
		},
		assignQuill: function(quill) {
			console.log(quill);
			this.$store.commit("assignQuillToTextBox", { id: this.id, quill }, {module: "core" });
		},
	},
};
</script>
<style>
	.textBoxContainer {
		position: absolute;
		z-index: 2;
		top: 0px;
		left: 0px;
	}
	.textBox {
		width: 100%;
		height: 100%;
	}
	/*.disabled .ql-container {
		border: none !important;
	}*/

	/* Resizeable */
	.handle {
	  box-sizing: border-box;
	  position: absolute;
	  width: 10px;
	  height: 10px;
	  background: #ffffff;
	  border: 1px solid #ccc;
	}
	.handle-tl {
	  top: -9px;
	  left: -9px;
	  cursor: nw-resize;
	}
	.handle-tm {
	  top: -9px;
	  left: 50%;
	  margin-left: -5px;
	  cursor: n-resize;
	}
	.handle-tr {
	  top: -9px;
	  right: -9px;
	  cursor: ne-resize;
	}
	.handle-ml {
	  top: 50%;
	  margin-top: -5px;
	  left: -9px;
	  cursor: w-resize;
	}
	.handle-mr {
	  top: 50%;
	  margin-top: -5px;
	  right: -9px;
	  cursor: e-resize;
	}
	.handle-bl {
	  bottom: -9px;
	  left: -9px;
	  cursor: sw-resize;
	}
	.handle-bm {
	  bottom: -9px;
	  left: 50%;
	  margin-left: -5px;
	  cursor: s-resize;
	}
	.handle-br {
	  bottom: -9px;
	  right: -9px;
	  cursor: se-resize;
	}
	@media only screen and (max-width: 768px) {
	  [class*="handle-"]:before {
	    content: '';
	    left: -9px;
	    right: -9px;
	    bottom: -9px;
	    top: -9px;
	    position: absolute;
	  }
	}
</style>
