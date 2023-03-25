import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Core from "../../core/src/index.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Core, {debug: false,});

app.mount('#app')
