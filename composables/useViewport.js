import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Responsive and orientation-aware viewport composable
 * Tracks window dimensions, orientation, and device breakpoints
 */
export function useViewport() {
  // Reactive viewport dimensions
  const width = ref(0)
  const height = ref(0)

  // Orientation computed property
  const orientation = computed(() => {
    return width.value > height.value ? 'landscape' : 'portrait'
  })

  // Breakpoint logic
  const isMobile = computed(() => width.value <= 767)
  const isTablet = computed(() => width.value >= 768 && width.value <= 1028)
  const isDesktop = computed(() => width.value > 1028)

  // Combined view modes
  const isMobilePortrait = computed(() => isMobile.value && orientation.value === 'portrait')
  const isMobileLandscape = computed(() => isMobile.value && orientation.value === 'landscape')
  const isTabletPortrait = computed(() => isTablet.value && orientation.value === 'portrait')
  const isTabletLandscape = computed(() => isTablet.value && orientation.value === 'landscape')

  // Update viewport dimensions
  function updateViewport() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  // Lifecycle hooks
  onMounted(() => {
    updateViewport()
    window.addEventListener('resize', updateViewport)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateViewport)
  })

  // Return all reactive properties and computed values
  return {
    width,
    height,
    orientation,
    isMobile,
    isTablet,
    isDesktop,
    isMobilePortrait,
    isMobileLandscape,
    isTabletPortrait,
    isTabletLandscape,
    updateViewport
  }
}