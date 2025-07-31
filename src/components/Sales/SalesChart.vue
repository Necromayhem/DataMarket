<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { Sale } from './sales.types';

Chart.register(...registerables);

const props = defineProps<{
  sales: Sale[];
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const prepareChartData = (sales: Sale[]) => {
  // Группируем по дате и суммируем общую выручку
  const dailySales = sales.reduce((acc, sale) => {
    const date = sale.date.split('T')[0]; // Берем только дату без времени
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += parseFloat(sale.price_with_disc);
    return acc;
  }, {} as Record<string, number>);

  // Сортируем даты по возрастанию
  const sortedDates = Object.keys(dailySales).sort();
  
  return {
    labels: sortedDates,
    datasets: [{
      label: 'Выручка по дням',
      data: sortedDates.map(date => dailySales[date]),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
      fill: true
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
    type: 'line',
    data: prepareChartData(props.sales),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Динамика продаж по дням'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Сумма продаж'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Дата'
          }
        }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.sales, renderChart, { deep: true });
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