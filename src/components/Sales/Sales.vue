<script setup lang="ts">
import { useSalesFetch } from "./useSalesFetch";
import { useSalesStore } from "./useSalesStore";
import { useSalesFilters } from "./useSalesFilters";
import { salesColumns } from "./salesColumns";
import PrimeDataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";
import PrimeProgressSpinner from "primevue/progressspinner";
import PrimeInputText from "primevue/inputtext";
import PrimeCalendar from "primevue/calendar";
import PrimeInputNumber from "primevue/inputnumber";

const store = useSalesStore();
const { 
    filterInputs, 
    dateFromModel, 
    dateToModel, 
    fetchParams, 
    filteredSales,
    nmIdModel,
    totalPriceModel,
    priceWithDiscModel,
    discountPercentModel,
    formatNumber
} = useSalesFilters(store);
const { isLoading, error } = useSalesFetch(fetchParams);
</script>

<template>
  <div class="card">
    <div class="filters">
      <div class="filter-group">
        <label for="g_number">Номер заказа:</label>
        <PrimeInputText v-model="filterInputs.g_number" placeholder="Поиск по номеру" />
      </div>

      <div class="filter-group">
        <label for="dateFrom">Дата с:</label>
        <PrimeCalendar v-model="dateFromModel" dateFormat="yy-mm-dd" showIcon inputId="dateFrom" />
      </div>

      <div class="filter-group">
        <label for="dateTo">Дата по:</label>
        <PrimeCalendar v-model="dateToModel" dateFormat="yy-mm-dd" showIcon inputId="dateTo" />
      </div>

      <div class="filter-group">
        <label for="supplier_article">Артикул:</label>
        <PrimeInputText v-model="filterInputs.supplier_article" placeholder="Поиск по артикулу" />
      </div>

      <div class="filter-group">
        <label for="nm_id">ID товара:</label>
        <PrimeInputNumber 
          v-model="nmIdModel" 
          placeholder="ID товара" 
          mode="decimal" 
          :minFractionDigits="0"
        />
      </div>

      <div class="filter-group">
        <label for="barcode">Штрихкод:</label>
        <PrimeInputText v-model="filterInputs.barcode" placeholder="Поиск по штрихкоду" />
      </div>

      <div class="filter-group">
        <label for="total_price">Общая цена:</label>
        <PrimeInputNumber 
          v-model="totalPriceModel" 
          placeholder="Цена от" 
          mode="decimal" 
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </div>

      <div class="filter-group">
        <label for="price_with_disc">Цена со скидкой:</label>
        <PrimeInputNumber 
          v-model="priceWithDiscModel" 
          placeholder="Цена со скидкой" 
          mode="decimal" 
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </div>

      <div class="filter-group">
        <label for="discount_percent">Скидка %:</label>
        <PrimeInputNumber 
          v-model="discountPercentModel" 
          placeholder="Скидка от" 
          mode="decimal" 
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </div>

      <div class="filter-group">
        <label for="warehouse_name">Склад:</label>
        <PrimeInputText v-model="filterInputs.warehouse_name" placeholder="Поиск по складу" />
      </div>

      <div class="filter-group">
        <label for="country_name">Страна:</label>
        <PrimeInputText v-model="filterInputs.country_name" placeholder="Поиск по стране" />
      </div>

      <div class="filter-group">
        <label for="region_name">Регион:</label>
        <PrimeInputText v-model="filterInputs.region_name" placeholder="Поиск по региону" />
      </div>

      <div class="filter-group">
        <label for="sale_id">ID продажи:</label>
        <PrimeInputText v-model="filterInputs.sale_id" placeholder="Поиск по ID продажи" />
      </div>

      <div class="filter-group">
        <label for="subject">Категория товара:</label>
        <PrimeInputText v-model="filterInputs.subject" placeholder="Поиск по категории" />
      </div>

      <div class="filter-group">
        <label for="brand">Бренд:</label>
        <PrimeInputText v-model="filterInputs.brand" placeholder="Поиск по бренду" />
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
        :value="filteredSales"
        :paginator="true"
        :rows="10"
        :totalRecords="filteredSales.length"
        :rowsPerPageOptions="[10, 25, 50, 100]"
        stripedRows
        responsiveLayout="scroll"
        removableSort
        currentPageReportTemplate="Показано {first} - {last} из {totalRecords}"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      >
        <PrimeColumn
          v-for="col in salesColumns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :sortable="true"
        >
          <template #body="{ data }">
            <template v-if="['total_price', 'for_pay', 'finished_price', 'price_with_disc', 'discount_percent'].includes(col.field)">
              {{ formatNumber(data[col.field]) }}
            </template>
            <template v-else>
              {{ data[col.field] || "-" }}
            </template>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: var(--text-color-secondary);
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.error-message {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--red-100);
  color: var(--red-700);
  border-radius: 6px;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
  
  .card {
    padding: 1rem;
  }
}
</style>