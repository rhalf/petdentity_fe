<template>
  <v-btn
    :id="id"
    :class="classes"
    :disabled="disabled"
    @click="emit('click')"
    :variant="variant"
    :block="block"
    :color="color"
    :icon="icon"
    :type="type"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { baseProps } from '@/mixins/props'

const props = defineProps({ ...baseProps, id: { default: undefined } })
const emit = defineEmits(['update:modelValue', 'click'])

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
