// import Vue from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import KitchenRoutes from './modules/kitchen/kitchen.routes'
import OrdersRoutes from './modules/order/order.routes'
import SystemRoutes from './modules/system/system.routes'
import Login from './modules/system/pages/login/login'

// Vue.use(Router)

// const router = new Router({
//     routes: [
//         {
//             path: '',
//             redirect: '/'
//         },
//         {
//             path: '/kitchen',
//             component: () => import( /* webpackChunkName: "kitchen" */ './modules/kitchen'),
//             children: KitchenRoutes
//         },

//     ]
// })

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            // redirect: '/',
            component: Login
        },
        {
            name:'kitchen',
            path: '/kitchen',
            component: () => import( /* webpackChunkName: "kitchen" */ './modules/kitchen'),
            children: KitchenRoutes,
            redirect: {
                name: 'kitchen.home'
            }
        },
        {
            name:"order",
            path: '/order',
            component: () => import( /* webpackChunkName: "order" */ './modules/order'),
            children: OrdersRoutes,
            redirect: {
                name: 'kitchen.home'
            }
        },
        {
            name:"system",
            path: '/system',
            component: () => import( /* webpackChunkName: "system" */ './modules/system'),
            children: SystemRoutes,
            redirect: {
                name: 'kitchen-home'
            }
        },

    ]
  })

export default router;

