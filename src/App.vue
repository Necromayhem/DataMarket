<script setup lang="ts">
import Sidebar from './components/Sidebar/Sidebar.vue';
import PrimeButton from 'primevue/button';
import { ref } from 'vue';

const sidebarVisible = ref(true);
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<template>
  <div class="app-container">
    <Sidebar v-model:visible="sidebarVisible" />
    
    <div class="main-content">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 1rem;
}



.sidebar-toggle {
  margin-right: auto;
}
</style>