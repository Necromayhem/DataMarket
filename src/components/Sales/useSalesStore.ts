import { defineStore } from 'pinia'
import type { Sale } from './sales.types'

export const useSalesStore = defineStore('sales', {
    state: () => ({
        sales: [] as Sale[],
        allSales: [] as Sale[], // все загруженные данные для клиентской фильтрации
        total: 0,
        currentPage: 1,
        itemsPerPage: 100,
    }),
    actions: {
        setSales(data: Sale[]) {
            this.sales = data
            this.allSales = data // все данные
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