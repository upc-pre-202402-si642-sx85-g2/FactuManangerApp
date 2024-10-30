import {createRouter, createWebHistory} from "vue-router";
import LoginRegisterAndForgetPassword from "../domain/pages/login-register-and-forget-password.component.vue";
import portfolioComponent from "../portfolio/pages/portfolio.component.vue";
import homeContentComponent from "../home/home-content/home-content.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/login', component: LoginRegisterAndForgetPassword},
        { path: '/', redirect: '/login'},
        { path: '/register', component: LoginRegisterAndForgetPassword},
        { path: '/forget-password', component: LoginRegisterAndForgetPassword},
        {path: '/portfolio', component: portfolioComponent},
        { path: '/home', component:homeContentComponent},
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
        //{ path: '/404', name: '404', component:  }
    ]
});

export default router;