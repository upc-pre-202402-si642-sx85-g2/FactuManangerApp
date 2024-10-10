import {createRouter, createWebHistory} from "vue-router";
import TheHomeContent from "@/public/pages/the-home-content.component.vue";
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import ExaminerPerformanceOverview from "@/nursing/pages/examiner-performance-overview.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login',    component: TheHomeContent},
        { path: '/',        redirect: '/login'},
        { path: '/register', component: ExaminerPerformanceOverview},
        //{ path: '/forget-password',        },
        //{ path: '/home',        },
        //{ path: '/historial',        },
        { path: '/:pathMatch(.*)', redirect: '/404' },
        { path: '/404', name: '404', component: PageNotFound }
    ]
});

export default router;