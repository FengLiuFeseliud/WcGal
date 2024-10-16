import './assets/main.css'
import './assets/iconfont.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import { router } from './router';
import { UserRequest } from './request/UserRequest';

axios.defaults.withCredentials = true;

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

await UserRequest.info()