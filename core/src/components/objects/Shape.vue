<template>
	<div class="shapeContainer">
		<!--<draggable-resizable
			:w="shape.position.width"
			:h="shape.position.height"
			:x="shape.position.x"
			:y="shape.position.y"
			:minHeight="50"
			:minWidth="50"
			@dragging="onDrag"
			@resizing="onResize"
			@deactivated="deactivate"
			:parent="false"
			:enabled="active"
			:maxX="loadedPage.size.x"
			:maxY="loadedPage.size.y"
			:mouseDragFromInside="true"
			:touchDragFromInside="true"
		>-->
        <div ref="container">
		<Moveable
			class="moveable"
			v-bind="moveableOptions"
            :container="$refs.container"
            v-if="isMounted"
            @drag="handleDrag"
			@resize="handleResize"
			@rotate="handleRotate"
		>
			<!--<span>{{ JSON.stringify(moveableOptions) }}</span>-->
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
		};
    },
    mounted: function() {
        this.isMounted = true;
        this.$nextTick(function () {
            
            /*this.$set(this.moveableOptions, 'container', this.$refs.container);

            console.log(this.moveableOptions.container);
            
            let self = this;
            setTimeout(function () {
                console.log(self.isMounted);
                self.isMounted = true;
            }, 10000);*/
        });
    },
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		/*moveableOptions: function() {
            console.log(this.$refs, this.$refs.container);
            if(this.isMounted) {
                return {

                    
                }
            } else {
                return {};
            }
		},*/
		shape: function() {
			return this.loadedPage.objects.shapes[this.id];
		},
		active: function() {
			return this.editingMode == "editing" && this.focusedObjectType == "shapes" && this.focuseObjectId == this.id;
		},
		aspectRatioAttribute: function() {
			return this.shape.distort ? "none" : "xMidYMid meet";
		},
		containerStyle: function() {
			console.log(this.shape);
			let style = {
				//top: this.shape.position.x + "px",
				//left: this.shape.position.y + "px",
				width: this.shape.position.width + "px",
                height: this.shape.position.height + "px",
                transform: "translate(" + this.shape.position.x + "px, " + this.shape.position.y + "px) rotate(" + this.shape.position.rotation + "deg)",
			};
			console.log(style);
			return style;
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
        handleDrag({ target, transform, left, top }) {
            console.log('onDrag left, top', transform);
            target.style.transform = transform;

            this.$store.commit("moveShape", {id: this.id, x: left, y: top,}, {module: "core" });
        },
        handleResize({target, width, height, delta, drag, }) {
            console.log('onResize', width, height);
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);

            //this.frame.translate = drag.beforeTranslate;
            //target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;

            this.$store.commit("resizeShape", {id: this.id, width, height,}, {module: "core" });
        },
        handleRotate({ target, rotate, transform }) {
            console.log('onRotate', rotate);
            target.style.transform = transform;

            this.$store.commit("rotateShape", {id: this.id, rotation: rotate,}, {module: "core" });
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
