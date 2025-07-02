<template>
  <button class="action-btn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  emits: ['click']
}
</script>

<style scoped>
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
</style>