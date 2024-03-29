
import Login from './pages/login/login'

import SystemHome from './home'

import KitchenList from './pages/kitchen/list'
import Single from './pages/kitchen/single'

import DrinksList from './pages/drinks/list'
import HallsList from './pages/halls/list'
import TabletList from './pages/tablet/list'
import Reports from './pages/reports/reports'
import RoomDetails from './pages/reports/roomDetails'
import RoomSingle from './pages/reports/roomSingle'

export default [
    {
        path: 'login',
        name: 'login',
        component: Login
    },
    {
        path: 'home',
        name: 'home',
        component: SystemHome
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
    {
        path: 'tablet-list',
        name: 'tablet-list',
        component: TabletList
    },
    {
        path: 'reports',
        name: 'reports',
        component: Reports
    },
    {
        path: '/roomDetails/:type?/:id?/:from?/:to?',
        name: 'room-details',
        component: RoomDetails,
        props: true
    },
    {
        path: '/roomSingle/:number?',
        name: 'room-single',
        component: RoomSingle,
        props: true
    },
    
]