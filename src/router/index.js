import {createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/login',    component: },
        //{ path: '/',        redirect: '/login'},
        //{ path: '/register', component: },
        //{ path: '/forget-password',        },
        //{ path: '/home',        },
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
        //{ path: '/404', name: '404', component:  }
    ]
});

export default router;