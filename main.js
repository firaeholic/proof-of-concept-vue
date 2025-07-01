// Main Vue application entry point
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import BasicTemplate from './templates/BasicTemplate.vue'

// Router configuration
const routes = [
  { path: '/', redirect: '/login' },
  
  // Authentication routes
  { path: '/login', component: () => import('./templates/LoginTemplate.vue'), name: 'login' },
  { path: '/profile-setup', component: () => import('./templates/ProfileSetupTemplate.vue'), name: 'profile-setup' },
  
  // Creator routes
  { path: '/creator/kyc', component: () => import('./templates/CreatorKycTemplate.vue'), name: 'creator-kyc' },
  { path: '/creator/dashboard', component: () => import('./templates/CreatorDashboardTemplate.vue'), name: 'creator-dashboard' },
  
  // Role-based dashboard routes
  { path: '/fan/dashboard', component: () => import('./templates/FanDashboardTemplate.vue'), name: 'fan-dashboard' },
  { path: '/vendor/dashboard', component: () => import('./templates/VendorDashboardTemplate.vue'), name: 'vendor-dashboard' },
  { path: '/agent/dashboard', component: () => import('./templates/AgentDashboardTemplate.vue'), name: 'agent-dashboard' },
  
  // Legacy routes (keeping for compatibility)
  { path: '/basic', component: BasicTemplate, name: 'basic' },
  { path: '/dash', component: () => import('./templates/DashboardTemplate.vue'), name: 'dash' },
  { path: '/profile', component: () => import('./templates/ProfileTemplate.vue'), name: 'profile' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Root app
const app = createApp(App)

app.use(router)
app.mount('#app')
