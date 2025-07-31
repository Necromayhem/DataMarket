<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { Stock } from './stocks.types';

Chart.register(...registerables);

const props = defineProps<{
  stocks: Stock[];
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const prepareChartData = (stocks: Stock[]) => {
  // Группируем по складам и суммируем количество товаров
  const warehouseData = stocks.reduce((acc, stock) => {
    if (!acc[stock.warehouse_name]) {
      acc[stock.warehouse_name] = 0;
    }
    acc[stock.warehouse_name] += stock.quantity;
    return acc;
  }, {} as Record<string, number>);

  // Сортируем по количеству (по убыванию)
  const sortedEntries = Object.entries(warehouseData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Берем топ-10 складов

  return {
    labels: sortedEntries.map(([name]) => name),
    datasets: [{
      label: 'Количество товаров на складе',
      data: sortedEntries.map(([_, quantity]) => quantity),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
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
    data: prepareChartData(props.stocks),
    options: {
      indexAxis: 'y', // Горизонтальные столбцы
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Топ складов по количеству товаров'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return ` ${context.parsed.x} товаров`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Количество товаров'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Склады'
          }
        }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.stocks, renderChart, { deep: true });
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 500px;
  margin-top: 2rem;
}
</style>