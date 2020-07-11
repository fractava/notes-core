import MathLive from "mathlive/dist/mathlive.js";

export default {
	register: function(Quill) {
		let BlockEmbed = Quill.import("blots/block/embed");

		class MathLiveBlot extends BlockEmbed {
		  static create(content) {
		    let node = super.create();

				node.setAttribute("contenteditable", false);

				let div = document.createElement("div");

				$(node).append(div);
				console.log(node);

				//this.MathLiveField = MathLive.makeMathField(div);
				this.MathLiveField = MathLive.makeMathField(div, {
					smartMode: true,
					virtualKeyboardMode: "manual",
					virtualKeyboardLayout: "qwertz",
					virtualKeyboardTheme: "material",
					virtualKeyboards: "all",
					onContentDidChange: (mf) => {
						const latex = mf.$text();
						console.log(latex);
					}
				});

				this.MathLiveField.$latex("4x");

				let self = this;
				node.addEventListener("click", function() {
					self.MathLiveField.$focus();
				});

		    return node;
		  }

			static value(domNode) {
				return this.MathLiveField.$latex();
			}
		}

		MathLiveBlot.blotName = "mathLive";
		MathLiveBlot.tagName = "div";
		MathLiveBlot.className = "mathLiveBlot";

		Quill.register(MathLiveBlot);
	}
};
