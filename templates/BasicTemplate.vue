<template>
  <div>
    <h2>Basic Page</h2>
    <InputField
        v-model="name"
        @update:modelValue="updateName"
      />
  </div>
</template>

<script>
import { inject } from 'vue'
import InputField from '../components/InputField.vue'

export default {
  name: 'BasicTemplate',
  components: { InputField },
  setup() {
    const sharedState = inject('sharedState')
    return sharedState
  }
}
</script>