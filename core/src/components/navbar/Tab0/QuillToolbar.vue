<template>
<div style="height: 100%; display: flex;">
	<!--
        <span class="ql-formats">
            <button type="button" class="ql-image">
                <svg viewBox="0 0 18 18">
                    <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                    <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                    <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                </svg>
            </button>
            <button type="button" class="ql-video">
                <svg viewBox="0 0 18 18">
                    <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect>
                    <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect>
                    <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect>
                    <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect>
                    <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect>
                    <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect>
                    <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect>
                    <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect>
                    <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect>
                    <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect>
                    <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect>
                    <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect>
                </svg>
            </button>
            <button class="ql-formula" type="button" v-on:click="toggleFormat('formula')">
                <svg viewBox="0 0 18 18">
                    <path
                        class="ql-fill"
                        d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"
                    ></path>
                    <rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"></rect>
                    <path
                        class="ql-fill"
                        d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"
                    ></path>
                </svg>
            </button>
        </span>
    </div>-->
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
		<md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('strike')" :class="{'md-raised': isFormat('strike', true)}">
			<md-icon>strikethrough_s</md-icon>
		</md-button>
		<md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('blockquote')" :class="{'md-raised': isFormat('blockquote', true)}">
			<md-icon>format_quote</md-icon>
		</md-button>
		<md-button class="navbarButton smallNavbarButton" v-on:click="toggleFormat('code')" :class="{'md-raised': isFormat('code', true)}">
			<md-icon>code</md-icon>
		</md-button>
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
		<md-menu
			md-direction="bottom-start"
			md-align-trigger
			class="navbarButton"
		>
			<md-button md-menu-trigger class="navbarButton smallNavbarButton">
				<md-icon>title</md-icon>
			</md-button>
			<md-menu-content class="symbolsMenu">
				<span>
					<span class="md-headline">Text Color:</span>
					<div>
						<color-picker :color="getFormat('color')" v-on:update="updateTextColor"/>
					</div>
				</span>
			</md-menu-content>
		</md-menu>
		<md-menu
			md-direction="bottom-start"
			md-align-trigger
			class="navbarButton"
		>
			<md-button md-menu-trigger class="navbarButton smallNavbarButton">
				<md-icon>format_paint</md-icon>
			</md-button>
			<md-menu-content class="symbolsMenu">
				<span>
					<span class="md-headline">Background Color:</span>
					<div>
						<color-picker :color="getFormat('background')" v-on:update="updateBackgroundColor"/>
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
		<div>
			<md-dialog-prompt
      :md-active.sync="linkDialogActive"
      md-title="Add Link"
      md-input-maxlength="300"
      md-input-placeholder="URL"
      md-confirm-text="Add Link"
			md-cancel-text="Cancel"
			@md-cancel="onLinkCancel"
      @md-confirm="onLinkConfirm" />

		<md-button class="navbarButton smallNavbarButton" v-on:click="linkDialogActive = true">
			<md-icon>link</md-icon>
		</md-button>
		<md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelative('font-size', -1, 20, 'px')">
			<md-icon>arrow_drop_down</md-icon>
		</md-button>
		{{ getFormat("font-size") }}
		<md-button class="navbarButton smallNavbarButton" v-on:click="setFormatRelative('font-size', 10, 20, 'px')">
			<md-icon>arrow_drop_up</md-icon>
		</md-button>
		<md-button class="navbarButton smallNavbarButton" v-on:click="setFormat('size', '20')">
			test
		</md-button>
  </div>
</div>

</template>

<script>
import { mapState } from "vuex";
import colorPicker from "../ColorPicker.vue";
import Parchment from 'parchment';

export default {
	components: {
		colorPicker,
	},
	data: function(){
		return {
			linkDialogActive: false,
			fonts: ["Roboto", "Calibri", "Arial", "Courier-New", "Georgia", "Trebuchet-MS", "Lucida-Sans-Unicode", "Times-New-Roman", "Verdana", "Futura", "Charter", "Terminal", "Clean", "Helvetica"],
		};
	},
	methods: {
		test: function() {
			console.log(Parchment);
		},
		selectedText: function() {
			return this.$store.getters.textSelection;
		},
		getFormat: function(format) {
			let selection = this.selectedText();
			if(selection) {
				console.log(format, this.$store.getters.getFormat({index: selection.index, length: selection.length, format}));
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
		setFormatRelative: function(format, value, defaultValue, unit) {
			let currentFormat = this.getFormat(format) || defaultValue || 0;

			let newVal = currentFormat + value;
			if(unit) {
				newVal += unit;
			}

			console.log(newVal);
			this.setFormat(format, newVal);
		},
		isFormat: function(format, value) {
			return this.getFormat(format) == value;
		},
		removeFormat: function() {
			this.$store.commit("removeFormat", {}, {module: "core" });
		},
		updateTextColor: function(color) {
			this.setFormat('color', color.hex8);
		},
		updateBackgroundColor: function(color) {
			this.setFormat('background', color.hex8);
		},

		onLinkConfirm (value) {
			this.setFormat('link', value);
		},
		onLinkCancel () {
			console.log("cancel");
		}
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
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
				console.log("opened");
				this.$store.commit("openedDialog", {}, {module: "core" });
			} else {
				console.log("closed");
				this.$store.commit("closedDialog", {}, {module: "core" });
			}
		}
	}
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
