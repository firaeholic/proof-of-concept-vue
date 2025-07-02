<template>
  <!-- I18n Layout for login routes -->
  <div v-if="isI18nRoute" class="i18n-layout">
    <main class="main-content">
      <router-view />
    </main>
  </div>
  
  <!-- Existing layout for legacy routes -->
  <OuterWrapper v-else>
    <TwoColumnLayout>
      <template #left>
        <LeftSidebar />
      </template>
      <template #right>
        <MainContent />
      </template>
    </TwoColumnLayout>
  </OuterWrapper>
</template>

<script>
import { ref, provide, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { prefetchDependencies } from './utils/dependency-loader.js'
import { setPage } from './assets/js/global-events.js'
import OuterWrapper from './components/OuterWrapper.vue'
import TwoColumnLayout from './components/TwoColumnLayout.vue'
import LeftSidebar from './components/LeftSidebar.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: {
    OuterWrapper,
    TwoColumnLayout,
    LeftSidebar,
    MainContent
  },
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
    
    // Provide route and pageType for components to access current page type
    provide('$route', route)
    provide('pageType', pageType)

    function switchPage(page) {
      setPage(page, pageType)
    }

    // Computed property to detect i18n routes
    const isI18nRoute = computed(() => {
      return ['/login', '/en/login', '/am/login'].includes(route.path)
    })

    return {
      pageType,
      switchPage,
      router,
      isI18nRoute
    }
  }
}
</script>

<style scoped>
/* App-specific styles can go here */

/* I18n Layout Styles */
.i18n-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #ecf0f1;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>