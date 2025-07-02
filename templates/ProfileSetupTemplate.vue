<template>
  <OuterWrapper variant="centered">
    <div class="profile-setup-form">
      <h2>Profile Setup</h2>
      <p>Welcome! Please complete your profile setup.</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            placeholder="Enter your first name"
          />
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            placeholder="Enter your last name"
          />
        </div>
        
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Saving...' : 'Complete Setup' }}
        </button>
      </form>
      
      <div class="user-info">
        <h3>Current User Info:</h3>
        <p><strong>Email:</strong> {{ userInfo.email }}</p>
        <p><strong>Role:</strong> {{ userInfo.role }}</p>
      </div>
    </div>
  </OuterWrapper>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import OuterWrapper from '../components/OuterWrapper.vue'

export default {
  name: 'ProfileSetupTemplate',
  components: {
    OuterWrapper
  },
  setup() {
    const router = useRouter()
    const firstName = ref('')
    const lastName = ref('')
    const phone = ref('')
    const loading = ref(false)
    const userInfo = ref({})

    onMounted(() => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.push('/login')
        return
      }
      
      try {
        const decoded = jwtDecode(token)
        userInfo.value = {
          email: decoded.email,
          role: decoded['custom:role']
        }
      } catch (err) {
        console.error('Invalid token:', err)
        router.push('/login')
      }
    })

    const handleSubmit = async () => {
      loading.value = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // After profile setup, redirect based on role and KYC status
      const token = localStorage.getItem('authToken')
      const decoded = jwtDecode(token)
      
      if (decoded['custom:role'] === 'creator' && decoded['custom:kyc'] === '0') {
        router.push('/creator/kyc')
      } else {
        const role = decoded['custom:role']
        router.push(`/${role}/dashboard`)
      }
      
      loading.value = false
    }

    return {
      firstName,
      lastName,
      phone,
      loading,
      userInfo,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.profile-setup-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover:not(:disabled) {
  background: #218838;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.user-info {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.user-info h3 {
  margin-top: 0;
  color: #495057;
}
</style>