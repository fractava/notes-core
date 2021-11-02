export const domToOjectId = {
    methods: {
        domShapeToId(target) {
            return parseInt(target.querySelector('.shapeContainer').getAttribute("data-shape-id"), 10);
        },
    },
};