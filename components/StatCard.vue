<template>
  <div class="stat-card">
    <h3><slot name="title">Stat</slot></h3>
    <p class="stat-number" :style="{ color: numberColor }">
      <slot name="number">0</slot>
    </p>
    <slot name="description"></slot>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    numberColor: {
      type: String,
      default: '#007bff'
    }
  }
}
</script>

<style scoped>
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
  margin: 0.5rem 0;
}
</style>