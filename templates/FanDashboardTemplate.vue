<template>
  <DashboardLayout :user-email="userInfo.email" @logout="logout">
    <template #title>Fan Dashboard</template>
    
    <StatsGrid>
      <StatCard number-color="#28a745">
        <template #title>Following</template>
        <template #number>42</template>
      </StatCard>
      <StatCard number-color="#28a745">
        <template #title>Favorites</template>
        <template #number>156</template>
      </StatCard>
      <StatCard number-color="#28a745">
        <template #title>Purchases</template>
        <template #number>23</template>
      </StatCard>
      <StatCard number-color="#28a745">
        <template #title>Spent</template>
        <template #number>$234</template>
      </StatCard>
    </StatsGrid>
      
    <ActionGrid>
      <ActionButton>🔍 Discover Content</ActionButton>
      <ActionButton>❤️ View Favorites</ActionButton>
      <ActionButton>👥 Manage Following</ActionButton>
      <ActionButton>🛒 Purchase History</ActionButton>
    </ActionGrid>
      
    <ContentSection>
      <template #title>Recommended Content</template>
      <div class="content-grid">
        <div class="content-card">
          <div class="content-image">🎵</div>
          <h4>Music Album</h4>
          <p>By Artist Name</p>
          <span class="price">$9.99</span>
        </div>
        <div class="content-card">
          <div class="content-image">📚</div>
          <h4>E-book</h4>
          <p>By Author Name</p>
          <span class="price">$14.99</span>
        </div>
        <div class="content-card">
          <div class="content-image">🎬</div>
          <h4>Video Course</h4>
          <p>By Instructor</p>
          <span class="price">$29.99</span>
        </div>
      </div>
    </ContentSection>
      
    <ContentSection>
      <template #title>Recent Activity</template>
      <div class="activity-list">
        <div class="activity-item">
          <span class="activity-icon">❤️</span>
          <span class="activity-text">Liked "Amazing Content" by Creator123</span>
          <span class="activity-time">2 hours ago</span>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🛒</span>
          <span class="activity-text">Purchased "Digital Art Pack"</span>
          <span class="activity-time">1 day ago</span>
        </div>
        <div class="activity-item">
          <span class="activity-icon">👥</span>
          <span class="activity-text">Started following @newcreator</span>
          <span class="activity-time">3 days ago</span>
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
  name: 'FanDashboardTemplate',
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