export default {
	register: function (Quill) {
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
	},
}
