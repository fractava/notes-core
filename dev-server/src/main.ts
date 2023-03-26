import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import router from './router'

import Core from "../../core/src/index.js";

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(Core, {debug: false,});

app.mount('#app')
