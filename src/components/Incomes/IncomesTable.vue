<script setup lang="ts">
import { incomesColumns } from "./incomesColumns";
import PrimeDataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";

defineProps<{
  incomes: any[];
}>();
</script>

<template>
  <PrimeDataTable
    :value="incomes"
    :paginator="true"
    :rows="10"
    :totalRecords="incomes.length"
    :rowsPerPageOptions="[10, 25, 50, 100, 250, 500]"
    stripedRows
    responsiveLayout="scroll"
    removableSort
  >
    <PrimeColumn
      v-for="col in incomesColumns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="true"
    >
      <template #body="{ data }">
        {{ data[col.field] || "-" }}
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>