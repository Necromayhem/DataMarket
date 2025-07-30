import { ref, type Ref, watch, toValue, type ComputedRef } from 'vue'
import type { StockApiResponse, StockFetchParams, Stock } from './stocks.types'
import { useStocksStore } from './useStocksStore'

const DEFAULT_PARAMS: StockFetchParams = {
    page: 1,
    limit: 100,
}

export function useStocksFetch(
    params?: StockFetchParams | Ref<StockFetchParams> | ComputedRef<StockFetchParams>
) {
    const data = ref<Stock[]>([])
    const error = ref<Error | null>(null)
    const isLoading = ref(false)
    const total = ref(0)
    const store = useStocksStore()

    const fetchData = async () => {
        isLoading.value = true
        error.value = null

        try {
            const currentParams = toValue(params) || DEFAULT_PARAMS
            const queryString = new URLSearchParams()

            queryString.append('key', import.meta.env.VITE_API_KEY)
            queryString.append('page', String(currentParams.page))
            queryString.append('limit', String(currentParams.limit))
            // Добавление текущей даты 
            const today = new Date().toISOString().split('T')[0]
            queryString.append('dateFrom', today)

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/stocks?${queryString}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const json: StockApiResponse = await response.json()
            data.value = json.data
            total.value = json.total || 0

            store.setStocks(json.data)
            store.setTotal(json.total || 0)
            store.setPage(currentParams.page || 1)
            store.setItemsPerPage(currentParams.limit || 100)
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('Unknown error')
        } finally {
            isLoading.value = false
        }
    }

    watch(
        () => toValue(params),
        () => {
            fetchData()
        },
        { immediate: true }
    )

    return {
        data,
        error,
        isLoading,
        total,
        refresh: fetchData,
    }
}