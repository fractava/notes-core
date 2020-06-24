import Vue from "vue";
import Vuex from 'vuex'

import App from "./App.vue";
import Core from "@fractava/fractava-notes-core";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({});

Vue.use(Core, {store, debug: true,});

new Vue({
    render: function (h) { return h(App); },
    store,
}).$mount("#app");
