<template>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive include="DashboardTemplate,ProfileTemplate">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style scoped>
/* Add any main content specific styles here if needed */
</style>