import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/:pathMatch(.*)', redirect: '/404' },
    ]
});

export default router;