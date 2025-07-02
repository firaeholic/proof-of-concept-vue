<template>
  <div :class="layoutClasses">
    <div v-if="$slots.left" class="column column--left">
      <slot name="left"></slot>
    </div>
    <div class="column column--right">
      <slot name="right">
        <slot></slot> <!-- fallback for single column -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoColumnLayout',
  props: {
    variant: {
      type: String,
      default: 'sidebar',
      validator: (value) => ['sidebar', 'dashboard', 'equal'].includes(value)
    }
  },
  computed: {
    layoutClasses() {
      return {
        'two-column-layout': true,
        [`two-column-layout--${this.variant}`]: true
      }
    }
  }
}
</script>

<style scoped>
.two-column-layout {
  display: flex;
  height: 100%;
  width: 100%;
}

/* Sidebar variant - fixed left sidebar, flexible right content */
.two-column-layout--sidebar {
  height: 100vh;
}

.two-column-layout--sidebar .column--left {
  width: 200px;
  background: #f5f5f5;
  padding: 1em;
  box-sizing: border-box;
}

.two-column-layout--sidebar .column--right {
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Dashboard variant - single column that can expand */
.two-column-layout--dashboard {
  flex-direction: column;
}

.two-column-layout--dashboard .column--right {
  flex: 1;
}

/* Equal variant - two equal columns */
.two-column-layout--equal .column--left,
.two-column-layout--equal .column--right {
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
}

/* Common column styles */
.column {
  display: flex;
  flex-direction: column;
}
</style>