<template>
  <DashboardLayout :user-email="userInfo.email" @logout="logout">
    <template #title>Creator Dashboard</template>
    
    <StatsGrid>
      <StatCard number-color="#007bff">
        <template #title>Total Content</template>
        <template #number>24</template>
      </StatCard>
      <StatCard number-color="#007bff">
        <template #title>Followers</template>
        <template #number>1,234</template>
      </StatCard>
      <StatCard number-color="#007bff">
        <template #title>Earnings</template>
        <template #number>$2,456</template>
      </StatCard>
      <StatCard number-color="#007bff">
        <template #title>Views</template>
        <template #number>45,678</template>
      </StatCard>
    </StatsGrid>
      
      <div class="kyc-status" v-if="userInfo.kyc === '0'">
        <div class="alert alert-warning">
          <h4>⚠️ KYC Verification Required</h4>
          <p>Complete your KYC verification to unlock all creator features including monetization.</p>
          <button @click="goToKyc" class="btn-primary">Complete KYC</button>
        </div>
      </div>
      
      <ActionGrid>
        <ActionButton>📝 Create Content</ActionButton>
        <ActionButton>📊 View Analytics</ActionButton>
        <ActionButton>💰 Earnings Report</ActionButton>
        <ActionButton>👥 Manage Followers</ActionButton>
      </ActionGrid>
      
      <ContentSection>
        <template #title>Recent Activity</template>
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
      </ContentSection>
  </DashboardLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import DashboardLayout from '../components/DashboardLayout.vue'
import StatsGrid from '../components/StatsGrid.vue'
import StatCard from '../components/StatCard.vue'
import ActionGrid from '../components/ActionGrid.vue'
import ActionButton from '../components/ActionButton.vue'
import ContentSection from '../components/ContentSection.vue'

export default {
  name: 'CreatorDashboardTemplate',
  components: {
    DashboardLayout,
    StatsGrid,
    StatCard,
    ActionGrid,
    ActionButton,
    ContentSection
  },
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