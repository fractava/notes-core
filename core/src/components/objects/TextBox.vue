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
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

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

		},
		onDrag: function (x, y) {

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
</style>
