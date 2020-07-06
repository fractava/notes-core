<template>
	<div
		class="textBoxContainer"
		:class="{disabled: disabled}"
	>
		<draggable-resizable
			:w="textBox.position.width"
			:h="textBox.position.height"
			:x="textBox.position.x"
			:y="textBox.position.y"
			:minHeight="50"
			:minWidth="50"
			@dragging="onDrag"
			@resizing="onResize"
			@deactivated="deactivate"
			:parent="false"
			:enabled="active"
			:maxX="loadedPage.size.x"
			:maxY="loadedPage.size.y"
		>
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
		</draggable-resizable>
	</div>
</template>

<script>
import { mapState } from "vuex";
import quill from "./quill.vue";
import draggableResizable from "../miscellaneous/draggable-resizable/draggable-resizable.vue";

export default {
	components: {
		quill,
		draggableResizable,
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
			return this.editingMode != "editing";
		},
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
		}),
	},
	methods: {
		onResize: function (x, y, width, height) {
			this.$store.commit("moveTextBox", {id: this.id, x, y,}, {module: "core" });
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
			this.deactivate();
		},
		deactivate: function() {
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
		top: 0px;
		left: 0px;
		width: 0px;
    height: 0px;
	}
	.textBox {
		width: 100%;
		height: 100%;
	}
</style>
