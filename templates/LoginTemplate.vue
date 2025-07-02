<template>
  <OuterWrapper variant="centered">
    <div class="login-form">
      <h2>{{ $t('login.title') }}</h2>
      <p class="subtitle">{{ $t('login.subtitle') }}</p>
      
      <form @submit.prevent="handleLogin">
        <FormGroup :label="$t('login.email') + ':' " field-id="email">
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :placeholder="$t('login.email')"
          />
        </FormGroup>
        <FormGroup :label="$t('login.password') + ':' " field-id="password">
          <input
            id="password"
            v-model="password"
            type="password"
            required
            :placeholder="$t('login.password')"
          />
        </FormGroup>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            {{ $t('login.rememberMe') }}
          </label>
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : $t('login.loginButton') }}
        </button>
      </form>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="login-footer">
        <p>
          <a href="#" class="forgot-link">{{ $t('login.forgotPassword') }}</a>
        </p>
        <p>
          {{ $t('login.noAccount') }} 
          <a href="#" class="signup-link">{{ $t('login.signUp') }}</a>
        </p>
      </div>
      
      <div class="test-users">
        <h3>Test Users:</h3>
        <ul>
          <li>creator@example.com (Creator, needs KYC)</li>
          <li>fan@example.com (Fan, verified)</li>
          <li>vendor@example.com (Vendor, verified)</li>
          <li>agent@example.com (Agent, verified)</li>
          <li>newcreator@example.com (Creator, unverified email)</li>
        </ul>
        <p>Password for all: <strong>password123</strong></p>
      </div>
    </div>
  </OuterWrapper>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import FormGroup from '../components/FormGroup.vue'
import OuterWrapper from '../components/OuterWrapper.vue'

export default {
  name: 'LoginTemplate',
  components: {
    FormGroup,
    OuterWrapper
  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const rememberMe = ref(false)

    const mockLogin = async (email, password) => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Login failed')
        }

        const data = await response.json()
        return data
      } catch (err) {
        throw new Error(err.message || 'Network error')
      }
    }

    const handleLogin = async () => {
      loading.value = true
      error.value = ''

      try {
        const { token } = await mockLogin(email.value, password.value)
        
        // Store token in localStorage
        localStorage.setItem('authToken', token)
        
        // Decode JWT to get user info
        const decodedToken = jwtDecode(token)
        console.log('Decoded token:', decodedToken)
        
        // Redirect based on token content
        if (!decodedToken.email_verified) {
          alert('Please verify your email before logging in.')
          return
        }
        
        if (decodedToken['custom:first_time_user'] === '1') {
          router.push('/profile-setup')
        } else if (decodedToken['custom:role'] === 'creator' && decodedToken['custom:kyc'] === '0') {
          router.push('/creator/kyc')
        } else {
          const role = decodedToken['custom:role']
          router.push(`/${role}/dashboard`)
        }
        
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      error,
      rememberMe,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}



.form-options {
  margin: 1rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6c757d;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.login-footer p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.forgot-link,
.signup-link {
  color: #007bff;
  text-decoration: none;
}

.forgot-link:hover,
.signup-link:hover {
  text-decoration: underline;
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
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.test-users {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;
}

.test-users h3 {
  margin-top: 0;
  color: #495057;
}

.test-users ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.test-users li {
  margin-bottom: 0.25rem;
}
</style>