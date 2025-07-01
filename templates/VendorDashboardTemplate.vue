<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Vendor Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userInfo.email }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Products</h3>
          <p class="stat-number">87</p>
        </div>
        <div class="stat-card">
          <h3>Orders</h3>
          <p class="stat-number">342</p>
        </div>
        <div class="stat-card">
          <h3>Revenue</h3>
          <p class="stat-number">$12,456</p>
        </div>
        <div class="stat-card">
          <h3>Customers</h3>
          <p class="stat-number">234</p>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-grid">
          <button class="action-btn">📦 Add Product</button>
          <button class="action-btn">📊 Sales Analytics</button>
          <button class="action-btn">🛒 Manage Orders</button>
          <button class="action-btn">👥 Customer Support</button>
        </div>
      </div>
      
      <div class="recent-orders">
        <h2>Recent Orders</h2>
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
      </div>
      
      <div class="top-products">
        <h2>Top Selling Products</h2>
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'VendorDashboardTemplate',
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
        
        if (decoded['custom:role'] !== 'vendor') {
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