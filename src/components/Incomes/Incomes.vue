<script setup lang="ts">
import { useIncomesFetch } from "./useIncomesFetch";
import { useIncomesStore } from "./useIncomesStore";
import { useIncomesFilters } from "./useIncomesFilters";
import PrimeInputText from "primevue/inputtext";
import PrimeCalendar from "primevue/calendar";
import PrimeProgressSpinner from "primevue/progressspinner";
import PrimeButton from "primevue/button";
import IncomesTable from "./IncomesTable.vue";
import IncomesChart from "./IncomesChart.vue";
import { ref } from "vue";

const store = useIncomesStore();
const { filterInputs, dateFromModel, dateToModel, fetchParams, filteredIncomes } = useIncomesFilters(store);
const { isLoading, error } = useIncomesFetch(fetchParams);

const showTable = ref(true);
const toggleView = () => {
  showTable.value = !showTable.value;
};
</script>

<template>
  <div class="card">
    <div class="view-toggle">
      <PrimeButton 
        @click="toggleView" 
        :label="showTable ? 'Показать график' : 'Показать таблицу'" 
        icon="pi pi-chart-line"
        class="p-button-text"
      />
    </div>

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
      <IncomesTable v-if="showTable" :incomes="filteredIncomes" />
      <IncomesChart v-else :incomes="filteredIncomes" />
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

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.error-message {
  margin: 1rem 0;
  color: var(--red-500);
}

.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
