<template>
	<div class="shapeContainer">
        <div ref="container">
            <Moveable
                class="moveable"
                v-bind="moveableOptions"
                :container="$refs.container"
                v-if="isMounted"
                @dragStart="handleDragStart"
                @drag="handleDrag"
                @resizeStart="handleResizeStart"
                @resize="handleResize"
                @rotateStart="handleRotateStart"
                @rotate="handleRotate"
                @render="handleRender"
            >
                <div
                    class="shape"
                    v-if="shape.type=='square'"
                    style="border: 4px solid;"
                    :style="{'border-color': shape.color.stroke, 'background-color': shape.color.fill,}"
                    v-on:click="activate"
                />
                <div
                    class="shape"
                    v-if="shape.type=='circle'"
                    v-on:click="activate"
                >
                    <svg viewBox="0 0 100 100" :preserveAspectRatio="aspectRatioAttribute" height="100%" width="100%">
                        <circle cx="50" cy="50" r="40" :fill="shape.color.fill" :stroke="shape.color.stroke" stroke-width="3" />
                    </svg>
                </div>
                <div
                    class="shape"
                    v-if="shape.type=='star'"
                    v-on:click="activate"
                >
                    <svg viewBox="0 0 24 24" :preserveAspectRatio="aspectRatioAttribute" width="100%" height="100%">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            :fill="shape.color.fill"
                            :stroke="shape.color.stroke"
                        />
                    </svg>
                </div>
                <div
                    class="shape"
                    v-if="shape.type=='arrow'"
                    v-on:click="activate"
                >
                    <svg viewBox="0 5 24 14" :preserveAspectRatio="aspectRatioAttribute" width="100%" height="100%">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path :fill="shape.color.fill" :stroke="shape.color.stroke" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                    </svg>
                </div>
            </Moveable>
        </div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Moveable from 'vue-moveable';

export default {
	components: {
		Moveable,
	},
	props: {
		id: {
			type: Number,
		},
	},
	data: function() {
		return {
			beforeDragX: false,
            beforeDragY: false,
            beforeRotationDeg: false,
            isMounted: false,
            moveableOptions: {
                draggable: true,
                throttleDrag: 1,
                resizable: true,
                throttleResize: 1,
                keepRatio: false,
                scalable: false,
                throttleScale: 1,
                rotatable: true,
                throttleRotate: 1,
                pinchable: true,
                origin: true,
                originDraggable: true,
                edge: true,
            },
            frame: {
                translate: [0,0],
                rotate: 0,
                transformOrigin: "50% 50%",
            }
		};
    },
    mounted: function() {
        this.isMounted = true;
    },
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		shape: function() {
			return this.loadedPage.objects.shapes[this.id];
		},
		active: function() {
			return this.editingMode == "editing" && this.focusedObjectType == "shapes" && this.focuseObjectId == this.id;
		},
		aspectRatioAttribute: function() {
			return this.shape.distort ? "none" : "xMidYMid meet";
		},
	},
	methods: {
		activate: function() {
            console.log("activate");
			this.$store.commit("focusObject", {type: "shapes", id: this.id,}, {module: "core" });
		},
		deactivate: function() {
            console.log("deactivate");
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
        },
        handleDragStart(e) {
            e.set(this.frame.translate);
        },
        handleDrag({ target, transform, left, top, beforeTranslate }) {
            console.log('onDrag left, top', transform);
            target.style.transform = transform;

            this.frame.translate = beforeTranslate;

            this.$store.commit("moveShape", {id: this.id, x: left, y: top,}, {module: "core" });
        },
        handleResizeStart(e) {
            console.log("handleResizeStart", e);

            e.setOrigin(["%", "%"]);
            e.dragStart && e.dragStart.set(this.frame.translate);
        },
        handleResize({target, width, height, delta, drag, }) {
            console.log('onResize', width, height);

            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);

            const beforeTranslate = drag.beforeTranslate;
            this.frame.translate = beforeTranslate;

            this.$store.commit("resizeShape", {id: this.id, width, height,}, {module: "core" });
        },
        handleRotateStart(e) {
            e.set(this.frame.rotate);
        },
        handleRotate({ target, rotate, transform, beforeRotate }) {
            console.log('onRotate', rotate);
            
            target.style.transform = transform;

            this.frame.rotate = beforeRotate;

            this.$store.commit("rotateShape", {id: this.id, rotation: rotate,}, {module: "core" });
        },
        handleRender(e) {
            const { translate, rotate, transformOrigin } = this.frame;
            e.target.style.transformOrigin = transformOrigin;
            e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`;
        }
	},
};
</script>
<style>
.shape {
	width: 100%;
	height: 100%;
}
.shapeContainer {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 0px;
	height: 0px;
}
.moveable {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
