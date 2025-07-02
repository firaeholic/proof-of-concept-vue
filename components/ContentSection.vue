<template>
  <div class="content-section">
    <h2><slot name="title">Section Title</slot></h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentSection'
}
</script>

<style scoped>
.content-section {
  margin-bottom: 2rem;
}

.content-section h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}
</style>