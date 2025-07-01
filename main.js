// Main Vue application entry point
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import App from './App.vue'
import BasicTemplate from './templates/BasicTemplate.vue'

// Router configuration
const routes = [
  { path: '/', redirect: '/login' },
  
  // Authentication routes
  { path: '/login', component: () => import('./templates/LoginTemplate.vue'), name: 'login' },
  { path: '/profile-setup', component: () => import('./templates/ProfileSetupTemplate.vue'), name: 'profile-setup', meta: { requiresAuth: true } },
  
  // Creator routes
  { path: '/creator/kyc', component: () => import('./templates/CreatorKycTemplate.vue'), name: 'creator-kyc', meta: { requiresAuth: true, role: 'creator' } },
  { path: '/creator/dashboard', component: () => import('./templates/CreatorDashboardTemplate.vue'), name: 'creator-dashboard', meta: { requiresAuth: true, role: 'creator' } },
  
  // Role-based dashboard routes
  { path: '/fan/dashboard', component: () => import('./templates/FanDashboardTemplate.vue'), name: 'fan-dashboard', meta: { requiresAuth: true, role: 'fan' } },
  { path: '/vendor/dashboard', component: () => import('./templates/VendorDashboardTemplate.vue'), name: 'vendor-dashboard', meta: { requiresAuth: true, role: 'vendor' } },
  { path: '/agent/dashboard', component: () => import('./templates/AgentDashboardTemplate.vue'), name: 'agent-dashboard', meta: { requiresAuth: true, role: 'agent' } },
  
  // Legacy routes (keeping for compatibility)
  { path: '/basic', component: BasicTemplate, name: 'basic' },
  { path: '/dash', component: () => import('./templates/DashboardTemplate.vue'), name: 'dash' },
  { path: '/profile', component: () => import('./templates/ProfileTemplate.vue'), name: 'profile' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Global navigation guard for route protection
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  
  // Auto-redirect logged-in users from auth pages
  if (['/login', '/signup', '/'].includes(to.path)) {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const role = decoded['custom:role']
        
        // Check if token is valid and has role
        if (role) {
          // Redirect to appropriate dashboard
          next(`/${role}/dashboard`)
          return
        }
      } catch (err) {
        // Invalid token, remove it and continue to auth page
        localStorage.removeItem('authToken')
      }
    }
    // Allow access to auth pages for non-authenticated users
    next()
    return
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!token) {
      // No token, redirect to login
      next('/login')
      return
    }
    
    try {
      const decoded = jwtDecode(token)
      
      // Check if email is verified
       if (decoded.email_verified === false) {
         alert('Please verify your email before accessing this page.')
         localStorage.removeItem('authToken')
         next('/login')
         return
       }
      
      // Check role if route has role requirement
      if (to.meta.role && decoded['custom:role'] !== to.meta.role) {
        alert(`Access denied. This page requires ${to.meta.role} role.`)
        // Redirect to their appropriate dashboard
        const userRole = decoded['custom:role']
        if (userRole) {
          next(`/${userRole}/dashboard`)
        } else {
          next('/login')
        }
        return
      }
      
      // All checks passed, allow access
      next()
    } catch (err) {
      // Invalid token, remove it and redirect to login
      localStorage.removeItem('authToken')
      next('/login')
    }
  } else {
    // Route doesn't require auth, allow access
    next()
  }
})

// Root app
const app = createApp(App)

app.use(router)
app.mount('#app')
