<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Fan Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userInfo.email }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Following</h3>
          <p class="stat-number">42</p>
        </div>
        <div class="stat-card">
          <h3>Favorites</h3>
          <p class="stat-number">156</p>
        </div>
        <div class="stat-card">
          <h3>Purchases</h3>
          <p class="stat-number">23</p>
        </div>
        <div class="stat-card">
          <h3>Spent</h3>
          <p class="stat-number">$234</p>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-grid">
          <button class="action-btn">🔍 Discover Content</button>
          <button class="action-btn">❤️ View Favorites</button>
          <button class="action-btn">👥 Manage Following</button>
          <button class="action-btn">🛒 Purchase History</button>
        </div>
      </div>
      
      <div class="recommended-content">
        <h2>Recommended for You</h2>
        <div class="content-grid">
          <div class="content-card">
            <div class="content-image">📸</div>
            <h4>Amazing Photography</h4>
            <p>By @photographer123</p>
            <span class="price">$5.99</span>
          </div>
          <div class="content-card">
            <div class="content-image">🎨</div>
            <h4>Digital Art Collection</h4>
            <p>By @artist456</p>
            <span class="price">$12.99</span>
          </div>
          <div class="content-card">
            <div class="content-image">🎵</div>
            <h4>Exclusive Music Track</h4>
            <p>By @musician789</p>
            <span class="price">$3.99</span>
          </div>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-time">1 hour ago</span>
            <span class="activity-text">Liked "Sunset Photography" by @photographer123</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">3 hours ago</span>
            <span class="activity-text">Purchased "Digital Art Pack" for $12.99</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">1 day ago</span>
            <span class="activity-text">Started following @newartist</span>
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
  name: 'FanDashboardTemplate',
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
          role: decoded['custom:role']
        }
        
        if (decoded['custom:role'] !== 'fan') {
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

    return {
      userInfo,
      logout
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
  color: #28a745;
  margin: 0.5rem 0;
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.content-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}

.content-image {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.price {
  color: #28a745;
  font-weight: bold;
  font-size: 1.1rem;
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