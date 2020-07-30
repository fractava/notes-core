<template>
  <div v-on:click="$emit('activate')" class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import _Quill from "quill";
import linkBlot from "./quillBlots/link.js";
import mathQuillBlot from "quill-mathquill-blot";
//import mathLiveBlot from "quill-mathlive-blot";

const Quill = window.Quill || _Quill;

var FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = ["", "Arial", "Calibri", "Roboto", "Courier-New", "Georgia", "Trebuchet-MS", "Lucida-Sans-Unicode", "Times-New-Roman", "Verdana", "Futura", "Charter", "Terminal", "Clean", "Helvetica"];
Quill.register(FontAttributor, true);


// generate font size whitelist
let fontSizeWhiteList = [];
for(let i = 5; i <= 100; i++) {
	fontSizeWhiteList.push(i+"px");
}

var Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeWhiteList;
Quill.register(Size, true);

linkBlot.register(Quill);
mathQuillBlot.register(Quill);
//mathLiveBlot.register(Quill);

const defaultOptions = {
	theme: "snow",
	boundary: document.body,
	modules: {
		toolbar: [
			[{ "size": fontSizeWhiteList }],
			["link", "image", "video"],
		]
	},
	placeholder: "Insert text here ...",
	readOnly: false,
};

// pollfill
if (typeof Object.assign != "function") {
	Object.defineProperty(Object, "assign", {
		value(target) {
			if (target == null) {
				throw new TypeError("Cannot convert undefined or null to object");
			}
			const to = Object(target);
			for (let index = 1; index < arguments.length; index++) {
				const nextSource = arguments[index];
				if (nextSource != null) {
					for (const nextKey in nextSource) {
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}

// export
export default {
	name: "quill",
	data() {
		return {
			_options: {}, // eslint-disable-line vue/no-reserved-keys
			_content: "", // eslint-disable-line vue/no-reserved-keys
			defaultOptions,
			quill: _Quill,
		};
	},
	props: {
		content: Object,
		value: Object,
		disabled: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			required: false,
			default: () => ({})
		},
		globalOptions: {
			type: Object,
			required: false,
			default: () => ({})
		},
		focused: {
			type: Boolean,
		},
		defaultFont: {
			type: String,
		},
		defaultFontSize: {
			type: String,
		}
	},
	mounted() {
		this.initialize();
		this.$emit("assign:quill", this.quill);
	},
	beforeDestroy() {
		this.quill = null;
		delete this.quill;
	},
	methods: {
		// Init Quill instance
		initialize() {
			if (this.$el) {

				// Options
				this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options);

				// Instance
				this.quill = new Quill(this.$refs.editor, this._options);

				this.quill.enable(false);

				// Set editor content
				if (this.value || this.content) {
					this.quill.setContents(this.value || this.content);
				}

				// Disabled editor
				if (!this.disabled) {
					this.quill.enable(true);
				}

				// Mark model as touched if editor lost focus
				this.quill.on("selection-change", () => {
					if(this.focused) {
						this.quill.focus();
					}
				});

				// Update model if text changes
				this.quill.on("text-change", () => {
					const quill = this.quill;
					let html = this.$refs.editor.children[0].innerHTML;

					if (html === "<p><br></p>") html = "";

					if(html == "") {
						this.applyDefaultStyle();
					}

					let contents = quill.getContents();

					this._content = contents;
					this.$emit("input", this._content);
					this.$emit("change", { contents, quill });
				});

				// Emit ready event
				this.$emit("ready", this.quill);

				this.applyDefaultStyle();
			}
		},
		applyDefaultStyle() {
			this.quill.format("font", this.defaultFont, "api");
			this.quill.format("font-size", this.defaultFontSize, "api");
		},
	},
	watch: {
		// Watch content change
		content(newVal) {
			if (this.quill) {
				if (newVal && newVal !== this._content) {
					this._content = newVal;
					const delta = this.quill.clipboard.convert(newVal);
					this.quill.setContents(delta);
				} else if(!newVal) {
					this.quill.setText("");
				}
			}
		},
		// Watch content change
		value(newVal) {
			if (this.quill) {
				if (newVal && newVal !== this._content) {
					this._content = newVal;
					this.quill.pasteHTML(newVal);
				} else if(!newVal) {
					this.quill.setText("");
				}
			}
		},
		// Watch disabled change
		disabled(newVal) {
			if (this.quill) {
				this.quill.enable(!newVal);
			}
		},
		focused(newVal) {
			if(newVal == true) {
				this.quill.focus();
			} else {
				this.quill.blur();
			}
		}
	}
};
</script>
<style>
	.quill-editor .ql-toolbar {
		display: none;
	}
	.ql-container {
		border-top: 1px solid #ccc !important;
	}
	.ql-toolbar.ql-snow {
		border: none !important;
	}

	/*Mathquill Blot*/
	.mathQuillBlot {
		background-color: lightgray;
      word-wrap: normal !important;
      white-space: normal !important;
		margin-bottom: 1px;
	}
	.mathQuillBlot .mq-math-mode {
		width: 100%;
		border: none !important;
	}
	.mq-editable-field {
		min-width: 20%;
	}
	.mq-editable-field.mq-focused {
		border: 1px solid black;
		box-shadow: none !important;
	}

	/* MathLive Blot*/
	/*.mathLiveBlot {
		background-color: lightgray;
		word-wrap: normal !important;
		white-space: normal !important;
	}
	.ML__keystroke-caption {
		display: none !important;
	}
	.ML__virtual-keyboard-toggle:after {
		display: none !important;
	}
	[data-tooltip]:hover:after {
		visibility: hidden !important;
	}*/
</style>
