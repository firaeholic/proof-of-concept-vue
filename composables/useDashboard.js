import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

/**
 * Shared dashboard composable for authentication and user management
 * Reduces code duplication across dashboard templates
 */
export function useDashboard() {
  const router = useRouter()
  const userInfo = ref({})

  const logout = () => {
    localStorage.removeItem('authToken')
    router.push('/en/login')
  }

  onMounted(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        userInfo.value = {
          email: decoded.email || 'user@example.com',
          role: decoded['custom:role'] || 'user',
          name: decoded.name || decoded.email?.split('@')[0] || 'User'
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        logout()
      }
    } else {
      router.push('/en/login')
    }
  })

  return {
    userInfo,
    logout
  }
}