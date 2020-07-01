<template>
<div>
    <div class="ql-toolbar ql-snow" v-on:click="focusQuill">
        <span class="ql-formats">
            <button type="button" class="ql-bold" v-on:click="toggleFormat('bold')" :class="{'ql-active': isFormat('bold', true)}">
                <svg viewBox="0 0 18 18">
                    <path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path>
                    <path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path>
                </svg>
            </button>
            <button type="button" class="ql-italic" v-on:click="toggleFormat('italic')" :class="{'ql-active': isFormat('italic', true)}">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line>
                    <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line>
                </svg>
            </button>
            <button type="button" class="ql-underline" v-on:click="toggleFormat('underline')" :class="{'ql-active': isFormat('underline', true)}">
                <svg viewBox="0 0 18 18">
                    <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path>
                    <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
                </svg>
            </button>
            <button type="button" class="ql-strike" v-on:click="toggleFormat('strike')" :class="{'ql-active': isFormat('strike', true)}">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line>
                    <path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path>
                    <path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"></path>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-blockquote" v-on:click="toggleFormat('blockquote')" :class="{'ql-active': isFormat('blockquote', true)}">
                <svg viewBox="0 0 18 18">
                    <rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"></rect>
                    <rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"></rect>
                    <path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path>
                    <path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"></path>
                </svg>
            </button>
            <button type="button" class="ql-code-block" v-on:click="toggleFormat('code')" :class="{'ql-active': isFormat('code', true)}">
                <svg viewBox="0 0 18 18">
                    <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline>
                    <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline>
                    <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-header" value="1" v-on:click="toggleFormatWithValue('header', 1, 0)" :class="{'ql-active': isFormat('header', 1)}">
                <svg viewBox="0 0 18 18">
                    <path
                        class="ql-fill"
                        d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"
                    ></path>
                </svg>
            </button>
            <button type="button" class="ql-header" value="2" v-on:click="toggleFormatWithValue('header', 2, 0)" :class="{'ql-active': isFormat('header', 2)}">
                <svg viewBox="0 0 18 18">
                    <path
                        class="ql-fill"
                        d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"
                    ></path>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-list" value="ordered" v-on:click="toggleFormatWithValue('list', 'ordered', false)" :class="{'ql-active': isFormat('list', 'ordered')}">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line>
                    <line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line>
                    <line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line>
                    <path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path>
                    <path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path>
                    <path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path>
                </svg>
            </button>
            <button type="button" class="ql-list" value="bullet" v-on:click="toggleFormatWithValue('list', 'bullet', false)" :class="{'ql-active': isFormat('list', 'bullet')}">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>
                    <line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>
                    <line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line>
                    <line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-script" value="sub" v-on:click="toggleFormatWithValue('script', 'sub', false)" :class="{'ql-active': isFormat('script', 'sub')}">
                <svg viewBox="0 0 18 18">
                    <path
                        class="ql-fill"
                        d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"
                    ></path>
                    <path
                        class="ql-fill"
                        d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"
                    ></path>
                </svg>
            </button>
            <button type="button" class="ql-script" value="super" v-on:click="toggleFormatWithValue('script', 'super', false)" :class="{'ql-active': isFormat('script', 'super')}">
                <svg viewBox="0 0 18 18">
                    <path
                        class="ql-fill"
                        d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"
                    ></path>
                    <path
                        class="ql-fill"
                        d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"
                    ></path>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-indent" value="-1" v-on:click="setFormatRelative('indent', -1)">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
                    <line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
                    <polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"></polyline>
                </svg>
            </button>
            <button type="button" class="ql-indent" value="+1" v-on:click="setFormatRelative('indent', 1)">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
                    <line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
                    <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
                    <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <span class="ql-color ql-picker ql-color-picker" :class="{'ql-expanded': textColorPickerExtended}" v-on:click="textColorPickerExtended = !textColorPickerExtended">
                <span class="ql-picker-label" tabindex="0" role="button" aria-expanded="false" aria-controls="ql-picker-options-2">
                    <svg viewBox="0 0 18 18">
                        <line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"></line>
                        <polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"></polyline>
                        <line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"></line>
                    </svg>
                </span>
                <span class="ql-picker-options" aria-hidden="true" tabindex="-1" id="ql-picker-options-2">
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary ql-selected"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#e60000" style="background-color: rgb(230, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#ff9900" style="background-color: rgb(255, 153, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#ffff00" style="background-color: rgb(255, 255, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#008a00" style="background-color: rgb(0, 138, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#0066cc" style="background-color: rgb(0, 102, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#9933ff" style="background-color: rgb(153, 51, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffffff" style="background-color: rgb(255, 255, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#facccc" style="background-color: rgb(250, 204, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffebcc" style="background-color: rgb(255, 235, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffffcc" style="background-color: rgb(255, 255, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#cce8cc" style="background-color: rgb(204, 232, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#cce0f5" style="background-color: rgb(204, 224, 245);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ebd6ff" style="background-color: rgb(235, 214, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#bbbbbb" style="background-color: rgb(187, 187, 187);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#f06666" style="background-color: rgb(240, 102, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffc266" style="background-color: rgb(255, 194, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffff66" style="background-color: rgb(255, 255, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#66b966" style="background-color: rgb(102, 185, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#66a3e0" style="background-color: rgb(102, 163, 224);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#c285ff" style="background-color: rgb(194, 133, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#888888" style="background-color: rgb(136, 136, 136);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#a10000" style="background-color: rgb(161, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#b26b00" style="background-color: rgb(178, 107, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#b2b200" style="background-color: rgb(178, 178, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#006100" style="background-color: rgb(0, 97, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#0047b2" style="background-color: rgb(0, 71, 178);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#6b24b2" style="background-color: rgb(107, 36, 178);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#444444" style="background-color: rgb(68, 68, 68);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#5c0000" style="background-color: rgb(92, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#663d00" style="background-color: rgb(102, 61, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#666600" style="background-color: rgb(102, 102, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#003700" style="background-color: rgb(0, 55, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#002966" style="background-color: rgb(0, 41, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#3d1466" style="background-color: rgb(61, 20, 102);"></span>
                </span>
            </span>
            <select class="ql-color" style="display: none;">
                <option selected="selected"></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc"></option>
                <option value="#9933ff"></option>
                <option value="#ffffff"></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
            <span class="ql-background ql-picker ql-color-picker" :class="{'ql-expanded': backgroundColorPickerExtended}" v-on:click="backgroundColorPickerExtended = !backgroundColorPickerExtended">
                <span class="ql-picker-label" tabindex="0" role="button" aria-expanded="false" aria-controls="ql-picker-options-3">
                    <svg viewBox="0 0 18 18">
                        <g class="ql-fill ql-color-label">
                            <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon>
                            <rect height="1" width="1" x="4" y="4"></rect>
                            <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon>
                            <rect height="1" width="1" x="2" y="6"></rect>
                            <rect height="1" width="1" x="3" y="5"></rect>
                            <rect height="1" width="1" x="4" y="7"></rect>
                            <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon>
                            <rect height="1" width="1" x="2" y="12"></rect>
                            <rect height="1" width="1" x="2" y="9"></rect>
                            <rect height="1" width="1" x="2" y="15"></rect>
                            <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon>
                            <rect height="1" width="1" x="3" y="8"></rect>
                            <path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"></path>
                            <path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"></path>
                            <path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"></path>
                            <rect height="1" width="1" x="12" y="2"></rect>
                            <rect height="1" width="1" x="11" y="3"></rect>
                            <path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"></path>
                            <rect height="1" width="1" x="2" y="3"></rect>
                            <rect height="1" width="1" x="6" y="2"></rect>
                            <rect height="1" width="1" x="3" y="2"></rect>
                            <rect height="1" width="1" x="5" y="3"></rect>
                            <rect height="1" width="1" x="9" y="2"></rect>
                            <rect height="1" width="1" x="15" y="14"></rect>
                            <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon>
                            <rect height="1" width="1" x="13" y="7"></rect>
                            <rect height="1" width="1" x="15" y="5"></rect>
                            <rect height="1" width="1" x="14" y="6"></rect>
                            <rect height="1" width="1" x="15" y="8"></rect>
                            <rect height="1" width="1" x="14" y="9"></rect>
                            <path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"></path>
                            <rect height="1" width="1" x="14" y="3"></rect>
                            <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon>
                            <rect height="1" width="1" x="15" y="2"></rect>
                            <rect height="1" width="1" x="12" y="5"></rect>
                            <rect height="1" width="1" x="13" y="4"></rect>
                            <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon>
                            <rect height="1" width="1" x="9" y="14"></rect>
                            <rect height="1" width="1" x="8" y="15"></rect>
                            <path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"></path>
                            <rect height="1" width="1" x="5" y="15"></rect>
                            <path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"></path>
                            <rect height="1" width="1" x="11" y="15"></rect>
                            <path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"></path>
                            <rect height="1" width="1" x="14" y="15"></rect>
                            <rect height="1" width="1" x="15" y="11"></rect>
                        </g>
                        <polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"></polyline>
                        <line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"></line>
                    </svg>
                </span>
                <span class="ql-picker-options" aria-hidden="true" tabindex="-1" id="ql-picker-options-3">
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#000000" style="background-color: rgb(0, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#e60000" style="background-color: rgb(230, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#ff9900" style="background-color: rgb(255, 153, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#ffff00" style="background-color: rgb(255, 255, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#008a00" style="background-color: rgb(0, 138, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#0066cc" style="background-color: rgb(0, 102, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item ql-primary" data-value="#9933ff" style="background-color: rgb(153, 51, 255);"></span>
										<span tabindex="0" role="button" class="ql-picker-item ql-selected"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#facccc" style="background-color: rgb(250, 204, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffebcc" style="background-color: rgb(255, 235, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffffcc" style="background-color: rgb(255, 255, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#cce8cc" style="background-color: rgb(204, 232, 204);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#cce0f5" style="background-color: rgb(204, 224, 245);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ebd6ff" style="background-color: rgb(235, 214, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#bbbbbb" style="background-color: rgb(187, 187, 187);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#f06666" style="background-color: rgb(240, 102, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffc266" style="background-color: rgb(255, 194, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#ffff66" style="background-color: rgb(255, 255, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#66b966" style="background-color: rgb(102, 185, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#66a3e0" style="background-color: rgb(102, 163, 224);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#c285ff" style="background-color: rgb(194, 133, 255);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#888888" style="background-color: rgb(136, 136, 136);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#a10000" style="background-color: rgb(161, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#b26b00" style="background-color: rgb(178, 107, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#b2b200" style="background-color: rgb(178, 178, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#006100" style="background-color: rgb(0, 97, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#0047b2" style="background-color: rgb(0, 71, 178);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#6b24b2" style="background-color: rgb(107, 36, 178);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#444444" style="background-color: rgb(68, 68, 68);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#5c0000" style="background-color: rgb(92, 0, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#663d00" style="background-color: rgb(102, 61, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#666600" style="background-color: rgb(102, 102, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#003700" style="background-color: rgb(0, 55, 0);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#002966" style="background-color: rgb(0, 41, 102);"></span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="#3d1466" style="background-color: rgb(61, 20, 102);"></span>
                </span>
            </span>
            <select class="ql-background" style="display: none;">
                <option value="#000000"></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc"></option>
                <option value="#9933ff"></option>
                <option selected="selected"></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
        </span>
        <span class="ql-formats">
            <span class="ql-font ql-picker" :class="{'ql-expanded': fontPickerExpanded}" v-on:click="fontPickerExpanded = !fontPickerExpanded">
                <span class="ql-picker-label" tabindex="0" role="button" aria-controls="ql-font-picker">
									<span>{{ getFormat("font") }}</span>
                    <svg viewBox="0 0 18 18">
                        <polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                        <polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                    </svg>
                </span>
                <span class="ql-picker-options" aria-hidden="true" tabindex="-1" id="ql-font-picker">
										<span role="button" class="ql-picker-item" v-for="font in fonts" v-on:click="setFormat('font', font)" :class="{'ql-selected': isFormat('font', font)}">{{ font }}</span>
                </span>
            </span>
            <select class="ql-font" style="display: none;">
							<option v-for="font in fonts" :selected="isFormat(font, 'serif')">{{ font }}</option>
            </select>
        </span>
        <span class="ql-formats">
            <span class="ql-align ql-picker ql-icon-picker" :class="{'ql-expanded': alignPickerExpanded}" v-on:click="alignPickerExpanded = !alignPickerExpanded">
                <span class="ql-picker-label" tabindex="0" role="button">
                    <svg viewBox="0 0 18 18">
                        <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
                        <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
                        <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
                    </svg>
                </span>
                <span class="ql-picker-options" tabindex="-1">
                    <span tabindex="0" role="button" class="ql-picker-item" v-on:click="setFormat('align','')" :class="{'ql-selected': isFormat('align',false)}">
                        <svg viewBox="0 0 18 18">
                            <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
                            <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
                            <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
                        </svg>
                    </span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="center" v-on:click="setFormat('align','center')" :class="{'ql-selected': isFormat('align','center')}">
                        <svg viewBox="0 0 18 18">
                            <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
                            <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
                            <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
                        </svg>
                    </span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="right" v-on:click="setFormat('align','right')" :class="{'ql-selected': isFormat('align','right')}">
                        <svg viewBox="0 0 18 18">
                            <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
                            <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
                            <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
                        </svg>
                    </span>
                    <span tabindex="0" role="button" class="ql-picker-item" data-value="justify" v-on:click="setFormat('align','justify')" :class="{'selected': isFormat('align','justify')}">
                        <svg viewBox="0 0 18 18">
                            <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
                            <line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"></line>
                            <line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"></line>
                        </svg>
                    </span>
                </span>
            </span>
            <select class="ql-align" style="display: none;">
                <option selected="selected"></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
            </select>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-clean">
                <svg class="" viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"></line>
                    <line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"></line>
                    <line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"></line>
                    <line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"></line>
                    <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"></rect>
                </svg>
            </button>
        </span>
        <span class="ql-formats">
            <button type="button" class="ql-link">
                <svg viewBox="0 0 18 18">
                    <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line>
                    <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
                    <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
                </svg>
            </button>
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
    </div>
</div>

</template>

<script>
import Toolbar from 'quill/modules/toolbar.js';
import { mapState, mapGetters } from "vuex";

export default {
	data: function(){
		return {
			alignPickerExpanded: false,
			textColorPickerExtended: false,
			backgroundColorPickerExtended: false,
			fontPickerExpanded: false,
			fonts: ["Roboto", "Arial", "Courier-New", "Georgia", "Trebuchet-MS", "Lucida-Sans-Unicode", "Times-New-Roman", "Verdana", "Futura", "Charter", "Terminal", "Clean", "Helvetica"],
		}
	},
	methods: {
		focusQuill: function() {
			this.$store.commit("focusQuill");
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
			console.log("setting " + format + " to " + value);
			this.$store.commit("formatText", {format, value}, {module: "core" });
		},
		setFormatRelative: function(format, value) {
			let currentFormat = this.getFormat(format) || 0;
			console.log(currentFormat);
			this.setFormat(format, currentFormat + value);
		},
		isFormat: function(format, value) {
			//console.log(format + ': ' + (this.getFormat(format) == value));
			return this.getFormat(format) == value;
		},
	},
	computed: {
		...mapState({
			loadedPage: state => state.core.loadedPage,
		}),
	},
}
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
</style>
