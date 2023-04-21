<template>
  <v-btn
    v-model="text"
    :class="classes"
    :disabled="disabled"
    @click="emit('click')"
    :variant="variant"
    :block="block"
    :color="color"
    :prependIcon="prependIcon"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { baseProps, inputProps } from '@/mixins/props'

const props = defineProps({ ...inputProps, ...baseProps })
const emit = defineEmits(['update:modelValue', 'click'])

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
