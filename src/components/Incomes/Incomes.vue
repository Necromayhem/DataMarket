<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useIncomesFetch } from './useIncomesFetch'
import { useIncomesStore } from './useIncomesStore'
import { formatDateForAPI } from '@/utils/dateUtils'
import type{ FilterInputs } from './incomes.types'
import PrimeDataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import PrimeProgressSpinner from 'primevue/progressspinner'
import PrimeInputText from 'primevue/inputtext'
import PrimeCalendar from 'primevue/calendar'

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
})

const dateFromModel = ref<Date>(new Date(filterInputs.value.dateFrom))
const dateToModel = ref<Date>(new Date(filterInputs.value.dateTo))

const fetchParams = computed(() => ({
  page: 1,
  limit: 500,
  dateFrom: filterInputs.value.dateFrom,
  dateTo: filterInputs.value.dateTo,
}))

const { isLoading, error } = useIncomesFetch(fetchParams)
const store = useIncomesStore()

const filteredIncomes = computed(() => {
  return store.allIncomes.filter(income => {
    if (
      filterInputs.value.income_id &&
      income.income_id !== Number(filterInputs.value.income_id)
    ) {
      return false
    }
    if (
      filterInputs.value.number &&
      !income.number.includes(filterInputs.value.number)
    ) {
      return false
    }
    if (
      filterInputs.value.warehouse_name &&
      !income.warehouse_name
        .toLowerCase()
        .includes(filterInputs.value.warehouse_name.toLowerCase())
    ) {
      return false
    }
    if (
      filterInputs.value.nm_id &&
      !String(income.nm_id).includes(filterInputs.value.nm_id)
    ) {
      return false
    }
    if (
      filterInputs.value.supplier_article &&
      !income.supplier_article
        .toLowerCase()
        .includes(filterInputs.value.supplier_article.toLowerCase())
    ) {
      return false
    }
    if (
      filterInputs.value.tech_size &&
      !income.tech_size
        .toLowerCase()
        .includes(filterInputs.value.tech_size.toLowerCase())
    ) {
      return false
    }
    if (
      filterInputs.value.barcode &&
      !String(income.barcode).includes(filterInputs.value.barcode)
    ) {
      return false
    }
    if (
      filterInputs.value.quantity &&
      income.quantity !== Number(filterInputs.value.quantity)
    ) {
      return false
    }
    if (
      filterInputs.value.total_price &&
      !income.total_price.includes(filterInputs.value.total_price)
    ) {
      return false
    }
    if (
      filterInputs.value.date_close &&
      !income.date_close.includes(filterInputs.value.date_close)
    ) {
      return false
    }
    if (
      filterInputs.value.last_change_date &&
      !income.last_change_date.includes(filterInputs.value.last_change_date)
    ) {
      return false
    }

    return true
  })
})

watch([dateFromModel, dateToModel], ([newFrom, newTo]) => {
  if (newFrom) filterInputs.value.dateFrom = formatDateForAPI(newFrom)
  if (newTo) filterInputs.value.dateTo = formatDateForAPI(newTo)
})

const columns = [
	{ field: 'income_id', header: 'ID' },
	// { field: 'number', header: 'Номер' },
	{ field: 'date', header: 'Дата' },
	{ field: 'warehouse_name', header: 'Склад' },
	{ field: 'supplier_article', header: 'Артикул' },
	{ field: 'tech_size', header: 'Размер' },
	{ field: 'barcode', header: 'Штрихкод' },
	{ field: 'quantity', header: 'Количество' },
	{ field: 'total_price', header: 'Цена' },
	{ field: 'date_close', header: 'Дата закрытия' },
	{ field: 'last_change_date', header: 'Последнее изменение' },
	{ field: 'nm_id', header: 'ID маркетплейса' },
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
					v-model="filterInputs.nm_id"
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
				:value="filteredIncomes"
				:paginator="true"
				:rows="10"
				:totalRecords="filteredIncomes.length"
				:rowsPerPageOptions="[10, 25, 50, 100, 250, 500]"
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
