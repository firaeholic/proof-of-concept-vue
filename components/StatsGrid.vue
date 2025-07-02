<template>
  <div class="stats-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StatsGrid'
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>