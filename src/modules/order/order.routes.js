
import Home from './pages/home/home'
import Order from './pages/order/order'
import ListMyOrders from './pages/listMyOrders/listMyOrders'


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
    {
        path: 'listMyOrders',
        name: 'listMyOrders',
        component: ListMyOrders
    },
]