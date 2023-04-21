<template>
  <span :class="classes" @click="emit('click')" :variant="variant" :block="block" :color="color">
    <slot></slot>
  </span>
</template>

<script setup>
import { onMounted } from 'vue'

import { baseProps } from '@/mixins/props'

defineProps({ ...baseProps })

const emit = defineEmits(['click'])

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
