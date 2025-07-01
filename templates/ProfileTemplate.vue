<template>
  <div>
    <h2>Profile Page</h2>
    <InputField
      v-model="name"
      @update:modelValue="updateName"
    />
    <TextareaField
      v-model="notes"
      @update:modelValue="updateNotes"
    />
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
import InputField from '../components/InputField.vue'
import TextareaField from '../components/TextareaField.vue'

export default {
  name: 'ProfileTemplate',
  components: { 
    InputField,
    TextareaField
  },
  setup() {
    const sharedState = inject('sharedState')
    const isCached = ref(false)
    
    // Setup async operations (placeholder for future use)
    const setupAsyncOperations = () => {
      console.log('Profile: Setting up async operations', isCached.value ? '(cached)' : '(not cached)')
      // TODO: Add async listeners, timers, or other operations here
      // Example: document.addEventListener('event', handler);
    }
    
    // Cleanup async operations
    const cleanupAsyncOperations = () => {
      console.log('Profile: Cleaning up async operations')
      // TODO: Remove async listeners, timers, etc.
      // Example: document.removeEventListener('event', handler);
    }
    
    // For non-cached components (first mount)
    onMounted(() => {
      console.log('Profile: onMounted called - component first mounted')
      setupAsyncOperations()
    })
    
    onUnmounted(() => {
      console.log('Profile: onUnmounted called - component destroyed')
      cleanupAsyncOperations()
    })
    
    // For keep-alive cached components
    onActivated(() => {
      console.log('Profile: onActivated called - component reactivated from cache')
      isCached.value = true
      setupAsyncOperations()
    })
    
    onDeactivated(() => {
      console.log('Profile: onDeactivated called - component cached')
      cleanupAsyncOperations()
    })
    
    return {
      ...sharedState,
      isCached
    }
  }
}
</script>