import { createRouter, createWebHashHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { loadTranslations, setLocale, isLocaleSupported, DEFAULT_LOCALE } from '../i18n/index.js'

// Import components
import BasicTemplate from '../templates/BasicTemplate.vue'

// Routes that require authentication
export const AUTH_REQUIRED_ROUTES = [
  '/profile-setup',
  '/creator/kyc',
  '/creator/dashboard',
  '/fan/dashboard',
  '/vendor/dashboard',
  '/agent/dashboard'
]

// Role-specific route mappings
export const ROLE_ROUTES = {
  'creator': ['/creator/kyc', '/creator/dashboard'],
  'fan': ['/fan/dashboard'],
  'vendor': ['/vendor/dashboard'],
  'agent': ['/agent/dashboard']
}

// Routes that should redirect logged-in users
export const REDIRECT_LOGGED_IN_ROUTES = [
  '/',
  '/en/login',
  '/am/login',
  '/signup'
]

// Helper functions for route checking
export const requiresAuth = (path) => AUTH_REQUIRED_ROUTES.includes(path)

export const getRequiredRole = (path) => {
  for (const [role, paths] of Object.entries(ROLE_ROUTES)) {
    if (paths.includes(path)) {
      return role
    }
  }
  return null
}

export const shouldRedirectLoggedIn = (path) => REDIRECT_LOGGED_IN_ROUTES.includes(path)

export const getDashboardRoute = (role) => `/${role}/dashboard`

// Define routes
const routes = [
  // Root redirect to login with default locale
  { path: '/', redirect: '/en/login' },
  
  // Redirect plain login to default locale
  { 
    path: '/login', 
    redirect: '/en/login'
  },
  
  // Locale-based login routes only
  { 
    path: '/en/login', 
    component: () => import('../templates/LoginTemplate.vue'), 
    name: 'login-en',
    meta: { page: 'login', locale: 'en' }
  },
  { 
    path: '/am/login', 
    component: () => import('../templates/LoginTemplate.vue'), 
    name: 'login-am',
    meta: { page: 'login', locale: 'am' }
  },
  
  // Regular routes without locale prefixes
  { 
    path: '/profile-setup', 
    component: () => import('../templates/ProfileSetupTemplate.vue'), 
    name: 'profile-setup', 
    meta: { requiresAuth: true }
  },
  
  // Creator routes
  { 
    path: '/creator/kyc', 
    component: () => import('../templates/CreatorKycTemplate.vue'), 
    name: 'creator-kyc', 
    meta: { requiresAuth: true, role: 'creator' }
  },
  { 
    path: '/creator/dashboard', 
    component: () => import('../templates/CreatorDashboardTemplate.vue'), 
    name: 'creator-dashboard', 
    meta: { requiresAuth: true, role: 'creator' }
  },
  
  // Role-based dashboard routes
  { 
    path: '/fan/dashboard', 
    component: () => import('../templates/FanDashboardTemplate.vue'), 
    name: 'fan-dashboard', 
    meta: { requiresAuth: true, role: 'fan' }
  },
  { 
    path: '/vendor/dashboard', 
    component: () => import('../templates/VendorDashboardTemplate.vue'), 
    name: 'vendor-dashboard', 
    meta: { requiresAuth: true, role: 'vendor' }
  },
  { 
    path: '/agent/dashboard', 
    component: () => import('../templates/AgentDashboardTemplate.vue'), 
    name: 'agent-dashboard', 
    meta: { requiresAuth: true, role: 'agent' }
  },
  
  // Demo and utility routes
  { 
    path: '/viewport-demo', 
    component: () => import('../templates/ViewportDemoTemplate.vue'), 
    name: 'viewport-demo'
  },
  
  // Legacy routes for reference
  { 
    path: '/basic', 
    component: BasicTemplate, 
    name: 'basic'
  },
  { 
    path: '/dash', 
    component: () => import('../templates/DashboardTemplate.vue'), 
    name: 'dash'
  },
  { 
    path: '/profile', 
    component: () => import('../templates/ProfileTemplate.vue'), 
    name: 'profile'
  },
  
  // Catch all route - redirect to login with default locale
  { path: '/:pathMatch(.*)*', redirect: '/en/login' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Helper function to check if route is a login route
function isLoginRoute(fullPath) {
  return ['/en/login', '/am/login'].includes(fullPath)
}

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  // Handle i18n only for login routes
  if (isLoginRoute(to.fullPath)) {
    // Extract locale from route meta or default
    const locale = to.meta.locale || DEFAULT_LOCALE
    
    // Set the locale in i18n
    setLocale(locale)
    
    // Load translations for login page
    if (to.meta.page) {
      try {
        await loadTranslations(locale, to.meta.page)
      } catch (error) {
        console.warn('Failed to load translations:', error)
      }
    }
  }
  
  const token = localStorage.getItem('authToken')
  
  // Auto-redirect logged-in users from login pages
  if (shouldRedirectLoggedIn(to.fullPath)) {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const role = decoded['custom:role']
        
        if (role) {
          next(getDashboardRoute(role))
          return
        }
      } catch (err) {
        localStorage.removeItem('authToken')
      }
    }
    next()
    return
  }
  
  // Check if route requires authentication
  if (requiresAuth(to.fullPath)) {
    if (!token) {
      next('/en/login')
      return
    }
    
    try {
      const decoded = jwtDecode(token)
      
      if (decoded.email_verified === false) {
        alert('Please verify your email before accessing this page.')
        localStorage.removeItem('authToken')
        next('/login')
        return
      }
      
      const requiredRole = getRequiredRole(to.fullPath)
      if (requiredRole && decoded['custom:role'] !== requiredRole) {
        alert(`Access denied. This page requires ${requiredRole} role.`)
        const userRole = decoded['custom:role']
        if (userRole) {
          next(getDashboardRoute(userRole))
        } else {
          next('/en/login')
        }
        return
      }
      
      next()
    } catch (err) {
      localStorage.removeItem('authToken')
      next('/en/login')
    }
  } else {
    next()
  }
})

export default router