<template>
  <div class="kyc-container">
    <div class="kyc-form">
      <h2>Creator KYC Verification</h2>
      <p>As a creator, you need to complete KYC verification to access all features.</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="fullName">Full Legal Name:</label>
          <input
            id="fullName"
            v-model="fullName"
            type="text"
            required
            placeholder="Enter your full legal name"
          />
        </div>
        
        <div class="form-group">
          <label for="dateOfBirth">Date of Birth:</label>
          <input
            id="dateOfBirth"
            v-model="dateOfBirth"
            type="date"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea
            id="address"
            v-model="address"
            required
            placeholder="Enter your full address"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="idNumber">Government ID Number:</label>
          <input
            id="idNumber"
            v-model="idNumber"
            type="text"
            required
            placeholder="Enter your ID number"
          />
        </div>
        
        <div class="form-group">
          <label for="bankAccount">Bank Account Number:</label>
          <input
            id="bankAccount"
            v-model="bankAccount"
            type="text"
            required
            placeholder="Enter your bank account number"
          />
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Submitting...' : 'Submit KYC' }}
        </button>
      </form>
      
      <div class="skip-section">
        <button @click="skipKyc" class="skip-btn">
          Skip for now (Limited access)
        </button>
      </div>
      
      <div class="user-info">
        <h3>Current User Info:</h3>
        <p><strong>Email:</strong> {{ userInfo.email }}</p>
        <p><strong>Role:</strong> {{ userInfo.role }}</p>
        <p><strong>KYC Status:</strong> {{ userInfo.kyc === '1' ? 'Verified' : 'Pending' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'CreatorKycTemplate',
  setup() {
    const router = useRouter()
    const fullName = ref('')
    const dateOfBirth = ref('')
    const address = ref('')
    const idNumber = ref('')
    const bankAccount = ref('')
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
          role: decoded['custom:role'],
          kyc: decoded['custom:kyc']
        }
        
        // If not a creator or already verified, redirect
        if (decoded['custom:role'] !== 'creator') {
          router.push(`/${decoded['custom:role']}/dashboard`)
        } else if (decoded['custom:kyc'] === '1') {
          router.push('/creator/dashboard')
        }
      } catch (err) {
        console.error('Invalid token:', err)
        router.push('/login')
      }
    })

    const handleSubmit = async () => {
      loading.value = true
      
      // Simulate KYC submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('KYC submitted successfully! You will be notified once verified.')
      
      // Redirect to creator dashboard
      router.push('/creator/dashboard')
      
      loading.value = false
    }
    
    const skipKyc = () => {
      router.push('/creator/dashboard')
    }

    return {
      fullName,
      dateOfBirth,
      address,
      idNumber,
      bankAccount,
      loading,
      userInfo,
      handleSubmit,
      skipKyc
    }
  }
}
</script>

<style scoped>
.kyc-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.kyc-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.skip-section {
  margin-top: 1rem;
  text-align: center;
}

.skip-btn {
  background: #6c757d;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  width: auto;
}

.skip-btn:hover {
  background: #545b62;
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