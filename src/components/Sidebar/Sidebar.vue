<script setup lang="ts">
import { ref } from "vue";
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import { useRouter } from "vue-router";
import Divider from "primevue/divider";

const visible = ref(false);
const router = useRouter();

const navigateTo = (routeName: string) => {
  visible.value = false;
  router.push({ name: routeName });
};

const menuItems = [
  { name: 'Incomes', label: 'Доходы', icon: 'pi pi-wallet' },
  { name: 'Orders', label: 'Заказы', icon: 'pi pi-shopping-cart' },
  { name: 'Sales', label: 'Продажи', icon: 'pi pi-chart-line' },
  { name: 'Stocks', label: 'Склады', icon: 'pi pi-box' }
];
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" position="left" :showCloseIcon="false">
      <template #header>
        <div class="flex flex-col items-center gap-2" >
          <Avatar
            image="/src/assets/images/кот.jpg"
            shape="circle"
            size="xlarge"
            style="margin-bottom: 16px;"
            
          />
          <div class="text-center">
            <div class="font-bold block">Иван Иванов</div>
            <div class="text-sm text-gray-500">Аналитик</div>
          </div>
        </div>
      </template>
      
      <div class="flex flex-col p-3">
        <Divider />
        <div 
          v-for="item in menuItems" 
          :key="item.name"
          class="mb-2"
        >
          <Button 
            @click="navigateTo(item.name)"
            :label="item.label" 
            :icon="item.icon" 
            text 
            severity="secondary"
            class="w-full justify-start p-3"
          />
          <Divider />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center gap-2 p-2">
          <Button
            label="Аккаунт"
            icon="pi pi-user"
            class="flex-auto"
            outlined
          />
          <Button
            label="Выйти"
            icon="pi pi-sign-out"
            class="flex-auto"
            severity="danger"
            text
          />
        </div>
      </template>
    </Drawer>
    <div style="margin-bottom: 20px">
      <Button icon="pi pi-align-justify" @click="visible = true" />
    </div>
  </div>
</template>

<style scoped>
.p-button {
  border-radius: 0;
}
</style>