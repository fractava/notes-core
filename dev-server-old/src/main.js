import Vue from "vue";
import Vuex from 'vuex';

import App from "./App.vue";
import Core from "../../core/src/index.js";

Vue.config.productionTip = false;

Vue.use(Vuex);

import vuexCoreModule from "../../core/src/vuex/vuex.js";

console.log(vuexCoreModule);

const store = new Vuex.Store({
    modules: {
        "core": vuexCoreModule,
    }
});

Vue.use(Core, {store, debug: false,});

new Vue({
    render: function (h) { return h(App); },
    store,
}).$mount("#app");
