import PrimeVue from "primevue/config";
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Aura from '@primevue/themes/aura';

import router from "./router/index.js";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

const app = createApp(App);

app.
    use(PrimeVue,{theme: {
    preset: Aura,
        options: {
        prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
    }
}})
    .use(router)
    .component('pv-button', Button)
    .component('pv-floatLabel', FloatLabel)
    .component('pv-inputText', InputText)
    .mount('#app')
