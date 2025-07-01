<template>
  <div>
    <h2>Dashboard Page</h2>
    <TextareaField
      v-model="notes"
      @update:modelValue="updateNotes"
    />
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
import TextareaField from '../components/TextareaField.vue'

export default {
  name: 'DashboardTemplate',
  components: { TextareaField },
  setup() {
    const sharedState = inject('sharedState')
    const isCached = ref(false)
    
    // Setup async operations (placeholder for future use)
    const setupAsyncOperations = () => {
      console.log('Dashboard: Setting up async operations', isCached.value ? '(cached)' : '(not cached)')
      // TODO: Add async listeners, timers, or other operations here
      // Example: window.addEventListener('scroll', handler);
    }
    
    // Cleanup async operations
    const cleanupAsyncOperations = () => {
      console.log('Dashboard: Cleaning up async operations')
      // TODO: Remove async listeners, timers, etc.
      // Example: window.removeEventListener('scroll', handler);
    }
    
    // For non-cached components (first mount)
    onMounted(() => {
      console.log('Dashboard: onMounted called - component first mounted')
      setupAsyncOperations()
    })
    
    onUnmounted(() => {
      console.log('Dashboard: onUnmounted called - component destroyed')
      cleanupAsyncOperations()
    })
    
    // For keep-alive cached components
    onActivated(() => {
      console.log('Dashboard: onActivated called - component reactivated from cache')
      isCached.value = true
      setupAsyncOperations()
    })
    
    onDeactivated(() => {
      console.log('Dashboard: onDeactivated called - component cached')
      cleanupAsyncOperations()
    })
    
    return {
      ...sharedState,
      isCached
    }
  }
}
</script>