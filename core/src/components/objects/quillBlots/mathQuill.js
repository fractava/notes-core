export default {
	register: function(Quill) {
		let BlockEmbed = Quill.import("blots/block/embed");

		class MathQuillBlot extends BlockEmbed {
			static create(content) {
		    	let node = super.create();
				node.setAttribute("contenteditable", false);

				var config = {
				  spaceBehavesLikeTab: true,
				};

				let span = document.createElement("span");

				$(node).append(span);
				console.log(node);

				this.MQ = MathQuill.getInterface(2);
				node.mathField = this.MQ.MathField(span, config);

				//let self = this;
				node.addEventListener("click", function() {
					node.mathField.focus();
				});

		    return node;
		  }

			static value(node) {
				console.log(node);
				return node.mathField.latex();
			}
		}

		MathQuillBlot.blotName = "mathQuill";
		MathQuillBlot.tagName = "div";
		MathQuillBlot.className = "mathQuillBlot";

		Quill.register(MathQuillBlot);
	}
};
