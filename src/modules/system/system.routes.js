
import Login from './pages/login/login'

import KitchenList from './pages/kitchen/list'
import Single from './pages/kitchen/single'
import KitchenHome from './pages/kitchen/home'

import DrinksList from './pages/drinks/list'
import HallsList from './pages/halls/list'


export default [
    {
        path: 'login',
        name: 'login',
        component: Login
    },
    {
        path: 'kitchen-home',
        name: 'kitchen-home',
        component: KitchenHome
    },
    {
        path: 'kitchen-list',
        name: 'kitchen-list',
        component: KitchenList
    },
    {
        path: '/single/:id',
        name: 'single',
        component: Single
    },
    {
        path: 'drinks-list',
        name: 'drinks-list',
        component: DrinksList
    },
    {
        path: 'halls-list',
        name: 'halls-list',
        component: HallsList
    },
    
    
]