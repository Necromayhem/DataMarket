import { ref, type Ref, watchEffect, toValue } from 'vue'
import type {
	IncomeApiResponse,
	IncomeFetchParams,
	Income,
} from './incomes.types'
import { useIncomesStore } from './useIncomesStore'

const DEFAULT_PARAMS: IncomeFetchParams = {
	page: 1,
	limit: 100,
}

export function useIncomesFetch(
	params?: IncomeFetchParams | Ref<IncomeFetchParams>
) {
	const data = ref<Income[]>([])
	const error = ref<Error | null>(null)
	const isLoading = ref(false)
	const total = ref(0)
	const store = useIncomesStore()

	const fetchData = async () => {
		isLoading.value = true
		error.value = null

		try {
			const currentParams = toValue(params) || DEFAULT_PARAMS
			const queryString = new URLSearchParams()

			queryString.append('key', import.meta.env.VITE_API_KEY)
			queryString.append('page', String(currentParams.page))
			queryString.append('limit', String(currentParams.limit))

			// Добавляем только параметры дат, остальная фильтрация будет на клиенте
			if (currentParams.dateFrom) {
				queryString.append('dateFrom', currentParams.dateFrom)
			}
			if (currentParams.dateTo) {
				queryString.append('dateTo', currentParams.dateTo)
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/incomes?${queryString}`
			)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const json: IncomeApiResponse = await response.json()
			data.value = json.data
			total.value = json.total || 0

			store.setIncomes(json.data)
			store.setTotal(json.total || 0)
			store.setPage(currentParams.page || 1)
			store.setItemsPerPage(currentParams.limit || 100)
		} catch (err) {
			error.value = err instanceof Error ? err : new Error('Unknown error')
		} finally {
			isLoading.value = false
		}
	}

	watchEffect(() => {
		fetchData()
	})

	return {
		data,
		error,
		isLoading,
		total,
		refresh: fetchData,
	}
}
