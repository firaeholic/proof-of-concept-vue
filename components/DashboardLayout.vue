<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1><slot name="title">Dashboard</slot></h1>
      <div class="user-info">
        <span>Welcome, {{ userEmail }}</span>
        <button @click="$emit('logout')" class="logout-btn">Logout</button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
  props: {
    userEmail: {
      type: String,
      required: true
    }
  },
  emits: ['logout']
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
</style>