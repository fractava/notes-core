<template>
	<div
		class="textBoxContainer"
		:class="{active: active, disabled: disabled}"
	>
		<div ref="container">
			<quill
				class="textBox object"
				:data-textBox-id="id"
				v-model="content"
				v-on:assign:quill="assignQuill"
				v-on:activate="activate"
				:focused="active"
				:disabled="disabled"
				:defaultFont="defaultFont"
				:defaultFontSize="defaultFontSize"
				:toolbarDisabled="true"
				:style="style"
			/>
		</div>
	</div>
</template>

<script>
import { isMountedMixin } from "../../mixins/editingModes/isMountedMixin.js";

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
	},
	mixins: [isMountedMixin],
	data: function() {
		return {
			defaultFont: "Calibri",
			defaultFontSize: "20px",
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
		active: function() {
			return this.editingMode == "editing" && this.$store.getters.objectFocused("textBoxes", this.id) && this.openedDialog == false;
		},
		style: function() {
			return {
				width: `${this.textBox.position.width}px`,
				height: `${this.textBox.position.height}px`,
				transformOrigin: this.textBox.position.transformOrigin,
				transform: `translate(${this.textBox.position.x}px, ${this.textBox.position.y}px)` + ` rotate(${this.textBox.position.rotation}deg)`
			};
		},
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
			openedDialog: state => state.core.openedDialog,
		}),
	},
	methods: {
		activate: function() {
			this.$store.commit("focusObject", {type: "textBoxes", id: this.id,}, {module: "core" });
		},
		assignQuill: function(quill) {
			console.log(quill);
			this.$store.commit("assignQuillToTextBox", { id: this.id, quill }, {module: "core" });
		},
		handleDragStart(e) {
			e.set([this.textBox.position.x, this.textBox.position.y]);
		},
		handleDrag({ target, transform, beforeTranslate }) {
			console.log("onDrag left, top", transform);
			target.style.transform = transform;

			this.$store.commit("moveTextBox", {id: this.id, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},
		handleResizeStart(e) {
			console.log("handleResizeStart", e);

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([this.textBox.position.x, this.textBox.position.y]);
		},
		handleResize({target, width, height, delta, drag, }) {
			console.log("onResize", width, height);

			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			this.$store.commit("resizeTextBox", {id: this.id, width, height,}, {module: "core" });
			this.$store.commit("moveTextBox", {id: this.id, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},
		handleRotateStart(e) {
			console.log("onRotateStart", e);

			e.set(this.textBox.position.rotation);
		},
		handleRotate({ target, rotate, transform, }) {
			console.log("onRotate", rotate);

			target.style.transform = transform;

			this.$store.commit("rotateTextBox", {id: this.id, rotation: rotate,}, {module: "core" });
		},
		handleRender(e) {
			this.updateStyles(e.target);
		},
		updateStyles(target) {
			console.log(target);
			console.log(`translate(${this.textBox.position.x}px, ${this.textBox.position.y}px)` + ` rotate(${this.textBox.position.rotation}deg)`);
			target.style.transformOrigin = this.textBox.position.transformOrigin;
			target.style.width = `${this.textBox.position.width}px`;
			target.style.height = `${this.textBox.position.height}px`;
			target.style.transform = `translate(${this.textBox.position.x}px, ${this.textBox.position.y}px)` + ` rotate(${this.textBox.position.rotation}deg)`;
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
