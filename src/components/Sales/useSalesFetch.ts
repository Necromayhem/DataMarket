import { ref, type Ref, watch, toValue, type ComputedRef } from 'vue'
import type { SaleApiResponse, SaleFetchParams, Sale } from './sales.types'
import { useSalesStore } from './useSalesStore'

const DEFAULT_PARAMS: SaleFetchParams = {
    page: 1,
    limit: 100,
}

export function useSalesFetch(
    params?: SaleFetchParams | Ref<SaleFetchParams> | ComputedRef<SaleFetchParams>
) {
    const data = ref<Sale[]>([])
    const error = ref<Error | null>(null)
    const isLoading = ref(false)
    const total = ref(0)
    const store = useSalesStore()

    const fetchData = async () => {
        isLoading.value = true
        error.value = null

        try {
            const currentParams = toValue(params) || DEFAULT_PARAMS
            const queryString = new URLSearchParams()

            queryString.append('key', import.meta.env.VITE_API_KEY)
            queryString.append('page', String(currentParams.page))
            queryString.append('limit', String(currentParams.limit))

            if (currentParams.dateFrom) {
                queryString.append('dateFrom', currentParams.dateFrom)
            }
            if (currentParams.dateTo) {
                queryString.append('dateTo', currentParams.dateTo)
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/sales?${queryString}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const json: SaleApiResponse = await response.json()
            data.value = json.data
            total.value = json.total || 0

            store.setSales(json.data)
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