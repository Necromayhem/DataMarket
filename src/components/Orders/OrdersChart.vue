<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { Order } from './orders.types';

Chart.register(...registerables);

const props = defineProps<{
  orders: Order[];
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const prepareChartData = (orders: Order[]) => {
  // Группируем по статусу отмены и считаем количество
  const statusData = orders.reduce((acc, order) => {
    const status = order.is_cancel ? 'Отмененные' : 'Активные';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: Object.keys(statusData),
    datasets: [{
      label: 'Статус заказов',
      data: Object.values(statusData),
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)', // Активные - зеленый
        'rgba(255, 99, 132, 0.7)', // Отмененные - красный
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
    type: 'pie',
    data: prepareChartData(props.orders),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Распределение заказов по статусам'
        }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.orders, renderChart, { deep: true });
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