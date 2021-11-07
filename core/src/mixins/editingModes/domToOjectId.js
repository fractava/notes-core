export const domToOjectId = {
    methods: {
        domShapeToId(target) {
            return parseInt(target.getAttribute("data-shape-id"), 10);
        },
    },
};