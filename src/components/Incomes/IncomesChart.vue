<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { Income } from './incomes.types';

Chart.register(...registerables);

const props = defineProps<{
  incomes: Income[];
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const prepareChartData = (incomes: Income[]) => {
  // Группируем по складам и считаем количество
  const warehouseData = incomes.reduce((acc, income) => {
    acc[income.warehouse_name] = (acc[income.warehouse_name] || 0) + income.quantity;
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: Object.keys(warehouseData),
    datasets: [{
      label: 'Количество товаров по складам',
      data: Object.values(warehouseData),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
      borderWidth: 1
    }]
  };
};

const renderChart = () => {
  if (!chartRef.value) return;
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartRef.value.getContext('2d');
  if (!ctx) return;

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: prepareChartData(props.incomes),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Распределение товаров по складам'
        }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.incomes, renderChart, { deep: true });
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  margin-top: 2rem;
}
</style>