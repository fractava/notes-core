import Vue from "vue";
import Vuex from 'vuex';

import App from "./App.vue";
import Core from "@fractava/fractava-notes-core";

Vue.config.productionTip = false;

Vue.use(Vuex);

import vuexCoreModule from "@fractava/fractava-notes-core/src/vuex/vuex.js";

console.log(vuexCoreModule);

const store = new Vuex.Store({
    modules: {
        "core": vuexCoreModule,
    }
});

Vue.use(Core, {store, debug: true,});

new Vue({
    render: function (h) { return h(App); },
    store,
}).$mount("#app");
