<template>
	<div
		class="textBoxContainer"
		 :style="{top: this.textBox.position.x + 'px', left: this.textBox.position.y + 'px', width: this.textBox.position.width + 'px', height: this.textBox.position.height + 'px',}"
		 :class="{active: this.active,}"
	>
		<quill-editor
			class="textBox"
			v-model="content"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@ready="onEditorReady($event)"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: {
		id: {
			type: Number,
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
	.ql-toolbar {
		display: none;
	}
</style>