import { ref, type Ref, watch, toValue, type ComputedRef } from 'vue'
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
  params?: IncomeFetchParams | Ref<IncomeFetchParams> | ComputedRef<IncomeFetchParams>
) {
  const data = ref<Income[]>([])
  const error = ref<Error | null>(null)
  const isLoading = ref(false)
  const total = ref(0)
  const store = useIncomesStore()

  const buildApiUrl = (params: IncomeFetchParams): string => {
    const baseUrl = '/api/incomes'
    const url = new URL(baseUrl, window.location.origin)
    
    // Обязательные параметры
    url.searchParams.append('key', import.meta.env.VITE_API_KEY)
    url.searchParams.append('page', String(params.page))
    url.searchParams.append('limit', String(params.limit))

    // Опциональные параметры дат
    if (params.dateFrom) {
      url.searchParams.append('dateFrom', params.dateFrom)
    }
    if (params.dateTo) {
      url.searchParams.append('dateTo', params.dateTo)
    }

    return url.toString()
  }

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const currentParams = toValue(params) || DEFAULT_PARAMS
      const apiUrl = buildApiUrl(currentParams)

      const response = await fetch(apiUrl)

      // Проверяем, что ответ действительно JSON
      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Expected JSON response, got: ${contentType}. Response: ${text.slice(0, 100)}...`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json: IncomeApiResponse = await response.json()
      
      // Валидация ответа
      if (!json.data || !Array.isArray(json.data)) {
        throw new Error('Invalid API response structure')
      }

      // Обновляем состояние
      data.value = json.data
      total.value = json.total || 0
      store.setIncomes(json.data)
      store.setTotal(json.total || 0)
      store.setPage(currentParams.page)
      store.setItemsPerPage(currentParams.limit)

    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error('API request failed:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Автоматический запрос при изменении параметров
  watch(
    () => toValue(params),
    () => {
      fetchData()
    },
    { immediate: true, deep: true }
  )

  return {
    data,
    error,
    isLoading,
    total,
    refresh: fetchData,
  }
}