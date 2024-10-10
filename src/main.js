import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import 'primeicons/primeicons.css'

createApp(App)
    .use(router)
    .mount('#app')
