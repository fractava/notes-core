import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

// @ts-ignore
import Core from "../../core/src/index.js";

const app = createApp(App)

app.use(router)

app.use(Core, {debug: false,});

app.mount('#app')
