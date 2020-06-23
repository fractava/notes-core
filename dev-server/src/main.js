import Vue from "vue";
import App from "./App.vue";
import Core from "@fractava/fractava-notes-core";

Vue.config.productionTip = false;

Vue.use(Core, {debug: true,});

new Vue({
	render: function (h) { return h(App); },
}).$mount("#app");
