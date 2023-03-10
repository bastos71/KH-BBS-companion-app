import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueSelect from 'vue-select'

import './assets/main.scss'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as bootstrap from 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('v-select', VueSelect)

app.mount('#app')
