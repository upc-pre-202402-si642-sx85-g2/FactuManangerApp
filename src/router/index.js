import {createRouter, createWebHistory} from "vue-router";
import LoginRegisterAndForgetPassword from "../domain/pages/login-register-and-forget-password.component.vue";
import portfolioListComponent from "../portfolio/components/portfolio-list.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/login', component: portfolioListComponent},
        { path: '/', redirect: '/login'},
        { path: '/register', component: LoginRegisterAndForgetPassword},
        { path: '/forget-password', component: LoginRegisterAndForgetPassword},
        //{ path: '/home',        },
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
        //{ path: '/404', name: '404', component:  }
    ]
});

export default router;