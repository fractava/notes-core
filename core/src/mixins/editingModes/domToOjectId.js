export const domToOjectId = {
    methods: {
        domObjectsToIds(objects) {
            let res = {
				shapes: [],
				textBoxes: [],
			}

            for(let object of objects) {
                if(object.hasAttribute("data-shape-id")) {
					res.shapes.push(this.domShapeToId(object));
				} else if(object.hasAttribute("data-textBox-id")) {
					res.textBoxes.push(this.domTextBoxToId(object));
				}
            }

            return res;
        },
        domObjectToId(object) {
            if(object.hasAttribute("data-shape-id")) {
                return {
                    type: "shapes",
                    id: this.domShapeToId(object),
                };
            } else if(object.hasAttribute("data-textBox-id")) {
                return {
                    type: "textBoxes",
                    id: this.domTextBoxToId(object),
                };
            }
        },
        domShapeToId(shape) {
            return parseInt(shape.getAttribute("data-shape-id"), 10);
        },
        domTextBoxToId(textBox) {
            return parseInt(textBox.getAttribute("data-textBox-id"), 10);
        }
    },
};