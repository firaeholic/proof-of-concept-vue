// Route configuration with simplified arrays for easy management
import BasicTemplate from './templates/BasicTemplate.vue'

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

// Main route definitions
export const routes = [
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
  
  // Legacy routes for reference (remove later)
  { path: '/basic', component: BasicTemplate, name: 'basic' },
  { path: '/dash', component: () => import('./templates/DashboardTemplate.vue'), name: 'dash' },
  { path: '/profile', component: () => import('./templates/ProfileTemplate.vue'), name: 'profile' }
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