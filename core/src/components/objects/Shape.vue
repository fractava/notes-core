<template>
	<div class="shapeContainer" @click="activate">
        <div ref="container">
            <Moveable
                class="object moveable"
                v-bind="moveableOptions"
                :container="$refs.container"
                :target="targets"
                v-if="isMounted"
                ref="moveable"
                @dragStart="handleDragStart"
                @drag="handleDrag"
                @resizeStart="handleResizeStart"
                @resize="handleResize"
                @rotateStart="handleRotateStart"
                @rotate="handleRotate"
                @render="handleRender"
            >
                <div style="width: 100%; height: 100%;">
                    <span>{{ active }}</span>
                    <div
                        class="shape"
                        v-if="shape.type=='square'"
                        style="border: 4px solid;"
                        :style="{'border-color': shape.color.stroke, 'background-color': shape.color.fill,}"
                    />
                    <div
                        class="shape"
                        v-if="shape.type=='circle'"
                    >
                        <svg viewBox="0 0 100 100" :preserveAspectRatio="aspectRatioAttribute" height="100%" width="100%">
                            <circle cx="50" cy="50" r="40" :fill="shape.color.fill" :stroke="shape.color.stroke" stroke-width="3" />
                        </svg>
                    </div>
                    <div
                        class="shape"
                        v-if="shape.type=='star'"
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
                    >
                        <svg viewBox="0 5 24 14" :preserveAspectRatio="aspectRatioAttribute" width="100%" height="100%">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path :fill="shape.color.fill" :stroke="shape.color.stroke" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                        </svg>
                    </div>
                </div>
            </Moveable>
        </div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Moveable from "vue-moveable";

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
				originDraggable: true,
				edge: true,
				renderDirections: ["nw","n","ne","w","e","sw","s","se"],
				//bounds: {"left": 0,"top": 0,"right": 0,"bottom": 0},
				bounds: {
					left: 0,
					top: 0,
				},
				//padding: {"left": 0,"top": 0,"right": 0,"bottom": 0},
				horizontalGuidelines: [],
				snappable: true,
				snapThreshold: 5,
				snapVertical: true,
				snapHorizontal: true,
				snapElement: true,
			},
			frame: {
				transformOrigin: "50% 50%",
			}
		};
	},
	mounted: function() {
		this.isMounted = true;
		this.$nextTick(function () {
			this.updateStyles(this.$refs.moveable.$el);
			this.$refs.moveable.updateRect();
			this.updateGuidelines();
		});
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
        targets: function() {
            if(this.active) {
                console.log(this.$refs.moveable.$el);
                return this.$refs.moveable.$el;
            } else {
                return document.querySelector(".nonexistent");;
            }
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
			e.set([this.shape.position.x, this.shape.position.y]);
		},
		handleDrag({ target, transform, beforeTranslate }) {
			console.log("onDrag left, top", transform);
			target.style.transform = transform;

			this.$store.commit("moveShape", {id: this.id, x: beforeTranslate[0], y: beforeTranslate[1],}, {module: "core" });
		},
		handleResizeStart(e) {
			console.log("handleResizeStart", e);

			e.setOrigin(["%", "%"]);
			e.dragStart && e.dragStart.set([this.shape.position.x, this.shape.position.y]);
		},
		handleResize({target, width, height, delta, drag, }) {
			console.log("onResize", width, height);

			delta[0] && (target.style.width = `${width}px`);
			delta[1] && (target.style.height = `${height}px`);

			this.$store.commit("resizeShape", {id: this.id, width, height,}, {module: "core" });
			this.$store.commit("moveShape", {id: this.id, x: drag.beforeTranslate[0], y: drag.beforeTranslate[1],}, {module: "core" });
		},
		handleRotateStart(e) {
			console.log("onRotateStart", e);

			e.set(this.shape.position.rotation);
		},
		handleRotate({ target, rotate, transform, }) {
			console.log("onRotate", rotate);

			target.style.transform = transform;

			this.$store.commit("rotateShape", {id: this.id, rotation: rotate,}, {module: "core" });
		},
		handleRender(e) {
			this.updateStyles(e.target);
		},
		updateStyles(target) {
			console.log(target);
			target.style.transformOrigin = this.frame.transformOrigin;
			target.style.width = `${this.shape.position.width}px`;
			target.style.height = `${this.shape.position.height}px`;
			target.style.transform = `translate(${this.shape.position.x}px, ${this.shape.position.y}px)` + ` rotate(${this.shape.position.rotation}deg)`;
		},
		updateGuidelines() {
			let horizontalGuidelines = [];
			for(let coordinate = 0; coordinate <= this.loadedPage.size.x; coordinate += this.loadedPage.background.size) {
				horizontalGuidelines.push(coordinate);
			}

			let verticalGuidelines = [];
			for(let coordinate = 0; coordinate <= this.loadedPage.size.y; coordinate += this.loadedPage.background.size) {
				verticalGuidelines.push(coordinate);
			}

			console.log(horizontalGuidelines, verticalGuidelines);
            
			this.moveableOptions.horizontalGuidelines = horizontalGuidelines;
			this.moveableOptions.verticalGuidelines = verticalGuidelines;
		},
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
