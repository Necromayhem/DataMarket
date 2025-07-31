<script setup lang="ts">
import { salesColumns } from "./salesColumns";
import PrimeDataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";
import type { Sale } from "./sales.types";

defineProps<{
  sales: Sale[];
}>();

const formatNumber = (value: string | number) => {
  if (!value && value !== 0) return "";
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return "";
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
};
</script>

<template>
  <PrimeDataTable
    :value="sales"
    :paginator="true"
    :rows="10"
    :totalRecords="sales.length"
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
        <template v-else-if="col.field === 'is_realization' || col.field === 'is_supply' || col.field === 'is_storno'">
          {{ data[col.field] ? 'Да' : 'Нет' }}
        </template>
        <template v-else>
          {{ data[col.field] || "-" }}
        </template>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>