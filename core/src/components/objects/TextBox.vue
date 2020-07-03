<template>
	<div
		class="textBoxContainer"
		:style="{top: this.textBox.position.y + 'px', left: this.textBox.position.x + 'px', width: this.textBox.position.width + 'px', height: this.textBox.position.height + 'px',}"
		:class="{disabled: disabled}"
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
	</div>
</template>

<script>
import { mapState } from "vuex";
import quill from "./quill.vue";

export default {
	components: {
		quill,
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
			console.log("disabled: " + (this.editingMode != 'editing'));
			console.log(this.editingMode);
			return this.editingMode != 'editing';
		},
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
		}),
	},
	methods: {
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
	}
	.textBox {
		width: 100%;
		height: 100%;
	}
	.disabled .ql-container {
		border: none !important;
	}
</style>
