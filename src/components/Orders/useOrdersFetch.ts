import { ref, type Ref, watch, toValue, type ComputedRef } from 'vue'
import type { OrderApiResponse, OrderFetchParams, Order } from './orders.types'
import { useOrdersStore } from './useOrdersStore'

const DEFAULT_PARAMS: OrderFetchParams = {
    page: 1,
    limit: 100,
}

export function useOrdersFetch(
    params?: OrderFetchParams | Ref<OrderFetchParams> | ComputedRef<OrderFetchParams>
) {
    const data = ref<Order[]>([])
    const error = ref<Error | null>(null)
    const isLoading = ref(false)
    const total = ref(0)
    const store = useOrdersStore()

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
                `${import.meta.env.VITE_API_BASE_URL}/orders?${queryString}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const json: OrderApiResponse = await response.json()
            data.value = json.data
            total.value = json.total || 0

            store.setOrders(json.data)
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