<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useIncomesFetch } from './useIncomesFetch'
import { useIncomesStore } from './useIncomesStore'
import type { IncomeFetchParams } from './incomes.types'
import { formatDateForAPI } from '@/utils/dateUtils'
import { debounce } from '@/utils/debounce'
import PrimeButton from 'primevue/button'
import PrimeDataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import PrimeProgressSpinner from 'primevue/progressspinner'
import PrimeInputText from 'primevue/inputtext'
import PrimeCalendar from 'primevue/calendar'

type FilterInputs = {
	income_id: string
	number: string
	dateFrom: string
	dateTo: string
	warehouse_name: string
	nm_id: string
	supplier_article: string
	tech_size: string
	barcode: string
	quantity: string
	total_price: string
	date_close: string
	last_change_date: string
	mn_id: string
}

const filterInputs = ref<FilterInputs>({
	income_id: '',
	number: '',
	dateFrom: '2024-01-01',
	dateTo: '2024-12-31',
	warehouse_name: '',
	nm_id: '',
	supplier_article: '',
	tech_size: '',
	barcode: '',
	quantity: '',
	total_price: '',
	date_close: '',
	last_change_date: '',
	mn_id: '',
})

const filters = ref<IncomeFetchParams>({
	page: 1,
	limit: 100,
})

const dateFromModel = ref<Date>(
	new Date(filterInputs.value.dateFrom || Date.now())
)
const dateToModel = ref<Date>(new Date(filterInputs.value.dateTo || Date.now()))

const { isLoading, error, total, refresh } = useIncomesFetch(filters)
const store = useIncomesStore()

const transformToAPIParams = (inputs: FilterInputs): IncomeFetchParams => {
	const result: IncomeFetchParams = {
		page: filters.value.page,
		limit: filters.value.limit,
	}

	const numericFields = ['nm_id', 'quantity', 'income_id', 'mn_id'] as const

	for (const [key, value] of Object.entries(inputs)) {
		if (value !== undefined && value !== null && value !== '') {
			if (key === 'dateFrom' || key === 'dateTo') {
				result[key] = value
			} else if (
				numericFields.includes(key as (typeof numericFields)[number])
			) {
				result[key as keyof IncomeFetchParams] = Number(value) as never
			} else {
				result[key as keyof IncomeFetchParams] = value as never
			}
		}
	}

	return result
}

const debouncedRefresh = debounce(() => {
	filters.value = {
		...transformToAPIParams(filterInputs.value),
		page: 1, // Сбрасываем на первую страницу при изменении фильтров
	}
	refresh()
}, 500)

watch(filterInputs, debouncedRefresh, { deep: true })

watch([dateFromModel, dateToModel], ([newFrom, newTo]) => {
	if (newFrom) filterInputs.value.dateFrom = formatDateForAPI(newFrom)
	if (newTo) filterInputs.value.dateTo = formatDateForAPI(newTo)
})

const columns = [
	{ field: 'income_id', header: 'ID' },
	{ field: 'number', header: 'Номер' },
	{ field: 'date', header: 'Дата' },
	{ field: 'warehouse_name', header: 'Склад' },
	{ field: 'supplier_article', header: 'Артикул' },
	{ field: 'tech_size', header: 'Размер' },
	{ field: 'barcode', header: 'Штрихкод' },
	{ field: 'quantity', header: 'Количество' },
	{ field: 'total_price', header: 'Цена' },
	{ field: 'date_close', header: 'Дата закрытия' },
	{ field: 'last_change_date', header: 'Последнее изменение' },
	{ field: 'nm_id', header: 'WB ID' },
	{ field: 'mn_id', header: 'ID маркетплейса' },
]
</script>

<template>
	<div class="card">
		<div class="filters">
			<div class="filter-group">
				<label for="income_id">ID поступления:</label>
				<PrimeInputText
					v-model="filterInputs.income_id"
					placeholder="ID поступления"
					type="number"
				/>
			</div>

			<div class="filter-group">
				<label for="number">Номер:</label>
				<PrimeInputText
					v-model="filterInputs.number"
					placeholder="Номер"
					@input="debouncedRefresh()"
				/>
			</div>

			<div class="filter-group">
				<label for="dateFrom">Дата с:</label>
				<PrimeCalendar
					v-model="dateFromModel"
					dateFormat="yy-mm-dd"
					showIcon
					inputId="dateFrom"
				/>
			</div>

			<div class="filter-group">
				<label for="dateTo">Дата по:</label>
				<PrimeCalendar
					v-model="dateToModel"
					dateFormat="yy-mm-dd"
					showIcon
					inputId="dateTo"
				/>
			</div>

			<div class="filter-group">
				<label for="warehouse">Склад:</label>
				<PrimeInputText
					v-model="filterInputs.warehouse_name"
					placeholder="Название склада"
					inputId="warehouse"
				/>
			</div>

			<div class="filter-group">
				<label for="nm_id">WB ID:</label>
				<PrimeInputText
					v-model="filterInputs.nm_id"
					placeholder="ID товара"
					type="number"
				/>
			</div>

			<div class="filter-group">
				<label for="supplier_article">Артикул:</label>
				<PrimeInputText
					v-model="filterInputs.supplier_article"
					placeholder="Артикул поставщика"
				/>
			</div>

			<div class="filter-group">
				<label for="tech_size">Размер:</label>
				<PrimeInputText
					v-model="filterInputs.tech_size"
					placeholder="Технический размер"
				/>
			</div>

			<div class="filter-group">
				<label for="barcode">Штрихкод:</label>
				<PrimeInputText v-model="filterInputs.barcode" placeholder="Штрихкод" />
			</div>

			<div class="filter-group">
				<label for="quantity">Количество:</label>
				<PrimeInputText
					v-model="filterInputs.quantity"
					placeholder="Количество"
					type="number"
				/>
			</div>

			<div class="filter-group">
				<label for="total_price">Цена:</label>
				<PrimeInputText v-model="filterInputs.total_price" placeholder="Цена" />
			</div>

			<div class="filter-group">
				<label for="mn_id">ID маркетплейса:</label>
				<PrimeInputText
					v-model="filterInputs.mn_id"
					placeholder="ID маркетплейса"
					type="number"
				/>
			</div>
		</div>

		<div v-if="isLoading" class="loading-spinner">
			<PrimeProgressSpinner />
		</div>

		<div v-else-if="error" class="error-message">
			{{ error.message }}
		</div>

		<div v-else>
			<PrimeDataTable
				:value="store.incomes"
				:paginator="true"
				:rows="filters.limit"
				:totalRecords="total"
				:rowsPerPageOptions="[100, 250, 500]"
				v-model:first="filters.page"
				@page="
					e => {
						filters.page = e.page + 1
						filters.limit = e.rows
						refresh()
					}
				"
				stripedRows
				responsiveLayout="scroll"
				removableSort
			>
				<PrimeColumn
					v-for="col in columns"
					:key="col.field"
					:field="col.field"
					:header="col.header"
					:sortable="true"
				>
					<template #body="{ data }">
						{{ data[col.field] || '-' }}
					</template>
				</PrimeColumn>
			</PrimeDataTable>
		</div>
	</div>
</template>

<style scoped>
.card {
	padding: 2rem;
	border-radius: 12px;
	background: white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filters {
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
}

.filter-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	min-width: 200px;
}

.pagination {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
}

.page-info {
	font-size: 0.875rem;
	color: var(--text-color-secondary);
}

.loading-spinner {
	display: flex;
	justify-content: center;
	padding: 2rem;
}

.error-message {
	margin: 1rem 0;
	color: var(--red-500);
}
</style>
