import PrimeVue from "primevue/config";
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from "primevue/card";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeflex/themes/primeone-light.css'
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";

const app = createApp(App);

app.
    use(PrimeVue,{theme: {
    preset: Aura,
        options: {
        prefix: 'p',
            cssLayer: false

    },
}})
    .use(router)
    .component('pv-dataTable', DataTable)
    .component('pv-column', Column)
    .component('pv-card', Card)
    .component('pv-button', Button)
    .component('pv-floatLabel', FloatLabel)
    .component('pv-inputText', InputText)
    .component('pv-inputNumber', InputNumber)
    .component('pv-datePicker', DatePicker)
    .mount('#app')
