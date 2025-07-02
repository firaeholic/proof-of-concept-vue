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
      <slot :field-attrs="precomputedAttrs.field" :value="value" @input="handleInput"></slot>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import { mergeWrapper, mergeField } from '../utils/merge-utils.js'
import { COMPONENT_CONFIG } from '../config/component-config.js'

export default {
  name: 'FormField',
  props: {
    modelValue: [String, Number],
    fieldType: {
      type: String,
      default: 'input'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const route = inject('$route')
    
    // Precompute merged attributes for all page types
    const precomputedAttrs = computed(() => {
      const pageType = route?.name || 'basic'
      
      return {
        outerWrapper: mergeWrapper(props.fieldType, 'outer-wrapper', pageType, COMPONENT_CONFIG),
        secondWrapper: mergeWrapper(props.fieldType, 'second-p', pageType, COMPONENT_CONFIG),
        field: mergeField(props.fieldType, pageType, COMPONENT_CONFIG)
      }
    })

    const handleInput = (event) => {
      emit('update:modelValue', event.target.value)
    }

    return {
      precomputedAttrs,
      handleInput
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