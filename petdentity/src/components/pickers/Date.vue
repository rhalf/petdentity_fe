<template>
  <TextField v-bind="properties" />
</template>

<script setup>
import TextField from '@/components/common/TextField.vue'
import { computed } from 'vue'

// const props = defineProps({ modelValue: String })

const properties = {
  type: 'date'
}

// const model = computed({
//   get() {
//     return props.modelValue
//   },
//   set(value) {
//     emit('update:modelValue', value)
//   }
// })
</script>

<style scoped></style>
