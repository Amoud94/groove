import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);
import mainLayout from "@/layouts/main.vue"
import tasks from "@/views/tasks.vue"


export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: mainLayout,
            redirect: '/tasks',
            children:[
                {
                    path: '/tasks',
                    name:'tasks',
                    component: tasks,
                }
            ]
        },
    ],
})

export default router
