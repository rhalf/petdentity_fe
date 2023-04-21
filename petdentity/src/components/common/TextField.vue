<template>
  <v-text-field
    :name="name"
    v-model="text"
    :class="classes"
    :placeholder="placeholder"
    :disabled="disabled"
    :appendIcon="appendIcon"
    :appendInnerIcon="appendInnerIcon"
    :prependIcon="prependIcon"
    :prependInnerIcon="prependInnerIcon"
    :type="type"
    :label="label"
    persistent-placeholder
    hide-details="auto"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { baseProps, inputProps } from '@/mixins/props'

const props = defineProps({ ...inputProps, ...baseProps })
const emit = defineEmits(['update:modelValue'])

const text = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
