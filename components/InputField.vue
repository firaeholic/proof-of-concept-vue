<template>
  <div 
    data-vue-id="outer-wrapper" 
    :class="precomputedAttrs.outerWrapper.class"
    :data-mode="precomputedAttrs.outerWrapper['data-mode']"
    :data-dash-wrap="precomputedAttrs.outerWrapper['data-dash-wrap']"
    :data-profile-wrap="precomputedAttrs.outerWrapper['data-profile-wrap']"
  >
    <div 
      data-vue-id="second-p" 
      :class="precomputedAttrs.secondWrapper.class"
      :data-mode="precomputedAttrs.secondWrapper['data-mode']"
      :data-dash-wrap="precomputedAttrs.secondWrapper['data-dash-wrap']"
      :data-profile-wrap="precomputedAttrs.secondWrapper['data-profile-wrap']"
    >
      <input
        v-model="value"
        :class="precomputedAttrs.field.class"
        :placeholder="precomputedAttrs.field.placeholder"
        :data-basic-field="precomputedAttrs.field['data-basic-field']"
        :data-dashboard="precomputedAttrs.field['data-dashboard']"
        :data-profile="precomputedAttrs.field['data-profile']"
      />
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import { mergeWrapper, mergeField } from '../utils/merge-utils.js'
import { COMPONENT_CONFIG } from '../config/component-config.js'

export default {
  name: 'InputField',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup() {
    const route = inject('$route')
    
    // Precompute merged attributes for all page types
    const precomputedAttrs = computed(() => {
      const pageType = route?.name || 'basic'
      
      return {
        outerWrapper: mergeWrapper('input', 'outer-wrapper', pageType, COMPONENT_CONFIG),
        secondWrapper: mergeWrapper('input', 'second-p', pageType, COMPONENT_CONFIG),
        field: mergeField('input', pageType, COMPONENT_CONFIG)
      }
    })

    return {
      precomputedAttrs
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>