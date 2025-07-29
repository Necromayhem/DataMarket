import { defineStore } from 'pinia'
import type { Income } from './incomes.types'

export const useIncomesStore = defineStore('incomes', {
	state: () => ({
		incomes: [] as Income[],
		total: 0,
		currentPage: 1,
		itemsPerPage: 100,
	}),
	actions: {
		setIncomes(data: Income[]) {
			this.incomes = data
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
