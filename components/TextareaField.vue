<template>
  <FormField 
    :modelValue="modelValue" 
    @update:modelValue="$emit('update:modelValue', $event)"
    field-type="textarea"
  >
    <template #default="{ fieldAttrs, value }">
      <textarea
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="fieldAttrs.class"
        :placeholder="fieldAttrs.placeholder"
        :data-basic-field="fieldAttrs['data-basic-field']"
        :data-dashboard="fieldAttrs['data-dashboard']"
        :data-profile="fieldAttrs['data-profile']"
        v-bind="$attrs"
      ></textarea>
    </template>
  </FormField>
</template>

<script>
import FormField from './FormField.vue'

export default {
  name: 'TextareaField',
  components: {
    FormField
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  inheritAttrs: false
}
</script>