
import Home from './pages/home/home'
import Served from './pages/home/served'
import List from './pages/list/list'
import Requests from './pages/requests/requests'


export default [
    {
        path: '',
        name: 'kitchen.home',
        component: Home
    },
    {
        path: 'served',
        name: 'served',
        component: Served
    },
    {
        path: 'list',
        name: 'kitchen.list',
        component: List
    },
    {
        path: 'requests',
        name: 'requests',
        component: Requests
    },
]