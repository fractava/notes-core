<template>
	<div
		class="textBoxContainer"
		 :style="{top: this.textBox.position.y + 'px', left: this.textBox.position.x + 'px', width: this.textBox.position.width + 'px', height: this.textBox.position.height + 'px',}"
		 :class="{active: this.active,}"
		 v-on:pointerdown="pointerdown"
	>
		<quill
			class="textBox"
			v-model="content"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@ready="onEditorReady($event)"
			v-on:assign:quill="assignQuill"
			:focused="focused"
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
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	},
	methods: {
		onEditorFocus: function() {
			this.active = true;
		},
		onEditorFocus: function() {

		},
		onEditorReady: function() {

		},
		onEditorBlur: function() {
			this.active = false;
		},
		assignQuill: function(quill) {
			console.log(quill);
			this.$store.commit("assignQuillToTextBox", { id: this.id, quill }, {module: "core" });
		},
		pointerdown: function(event) {
			this.$store.commit("focusObject", {type: "textBoxes", id: this.id,}, {module: "core" });
		},
	},
};
</script>
<style scoped>
	.textBoxContainer {
		position: absolute;
		z-index: 2;
	}
	.textBox {
		width: 100%;
		height: 100%;
	}
</style>
