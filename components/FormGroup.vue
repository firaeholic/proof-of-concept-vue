<template>
  <div class="form-group">
    <label v-if="$slots.label || label" :for="fieldId">
      <slot name="label">{{ label }}</slot>
    </label>
    <slot :field-id="fieldId"></slot>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FormGroup',
  props: {
    label: String,
    fieldId: String
  },
  setup(props) {
    const fieldId = computed(() => props.fieldId || `field-${Math.random().toString(36).substr(2, 9)}`)
    
    return {
      fieldId
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>