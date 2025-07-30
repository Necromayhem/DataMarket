
import { createRouter, createWebHistory } from 'vue-router'

const Incomes = () => import('@/components/Incomes/Incomes.vue')
const Orders = () => import('@/components/Orders/Orders.vue')
const Sales = () => import('@/components/Sales/Sales.vue')
const Stocks = () => import('@/components/Stocks/Stocks.vue')

const routes = [
  {
    path: '/incomes',
    name: 'Incomes',
    component: Incomes,
    meta: { title: 'Доходы' } 
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { title: 'Заказы' }
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales,
    meta: { title: 'Продажи' }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: { title: 'Склады' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router