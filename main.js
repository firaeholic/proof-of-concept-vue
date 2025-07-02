// Main Vue application entry point
import { createApp } from 'vue'
import { jwtDecode } from 'jwt-decode'
import App from './App.vue'
import router from './router/index.js'
import { i18n } from './i18n/index.js'

// Navigation guard is now handled in router/index.js

// Root app
const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
