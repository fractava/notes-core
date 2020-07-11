export default {
	register: function(Quill) {
		let BlockEmbed = Quill.import("blots/block/embed");

		class MathQuillBlot extends BlockEmbed {
		  static create(content) {
		    let node = super.create();

				node.setAttribute("contenteditable", false);

				var config = {
				  spaceBehavesLikeTab: true, // configurable
				};

				let span = document.createElement("span");

				//span.classList.push("MathQuillSpan");

				$(node).append(span);
				console.log(node);

				this.MQ = MathQuill.getInterface(2);
				this.mathField = this.MQ.MathField(span, config);

		    return node;
		  }

			static value(domNode) {
				return this.mathField.latex();
			}
		}

		MathQuillBlot.blotName = "mathQuill";
		MathQuillBlot.tagName = "div";
		MathQuillBlot.className = "mathQuillBlot";

		Quill.register(MathQuillBlot);
	}
};
