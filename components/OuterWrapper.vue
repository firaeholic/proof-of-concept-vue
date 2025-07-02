<template>
  <div :class="wrapperClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OuterWrapper',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'centered', 'dashboard'].includes(value)
    }
  },
  computed: {
    wrapperClasses() {
      return {
        'outer-wrapper': true,
        'outer-wrapper--centered': this.variant === 'centered',
        'outer-wrapper--dashboard': this.variant === 'dashboard',
        'container': this.variant === 'default'
      }
    }
  }
}
</script>

<style scoped>
.outer-wrapper {
  font-family: sans-serif;
}

/* Default variant - flex container for sidebar layout */
.container {
  display: flex;
  height: 100vh;
}

/* Centered variant - for forms and centered content */
.outer-wrapper--centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

/* Dashboard variant - for dashboard layouts */
.outer-wrapper--dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>