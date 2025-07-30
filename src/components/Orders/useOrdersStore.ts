import { defineStore } from 'pinia'
import type { Order } from './orders.types'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as Order[],
        allOrders: [] as Order[], // все загруженные данные для клиентской фильтрации
        total: 0,
        currentPage: 1,
        itemsPerPage: 100,
    }),
    actions: {
        setOrders(data: Order[]) {
            this.orders = data
            this.allOrders = data // все данные
        },
        setTotal(count: number) {
            this.total = count
        },
        setPage(page: number) {
            this.currentPage = page
        },
        setItemsPerPage(limit: number) {
            this.itemsPerPage = limit
        },
    },
    getters: {
        totalPages: state => Math.ceil(state.total / state.itemsPerPage),
    },
})