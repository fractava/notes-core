import Vue from "vue";
//import Vuex from "vuex";

import FractavaNotes from "../../core/src/index.js";

Vue.config.productionTip = false;

//Vue.use(Vuex);

//Vue.use(store);
//Vue.$store = store;
Vue.use(FractavaNotes, { /*store,*/ debug: true, });
