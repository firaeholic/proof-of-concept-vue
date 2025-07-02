<template>
  <div class="quick-actions">
    <h2><slot name="title">Quick Actions</slot></h2>
    <div class="action-grid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionGrid'
}
</script>

<style scoped>
.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>