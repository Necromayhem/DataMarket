import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app
	.use(createPinia())
	.use(router)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
			options: {
				darkModeSelector: 'system',
			},
		},
	})

app.mount('#app')
