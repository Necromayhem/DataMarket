<script setup lang="ts">
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const visible = ref(false); 
</script>

<template>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visible">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <Avatar image="/src/assets/images/кот.jpg" shape="circle" size="xlarge" />
                    <div class="text-center">
                        <div class="font-bold block">Иван Иванов</div>
                        <div class="text-sm text-gray-500">Аналитик</div> 
                    </div>
                </div>
            </template>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="Account" icon="pi pi-user" class="flex-auto" outlined></Button>
                    <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text></Button>
                </div>
            </template>
        </Drawer>
        <Button icon="pi pi-arrow-right" @click="visible = true" />
    </div>
</template>

<style scoped></style>