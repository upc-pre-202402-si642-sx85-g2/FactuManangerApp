import {createRouter, createWebHistory} from "vue-router";
import TheLoginContent from "@/public/pages/the-login-content.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login',    component: TheLoginContent},
        { path: '/',        redirect: '/login'},
        { path: '/register', component: TheRegisterContent},
        //{ path: '/forget-password',        },
        //{ path: '/home',        },
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
        { path: '/404', name: '404', component: PageNotFound }
    ]
});

export default router;