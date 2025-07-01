<template>
  <div class="container">
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
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive include="DashboardTemplate,ProfileTemplate">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script>
import { ref, provide, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { prefetchDependencies } from './utils/dependency-loader.js'
import { setPage } from './assets/js/global-events.js'

export default {
  name: 'App',
  setup() {
    const name = ref('')
    const notes = ref('')
    const route = useRoute()
    const router = useRouter()
    const pageType = ref('basic')

    onMounted(() => {
      setTimeout(() => {
        // Use batch prefetch with document fragment for better performance
        prefetchDependencies([
          { type: 'js', url: './templates/DashboardTemplate.js' },
          { type: 'js', url: './templates/ProfileTemplate.js' }
        ])
      }, 100)
    })

    watch(() => route.name, (newPage) => {
      switchPage(newPage)
    })

    // Optimized update handlers to avoid inline arrow functions
    const updateName = (v) => name.value = v

    const updateNotes = (v) => notes.value = v

    // Provide shared state and route to child components
    provide('sharedState', {
      name,
      notes,
      updateName,
      updateNotes
    })
    
    // Provide route for components to access current page type
    provide('$route', route)

    function switchPage(page) {
      setPage(page, pageType)
    }

    return {
      pageType,
      switchPage,
      router
    }
  }
}
</script>