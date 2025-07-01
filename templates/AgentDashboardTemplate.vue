<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Agent Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userInfo.email }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Active Clients</h3>
          <p class="stat-number">15</p>
        </div>
        <div class="stat-card">
          <h3>Deals Closed</h3>
          <p class="stat-number">8</p>
        </div>
        <div class="stat-card">
          <h3>Commission</h3>
          <p class="stat-number">$5,234</p>
        </div>
        <div class="stat-card">
          <h3>This Month</h3>
          <p class="stat-number">$1,890</p>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-grid">
          <button class="action-btn">👥 Manage Clients</button>
          <button class="action-btn">📞 Schedule Call</button>
          <button class="action-btn">📊 View Reports</button>
          <button class="action-btn">💼 New Lead</button>
        </div>
      </div>
      
      <div class="active-deals">
        <h2>Active Deals</h2>
        <div class="deals-table">
          <div class="deal-header">
            <span>Client</span>
            <span>Deal Value</span>
            <span>Stage</span>
            <span>Close Date</span>
          </div>
          <div class="deal-row">
            <span>TechCorp Inc.</span>
            <span>$25,000</span>
            <span class="stage-negotiation">Negotiation</span>
            <span>2024-02-15</span>
          </div>
          <div class="deal-row">
            <span>StartupXYZ</span>
            <span>$12,500</span>
            <span class="stage-proposal">Proposal</span>
            <span>2024-02-20</span>
          </div>
          <div class="deal-row">
            <span>BigBusiness LLC</span>
            <span>$45,000</span>
            <span class="stage-closing">Closing</span>
            <span>2024-02-10</span>
          </div>
        </div>
      </div>
      
      <div class="recent-activities">
        <h2>Recent Activities</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-time">30 min ago</span>
            <span class="activity-text">📞 Called TechCorp Inc. - Follow up scheduled</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">2 hours ago</span>
            <span class="activity-text">📧 Sent proposal to StartupXYZ</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">4 hours ago</span>
            <span class="activity-text">🤝 Meeting with BigBusiness LLC completed</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">1 day ago</span>
            <span class="activity-text">💰 Deal closed with RetailChain - $15,000</span>
          </div>
        </div>
      </div>
      
      <div class="performance-metrics">
        <h2>Performance Metrics</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <h4>Conversion Rate</h4>
            <p class="metric-value">32%</p>
            <p class="metric-change positive">+5% from last month</p>
          </div>
          <div class="metric-card">
            <h4>Avg Deal Size</h4>
            <p class="metric-value">$18,750</p>
            <p class="metric-change positive">+12% from last month</p>
          </div>
          <div class="metric-card">
            <h4>Sales Cycle</h4>
            <p class="metric-value">45 days</p>
            <p class="metric-change negative">+3 days from last month</p>
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
  name: 'AgentDashboardTemplate',
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
        
        if (decoded['custom:role'] !== 'agent') {
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
  color: #fd7e14;
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

.deals-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.deal-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
}

.deal-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.deal-row:last-child {
  border-bottom: none;
}

.stage-negotiation {
  color: #ffc107;
  font-weight: bold;
}

.stage-proposal {
  color: #007bff;
  font-weight: bold;
}

.stage-closing {
  color: #28a745;
  font-weight: bold;
}

.activity-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
  min-width: 100px;
}

.activity-text {
  flex: 1;
  margin-left: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fd7e14;
  margin: 0.5rem 0;
}

.metric-change {
  font-size: 0.9rem;
  margin: 0;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}
</style>