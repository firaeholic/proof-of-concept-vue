<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Creator Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userInfo.email }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Content</h3>
          <p class="stat-number">24</p>
        </div>
        <div class="stat-card">
          <h3>Followers</h3>
          <p class="stat-number">1,234</p>
        </div>
        <div class="stat-card">
          <h3>Earnings</h3>
          <p class="stat-number">$2,456</p>
        </div>
        <div class="stat-card">
          <h3>Views</h3>
          <p class="stat-number">45,678</p>
        </div>
      </div>
      
      <div class="kyc-status" v-if="userInfo.kyc === '0'">
        <div class="alert alert-warning">
          <h4>⚠️ KYC Verification Required</h4>
          <p>Complete your KYC verification to unlock all creator features including monetization.</p>
          <button @click="goToKyc" class="btn-primary">Complete KYC</button>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-grid">
          <button class="action-btn">📝 Create Content</button>
          <button class="action-btn">📊 View Analytics</button>
          <button class="action-btn">💰 Earnings Report</button>
          <button class="action-btn">👥 Manage Followers</button>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-time">2 hours ago</span>
            <span class="activity-text">New follower: @user123</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">5 hours ago</span>
            <span class="activity-text">Content published: "My Latest Creation"</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">1 day ago</span>
            <span class="activity-text">Earnings: $45.67 from premium content</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'CreatorDashboardTemplate',
  setup() {
    const router = useRouter()
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
        
        if (decoded['custom:role'] !== 'creator') {
          router.push(`/${decoded['custom:role']}/dashboard`)
        }
      } catch (err) {
        console.error('Invalid token:', err)
        router.push('/login')
      }
    })

    const logout = () => {
      localStorage.removeItem('authToken')
      router.push('/login')
    }
    
    const goToKyc = () => {
      router.push('/creator/kyc')
    }

    return {
      userInfo,
      logout,
      goToKyc
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c82333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin: 0.5rem 0;
}

.kyc-status {
  margin-bottom: 2rem;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-warning {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background: #0056b3;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.activity-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activity-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  color: #6c757d;
  font-size: 0.9rem;
}

.activity-text {
  flex: 1;
  margin-left: 1rem;
}
</style>