<template>
	<div class="shapeContainer" ref="container" >
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
		<Moveable
			class="moveable"
			v-bind="moveable"
			@drag="handleDrag"
			@dragStart="handleDragStart"
			@resize="handleResize"
			@rotate="handleRotate"
			@warp="handleWarp"
			@pinch="handlePinch"
			:style="containerStyle"
		>
			<span>{{ JSON.stringify(moveable) }}</span>
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
		};
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			editingMode: state => state.core.editingMode,
			focusedObjectType: state => state.core.focusedObjectType,
			focuseObjectId: state => state.core.focuseObjectId,
		}),
		moveable: function() {
			console.log(this.$refs, this.$refs.container);
			return {
				//moveable: {
					draggable: true,
					throttleDrag: 0,
					resizable: true,
					throttleResize: 0,
					keepRatio: false,
					scalable: false,
					throttleScale: 0,
					rotatable: true,
					throttleRotate: 0,
					pinchable: true,
					origin: false,
					container: this.$refs.container,
				//},
			}
		},
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
				top: this.shape.position.x + "px",
				left: this.shape.position.y + "px",
				width: this.shape.position.width + "px",
				height: this.shape.position.height + "px",
			};
			console.log(style);
			return style;
		},
	},
	methods: {
		activate: function() {
			this.$store.commit("focusObject", {type: "shapes", id: this.id,}, {module: "core" });
		},
		deactivate: function() {
			this.$store.commit("focusObject", {type: false, id: false,}, {module: "core" });
		},
		handleDragStart() {
			console.log("start");
			this.beforeDragX = this.shape.position.x;
			this.beforeDragY = this.shape.position.y;
		},
		handleDrag({ target, left, top, translate, beforeTranslate}) {
			console.log(beforeTranslate);
			let x = translate[1] + this.beforeDragX;
			let y = translate[0] + this.beforeDragY;

			console.log("onDrag", target, x, y, translate);
			this.$store.commit("moveShape", {id: this.id, x, y,}, {module: "core" });
		},
		handleResize({ target, width, height}) {
			console.log("onResize", target, width, height);
			this.$store.commit("resizeShape", {id: this.id, width, height,}, {module: "core" });
		},
		handleRotate({ target, transform }) {
			console.log("onRotate", target, transform);
			target.style.transform = transform;
		},
		handleWarp({ target, transform }) {
			console.log("onWarp",target, transform);
			//target.style.transform = transform;
		},
		handlePinch({ target, transform }) {
			console.log("onPinch", target, transform);
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
