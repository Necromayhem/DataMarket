import { defineStore } from 'pinia'
import type { Stock } from './stocks.types'

export const useStocksStore = defineStore('stocks', {
    state: () => ({
        stocks: [] as Stock[],
        allStocks: [] as Stock[], // все загруженные данные для клиентской фильтрации
        total: 0,
        currentPage: 1,
        itemsPerPage: 100,
    }),
    actions: {
        setStocks(data: Stock[]) {
            this.stocks = data
            this.allStocks = data // все данные
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