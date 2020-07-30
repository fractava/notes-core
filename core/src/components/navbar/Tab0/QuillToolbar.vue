<template>
<div style="height: 100%; display: flex;">
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('bold')" :class="{'md-raised': isFormat('bold', true)}">
        <md-icon>format_bold</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('italic')" :class="{'md-raised': isFormat('italic', true)}">
        <md-icon>format_italic</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('underline')" :class="{'md-raised': isFormat('underline', true)}">
        <md-icon>format_underlined</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('strike')" :class="{'md-raised': isFormat('strike', true)}">
        <md-icon>strikethrough_s</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('blockquote')" :class="{'md-raised': isFormat('blockquote', true)}">
        <md-icon>format_quote</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('code')" :class="{'md-raised': isFormat('code', true)}">
        <md-icon>code</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="insertEmbed('mathQuill', ''); /*insertEmbed('mathLive', '')*/">
        <md-icon>functions</md-icon>
    </md-button>
    <add-symbol />
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('header', 1, 0)" :class="{'md-raised': isFormat('header', 1)}">
        <md-icon>looks_one</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('header', 2, 0)" :class="{'md-raised': isFormat('header', 2)}">
        <md-icon>looks_two</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('list', 'ordered', false)" :class="{'md-raised': isFormat('list', 'ordered')}">
        <md-icon>format_list_numbered</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('list', 'bullet', false)" :class="{'md-raised': isFormat('list', 'bullet')}">
        <md-icon>format_list_bulleted</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('script', 'sub', false)" :class="{'md-raised': isFormat('script', 'sub')}">
        <md-icon>subscript</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormatWithValue('script', 'super', false)" :class="{'md-raised': isFormat('script', 'super')}">
        <md-icon>superscript</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelative('indent', -1)">
        <md-icon>format_indent_decrease</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelative('indent', 1)">
        <md-icon>format_indent_increase</md-icon>
    </md-button>
    <md-menu md-direction="bottom-start" md-align-trigger class="navbarButton">
        <md-button md-menu-trigger class="navbarButton smallNavbarButton">
            <md-icon>title</md-icon>
        </md-button>
        <md-menu-content class="symbolsMenu">
            <span>
					<span class="md-headline">Text Color:</span>
            <div>
                <color-picker :color="getFormat('color')" v-on:update="updateTextColor" />
            </div>
            </span>
        </md-menu-content>
    </md-menu>
    <md-menu md-direction="bottom-start" md-align-trigger class="navbarButton">
        <md-button md-menu-trigger class="navbarButton smallNavbarButton">
            <md-icon>format_paint</md-icon>
        </md-button>
        <md-menu-content class="symbolsMenu">
            <span>
					<span class="md-headline">Background Color:</span>
            <div>
                <color-picker :color="getFormat('background')" v-on:update="updateBackgroundColor" />
            </div>
            </span>
        </md-menu-content>
    </md-menu>
    <md-field>
        <md-select v-model="font" name="font" id="font">
            <md-option v-for="font in fonts" :key="'font_option'+font" :value="font">{{ font }}</md-option>
        </md-select>
    </md-field>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormat('align', '')" :class="{'md-raised': isFormat('align', undefined)}">
        <md-icon>format_align_left</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormat('align', 'center')" :class="{'md-raised': isFormat('align', 'center')}">
        <md-icon>format_align_center</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormat('align', 'right')" :class="{'md-raised': isFormat('align', 'right')}">
        <md-icon>format_align_right</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="removeFormat">
        <md-icon>format_clear</md-icon>
    </md-button>
    <md-dialog-prompt :md-active.sync="linkDialogActive" md-title="Add Link" md-input-maxlength="300" md-input-placeholder="URL" md-confirm-text="Add Link" md-cancel-text="remove Link" @md-cancel="onLinkCancel" @md-confirm="onLinkConfirm" v-model="currentLink"
    />
    <md-button class="navbarButton smallNavbarButton" v-on:click="activateLinkPromt" :class="{'md-raised': !isFormat('link', undefined)}">
        <md-icon>link</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelativeAdvanced('font-size', 'size', -1, 20, 'px')">
        <md-icon>arrow_drop_down</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton">
        {{ getFormat("size") }}
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelativeAdvanced('font-size', 'size', 1, 20, 'px')">
        <md-icon>arrow_drop_up</md-icon>
    </md-button>
    <md-button class="navbarButton smallNavbarButton" v-if="debug" v-on:click="debugOutput">
        debug
    </md-button>
</div>
</template>

<script>
import { mapState } from "vuex";
import colorPicker from "../ColorPicker.vue";
import Parchment from "parchment";
import addSymbol from "./AddSymbol.vue";

