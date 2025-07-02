<template>
  <nav class="sidebar">
    <ul>
      <li :class="{ active: pageType === 'basic' }">
        <router-link to="/basic">Basic</router-link>
      </li>
      <li :class="{ active: pageType === 'dash' }">
        <router-link to="/dash">Dashboard</router-link>
      </li>
      <li :class="{ active: pageType === 'profile' }">
        <router-link to="/profile">Profile</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'LeftSidebar',
  setup() {
    const route = inject('$route')
    const pageType = inject('pageType')
    
    return {
      pageType: pageType || 'basic'
    }
  }
}
</script>

<style scoped>
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 0.5em 0;
}

.sidebar li.active a {
  font-weight: bold;
  color: #007acc;
}

.sidebar a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>