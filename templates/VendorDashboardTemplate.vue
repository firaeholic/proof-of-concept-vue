<template>
  <DashboardLayout :user-email="userInfo.email" @logout="logout">
    <template #title>Vendor Dashboard</template>
    
    <StatsGrid>
      <StatCard number-color="#6f42c1">
        <template #title>Products</template>
        <template #number>87</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>Orders</template>
        <template #number>342</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>Revenue</template>
        <template #number>$12,456</template>
      </StatCard>
      <StatCard number-color="#6f42c1">
        <template #title>Customers</template>
        <template #number>234</template>
      </StatCard>
    </StatsGrid>
      
    <ActionGrid>
      <ActionButton>📦 Add Product</ActionButton>
      <ActionButton>📊 Sales Analytics</ActionButton>
      <ActionButton>🛒 Manage Orders</ActionButton>
      <ActionButton>👥 Customer Support</ActionButton>
    </ActionGrid>
      
      <ContentSection>
        <template #title>Recent Orders</template>
        <div class="orders-table">
          <div class="order-header">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div class="order-row">
            <span>#12345</span>
            <span>john@example.com</span>
            <span>$45.99</span>
            <span class="status-shipped">Shipped</span>
          </div>
          <div class="order-row">
            <span>#12346</span>
            <span>jane@example.com</span>
            <span>$23.50</span>
            <span class="status-pending">Pending</span>
          </div>
          <div class="order-row">
            <span>#12347</span>
            <span>bob@example.com</span>
            <span>$67.25</span>
            <span class="status-delivered">Delivered</span>
          </div>
        </div>
      </ContentSection>
      
      <ContentSection>
        <template #title>Top Selling Products</template>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">📱</div>
            <h4>Smartphone Case</h4>
            <p>45 sold this month</p>
            <span class="price">$19.99</span>
          </div>
          <div class="product-card">
            <div class="product-image">🎧</div>
            <h4>Wireless Headphones</h4>
            <p>32 sold this month</p>
            <span class="price">$89.99</span>
          </div>
          <div class="product-card">
            <div class="product-image">⌚</div>
            <h4>Smart Watch</h4>
            <p>28 sold this month</p>
            <span class="price">$199.99</span>
          </div>
        </div>
      </ContentSection>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../components/DashboardLayout.vue'
import StatsGrid from '../components/StatsGrid.vue'
import StatCard from '../components/StatCard.vue'
import ActionGrid from '../components/ActionGrid.vue'
import ActionButton from '../components/ActionButton.vue'
import ContentSection from '../components/ContentSection.vue'
import { useViewport } from '../composables/useViewport.js'
import { useDashboard } from '../composables/useDashboard.js'

export default {
  name: 'VendorDashboardTemplate',
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
    
    // Use viewport composable for responsive design
    const {
      width,
      height,
      orientation,
      isMobile,
      isTablet,
      isDesktop,
      isMobilePortrait,
      isMobileLandscape,
      isTabletPortrait,
      isTabletLandscape
    } = useViewport()

    return {
      userInfo,
      logout,
      width,
      height,
      orientation,
      isMobile,
      isTablet,
      isDesktop,
      isMobilePortrait,
      isMobileLandscape,
      isTabletPortrait,
      isTabletLandscape
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
  color: #6f42c1;
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

.orders-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.order-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
}

.order-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.order-row:last-child {
  border-bottom: none;
}

.status-shipped {
  color: #007bff;
  font-weight: bold;
}

.status-pending {
  color: #ffc107;
  font-weight: bold;
}

.status-delivered {
  color: #28a745;
  font-weight: bold;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}

.product-image {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.price {
  color: #6f42c1;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>