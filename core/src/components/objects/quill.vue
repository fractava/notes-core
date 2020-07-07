<template>
  <div v-on:click="$emit('activate')" class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import _Quill from "quill";

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

let Inline = Quill.import("blots/inline");

class LinkBlot extends Inline {
	static create(value) {
		let node = super.create();
		// Sanitize url value if desired
		node.setAttribute("href", value);
		node.setAttribute("target", "_blank");
		return node;
	}

	static formats(node) {
		return node.getAttribute("href");
	}
}
LinkBlot.blotName = "link";
LinkBlot.tagName = "a";

Quill.register(LinkBlot);

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
		value(target, varArgs) {
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
			_options: {},
			_content: "",
			defaultOptions,
			quill: _Quill,
		};
	},
	props: {
		content: String,
		value: String,
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
					this.quill.pasteHTML(this.value || this.content);
				}

				// Disabled editor
				if (!this.disabled) {
					this.quill.enable(true);
				}

				// Mark model as touched if editor lost focus
				this.quill.on("selection-change", range => {
					if(this.focused) {
						this.quill.focus();
					}
				});

				// Update model if text changes
				this.quill.on("text-change", (delta, oldDelta, source) => {
					const quill = this.quill;
					let html = this.$refs.editor.children[0].innerHTML;
					let text = this.quill.getText();

					if (html === "<p><br></p>") html = "";

					if(html == "") {
						this.applyDefaultStyle();
						html = this.$refs.editor.children[0].innerHTML;
						text = this.quill.getText();
					}

					this._content = html;
					this.$emit("input", this._content);
					this.$emit("change", { html, text, quill });
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
					const delta = quill.clipboard.convert(newVal);
					quill.setContents(delta);
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
</style>
