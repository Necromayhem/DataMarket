<script setup lang="ts">
import { useStocksFetch } from "./useStocksFetch";
import { useStocksStore } from "./useStocksStore";
import { useStocksFilters } from "./useStocksFilters";
import { stocksColumns } from "./stocksColumns";
import PrimeDataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";
import PrimeProgressSpinner from "primevue/progressspinner";
import PrimeInputText from "primevue/inputtext";
import PrimeInputNumber from "primevue/inputnumber";

const store = useStocksStore();
const { 
    filterInputs, 
    fetchParams, 
    filteredStocks,
    nmIdModel,
    quantityModel,
    scCodeModel,
    priceModel,
    discountModel,
    formatNumber
} = useStocksFilters(store);
const { isLoading, error } = useStocksFetch(fetchParams);
</script>

<template>
  <div class="card">
    <div class="filters">
      <div class="filter-group">
        <label for="supplier_article">Артикул поставщика:</label>
        <PrimeInputText v-model="filterInputs.supplier_article" placeholder="Поиск по артикулу" />
      </div>

      <div class="filter-group">
        <label for="warehouse_name">Склад:</label>
        <PrimeInputText v-model="filterInputs.warehouse_name" placeholder="Поиск по складу" />
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
        <label for="quantity">Количество:</label>
        <PrimeInputNumber 
          v-model="quantityModel" 
          placeholder="Поиск по количеству" 
          mode="decimal" 
          :minFractionDigits="0"
        />
      </div>

      <div class="filter-group">
        <label for="sc_code">Код поставщика:</label>
        <PrimeInputNumber 
          v-model="scCodeModel" 
          placeholder="Точный код" 
          mode="decimal" 
          :minFractionDigits="0"
        />
      </div>

      <div class="filter-group">
        <label for="price">Цена:</label>
        <PrimeInputNumber 
          v-model="priceModel" 
          placeholder="Поиск по цене" 
          mode="decimal" 
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </div>

      <div class="filter-group">
        <label for="discount">Скидка:</label>
        <PrimeInputNumber 
          v-model="discountModel" 
          placeholder="Поиск по скидке" 
          mode="decimal" 
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </div>

      <div class="filter-group">
        <label for="subject">Предмет:</label>
        <PrimeInputText v-model="filterInputs.subject" placeholder="Поиск по предмету" />
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
        :value="filteredStocks"
        :paginator="true"
        :rows="10"
        :totalRecords="filteredStocks.length"
        :rowsPerPageOptions="[10, 25, 50, 100]"
        stripedRows
        responsiveLayout="scroll"
        removableSort
        currentPageReportTemplate="Показано {first} - {last} из {totalRecords}"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      >
        <PrimeColumn
          v-for="col in stocksColumns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :sortable="true"
        >
          <template #body="{ data }">
            <template v-if="['price', 'discount'].includes(col.field)">
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