export default {
	components: {
		colorPicker,
		addSymbol,
	},
	data: function(){
		return {
			linkDialogActive: false,
			currentLink: "",
			fonts: ["Roboto", "Calibri", "Arial", "Courier-New", "Georgia", "Trebuchet-MS", "Lucida-Sans-Unicode", "Times-New-Roman", "Verdana", "Futura", "Charter", "Terminal", "Clean", "Helvetica"],
		};
	},
	methods: {
		debugOutput: function() {
			console.log(this.loadedPage);
		},
		selectedText: function() {
			return this.$store.getters.textSelection;
		},
		getFormat: function(format) {
			let selection = this.selectedText();
			if(selection) {
				return this.$store.getters.getFormat({index: selection.index, length: selection.length, format});
			} else {
				return false;
			}
		},
		toggleFormat: function(format) {
			let currentFormat = this.getFormat(format);
			this.setFormat(format, !currentFormat);
		},
		toggleFormatWithValue: function(format, value, defaultValue) {
			let currentFormat = this.getFormat(format);

			if(currentFormat == value) {
				this.setFormat(format, defaultValue);
			}else {
				this.setFormat(format, value);
			}
		},
		setFormat: function(format, value) {
			this.$store.commit("formatText", {format, value}, {module: "core" });
		},
		setFormatRelative: function(format, value) {
			let currentFormat = this.getFormat(format) || 0;
			this.setFormat(format, currentFormat + value);
		},
		setFormatRelativeAdvanced: function(formatSetName, formatGetName, value, defaultValue, unit) {
			let currentFormat = this.getFormat(formatGetName);

			if(currentFormat && unit) {
				currentFormat = currentFormat.replace(unit, "");
				currentFormat = parseInt(currentFormat);
			}

			currentFormat = currentFormat || defaultValue || 0;

			let newVal = currentFormat + value;

			if(unit) {
				newVal += unit;
			}

			this.setFormat(formatSetName, newVal);
		},
		isFormat: function(format, value) {
			return this.getFormat(format) == value;
		},
		removeFormat: function() {
			this.$store.commit("removeFormat", {}, {module: "core" });
		},
		updateTextColor: function(color) {
			this.setFormat("color", color.hex8);
		},
		updateBackgroundColor: function(color) {
			this.setFormat("background", color.hex8);
		},

		onLinkConfirm (value) {
			console.log(value);
			this.setFormat("link", value);
		},
		onLinkCancel () {
			this.setFormat("link", undefined);
		},
		activateLinkPromt() {
			this.currentLink = this.getFormat("link") || "https://";
			this.linkDialogActive = true;
		},
		insertEmbed: function(type, content) {
			this.$store.commit("insertEmbed", {type, content,}, {module: "core" });
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
			debug: state => state.core.debug,
		}),
		font: {
			set(font) {
				this.setFormat("font", font);
			},
			get() {
				return this.getFormat("font");
			}
		},
	},
	watch: {
		linkDialogActive: function(newVal) {
			if(newVal) {
				this.$store.commit("openedDialog", {}, {module: "core" });
			} else {
				this.$store.commit("closedDialog", {}, {module: "core" });
				this.currentLink = "";
			}
		},
	},
};
</script>
<style>
	.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '' !important;
	}
	.ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '' !important;
	}
	.ql-snow .ql-picker.ql-font {
    width: 200px !important;
	}
	.ql-font-Arial {
		font-family: Arial;
	}
	.ql-font-Roboto {
		font-family: Roboto;
	}
	.ql-font-Courier-New {
		font-family: Courier New;
	}
	.ql-font-Georgia {
		font-family: Georgia;
	}
	.ql-font-Trebuchet-MS {
		font-family: Trebuchet MS;
	}
	.ql-font-Lucida-Sans-Unicode {
		font-family: Lucida Sans Unicode;
	}
	.ql-font-Times-New-Roman {
		font-family: Times New Roman;
	}
	.ql-font-Verdana {
		font-family: Verdana;
	}
	.ql-font-Futura {
		font-family: Futura;
	}
	.ql-font-Charter {
		font-family: Charter;
	}
	.ql-font-Terminal {
		font-family: Terminal;
	}
	.ql-font-Clean {
		font-family: Clean;
	}
	.ql-font-Helvetica {
		font-family: Helvetica;
	}
	.ql-font-Calibri {
		font-family: Calibri;
	}
	.navbarButton svg {
		float: left;
    height: 100%;
	}
	.navbarTab .md-field {
		width: 14% !important;
    min-height: 0px !important;
    margin: 4px 0 4px !important;
    padding-top: 0px !important;
	}
	.md-select-menu {
		width: fit-content !important;
		overflow-y: scroll;
	}
</style>
