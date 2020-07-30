<template>
  <div
    v-on:click="$emit('activate')"
    class="quill-editor"
    :class="{'toolbarDisabled': toolbarDisabled == true, }"
  >
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import Quill from "quill";

import linkBlot from "./quillBlots/link.js";
import mathQuillBlot from "quill-mathquill-blot";
//import mathLiveBlot from "quill-mathlive-blot";

var FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = ["", "Arial", "Calibri", "Roboto", "Courier-New", "Georgia", "Trebuchet-MS", "Lucida-Sans-Unicode", "Times-New-Roman", "Verdana", "Futura", "Charter", "Terminal", "Clean", "Helvetica"];
Quill.register(FontAttributor, true);

// generate font size whitelist
let fontSizeWhiteList = [];
for(let i = 5; i <= 100; i++) {
	fontSizeWhiteList.push(i+"px");
}

var Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeWhiteList;
Quill.register(Size, true);

linkBlot.register(Quill);
mathQuillBlot.register(Quill);
//mathLiveBlot.register(Quill);

import { mixin } from "vuejs-quill";

export default {
	mixins: [mixin],
  data: function() {
    return {
      mixinOptions: {
      	theme: "snow",
      	boundary: document.body,
      	modules: {
      		toolbar: [
            [{ "size": fontSizeWhiteList }],
      		],
      	},
      	placeholder: "Insert text here ...",
      	readOnly: false,
      },
    };
  }
};
</script>
<style>
	.quill-editor.toolbarDisabled .ql-toolbar {
		display: none;
    border: none !important;
	}
	.quill-editor.toolbarDisabled .ql-container {
		border-top: 1px solid #ccc !important;
	}

  /*Mathquill Blot*/
  .mathQuillBlot {
    background-color: lightgray;
      word-wrap: normal !important;
      white-space: normal !important;
    margin-bottom: 1px;
  }
  .mathQuillBlot .mq-math-mode {
    width: 100%;
    border: none !important;
  }
  .mq-editable-field {
    min-width: 20%;
  }
  .mq-editable-field.mq-focused {
    border: 1px solid black;
    box-shadow: none !important;
  }

  /* MathLive Blot*/
  /*.mathLiveBlot {
    background-color: lightgray;
    word-wrap: normal !important;
    white-space: normal !important;
  }
  .ML__keystroke-caption {
    display: none !important;
  }
  .ML__virtual-keyboard-toggle:after {
    display: none !important;
  }
  [data-tooltip]:hover:after {
    visibility: hidden !important;
  }*/
</style>
