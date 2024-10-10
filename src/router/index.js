import {createRouter, createWebHistory} from "vue-router";
import navbarComponent from "../public/sidebar.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login',    component: navbarComponent},
        { path: '/',        redirect: '/login'},
        //{ path: '/forget-password',        },
        //{ path: '/home',        },
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
    ]
});

export default router;