<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIncomesFetch } from './useIncomesFetch'
import { useIncomesStore } from './useIncomesStore'
import { formatDateForAPI, parseDateFromAPI } from '@/utils/dateUtils'
import { debounce } from '@/utils/debounce'
import PrimeButton from 'primevue/button'
import PrimeDataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import PrimeProgressSpinner from 'primevue/progressspinner'
import PrimeInputText from 'primevue/inputtext'
import PrimeCalendar from 'primevue/calendar'

// Рефы для фильтров
const nm_id_input = ref('')
const supplier_article_input = ref('')
const tech_size_input = ref('')
const barcode_input = ref('')
const quantity_input = ref('')

const filters = ref({
	dateFrom: '2024-01-01',
	dateTo: '2024-12-31',
	page: 1,
	limit: 100,
	warehouse_name: '',
	nm_id: undefined as number | undefined,
	supplier_article: '',
	tech_size: '',
	barcode: undefined as number | undefined,
	quantity: undefined as number | undefined,
})

const dateFromModel = ref(parseDateFromAPI(filters.value.dateFrom))
const dateToModel = ref(parseDateFromAPI(filters.value.dateTo))

const { isLoading, error, total, refresh } = useIncomesFetch(filters)
const store = useIncomesStore()

// Дебаунс для всех фильтров
const debouncedRefresh = debounce(() => {
	filters.value.page = 1 // Сброс страницы при изменении фильтра
	refresh()
}, 500)

watch([dateFromModel, dateToModel], ([newFrom, newTo]) => {
	if (newFrom && newTo) {
		filters.value.dateFrom = formatDateForAPI(newFrom)
		filters.value.dateTo = formatDateForAPI(newTo)
		debouncedRefresh()
	}
})

watch(
	() => filters.value.warehouse_name,
	() => debouncedRefresh()
)

watch(nm_id_input, newVal => {
	filters.value.nm_id = newVal ? Number(newVal) : undefined
	debouncedRefresh()
})

watch(supplier_article_input, newVal => {
	filters.value.supplier_article = newVal
	debouncedRefresh()
})

watch(tech_size_input, newVal => {
	filters.value.tech_size = newVal
	debouncedRefresh()
})

watch(barcode_input, newVal => {
	filters.value.barcode = newVal ? Number(newVal) : undefined
	debouncedRefresh()
})

watch(quantity_input, newVal => {
	filters.value.quantity = newVal ? Number(newVal) : undefined
	debouncedRefresh()
})

const nextPage = () => {
	filters.value.page++
}

const prevPage = () => {
	if (filters.value.page > 1) {
		filters.value.page--
	}
}

const onPage = (event: any) => {
	filters.value.page = event.page + 1
	filters.value.limit = event.rows
}
</script>

<template>
	<div class="card">
		<div class="filters">
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
					v-model="filters.warehouse_name"
					placeholder="Название склада"
					inputId="warehouse"
				/>
			</div>

			<div class="filter-group">
				<label for="nm_id">WB ID:</label>
				<PrimeInputText
					v-model="nm_id_input"
					placeholder="ID товара"
					type="number"
				/>
			</div>

			<div class="filter-group">
				<label for="supplier_article">Артикул:</label>
				<PrimeInputText
					v-model="supplier_article_input"
					placeholder="Артикул поставщика"
				/>
			</div>

			<div class="filter-group">
				<label for="tech_size">Размер:</label>
				<PrimeInputText
					v-model="tech_size_input"
					placeholder="Технический размер"
				/>
			</div>

			<div class="filter-group">
				<label for="barcode">Штрихкод:</label>
				<PrimeInputText
					v-model="barcode_input"
					placeholder="Штрихкод"
					type="number"
				/>
			</div>

			<div class="filter-group">
				<label for="quantity">Количество:</label>
				<PrimeInputText
					v-model="quantity_input"
					placeholder="Количество"
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
			<div class="pagination">
				<PrimeButton
					@click="prevPage"
					:disabled="filters.page === 1"
					icon="pi pi-chevron-left"
					label="Назад"
				/>

				<span class="page-info">
					Страница {{ filters.page }} из {{ store.totalPages }}
				</span>

				<PrimeButton
					@click="nextPage"
					:disabled="filters.page >= store.totalPages"
					icon="pi pi-chevron-right"
					iconPos="right"
					label="Вперёд"
				/>
			</div>

			<PrimeDataTable
				:value="store.incomes"
				:paginator="true"
				:rows="filters.limit"
				:totalRecords="total"
				:rowsPerPageOptions="[100, 250, 500]"
				:first="(filters.page - 1) * filters.limit"
				@page="onPage"
				stripedRows
				responsiveLayout="scroll"
				removableSort
			>
				<PrimeColumn
					field="income_id"
					header="ID"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="number"
					header="Номер"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn field="date" header="Дата" :sortable="true"></PrimeColumn>
				<PrimeColumn
					field="warehouse_name"
					header="Склад"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="supplier_article"
					header="Артикул"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="tech_size"
					header="Размер"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="barcode"
					header="Штрихкод"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="quantity"
					header="Количество"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="total_price"
					header="Цена"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="date_close"
					header="Дата закрытия"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="last_change_date"
					header="Последнее изменение"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="nm_id"
					header="WB ID"
					:sortable="true"
				></PrimeColumn>
				<PrimeColumn
					field="mn_id"
					header="ID маркетплейса"
					:sortable="true"
				></PrimeColumn>
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
