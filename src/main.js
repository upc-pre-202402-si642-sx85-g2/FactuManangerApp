import PrimeVue from "primevue/config";
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import router from "./router/index.js";
import Button from "primevue/button";
import FloatLabel from 'primevue/floatlabel';

createApp(App).
    use(PrimeVue,{ripple: true})
    .use(router)
    .component('pv-button', Button)
    .component('pv-floatlabel', FloatLabel)
    .mount('#app')
