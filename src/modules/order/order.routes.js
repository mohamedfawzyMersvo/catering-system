
import Home from './pages/home/home'
import Order from './pages/order/order'
// import Requests from './pages/requests/requests'


export default [
    {
        path: '',
        name: 'order.home',
        component: Home
    },
    {
        path: 'list',
        name: 'order.list',
        component: Order
    },
    // {
    //     path: 'requests',
    //     name: 'requests',
    //     component: Requests
    // },
]