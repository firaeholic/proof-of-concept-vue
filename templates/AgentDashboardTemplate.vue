<template>
  <DashboardLayout :user-email="userInfo.email" @logout="logout">
    <template #title>Agent Dashboard</template>
    
    <StatsGrid>
      <StatCard number-color="#6f42c1">
        <template #title>Active Clients</template>
        <template #number>15</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>Deals Closed</template>
        <template #number>8</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>Commission</template>
        <template #number>$5,234</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>This Month</template>
        <template #number>$1,890</template>
      </StatCard>
    </StatsGrid>
      
    <ActionGrid>
      <ActionButton>👥 Manage Clients</ActionButton>
      <ActionButton>📞 Schedule Call</ActionButton>
      <ActionButton>📊 View Reports</ActionButton>
      <ActionButton>💼 New Lead</ActionButton>
    </ActionGrid>
      
    <ContentSection>
      <template #title>Active Deals</template>
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
    </ContentSection>
      
    <ContentSection>
      <template #title>Recent Activities</template>
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
    </ContentSection>
      
    <ContentSection>
      <template #title>Performance Metrics</template>
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
    </ContentSection>
  </DashboardLayout>
</template>

<script>
import { useDashboard } from '../composables/useDashboard.js'
import DashboardLayout from '../components/DashboardLayout.vue'
import StatsGrid from '../components/StatsGrid.vue'
import StatCard from '../components/StatCard.vue'
import ActionGrid from '../components/ActionGrid.vue'
import ActionButton from '../components/ActionButton.vue'
import ContentSection from '../components/ContentSection.vue'

export default {
  name: 'AgentDashboardTemplate',
  components: {
    DashboardLayout,
    StatsGrid,
    StatCard,
    ActionGrid,
    ActionButton,
    ContentSection
  },
  setup() {
    // Use shared dashboard composable
    const { userInfo, logout } = useDashboard()

    return {
      userInfo,
      logout
    }
  }
}
</script>

<style scoped>
/* Agent-specific styles */

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