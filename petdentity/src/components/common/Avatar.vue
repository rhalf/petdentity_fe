<template>
  <v-btn variant="plain" @click="emit('click')">
    <v-avatar :class="classes" :variant="variant" :image="preferred" :color="color" />
  </v-btn>
</template>

<script setup>
import { onMounted, computed } from 'vue'

import { baseProps } from '@/mixins/props'

const props = defineProps({ ...baseProps, image: String })

const emit = defineEmits(['click'])

onMounted(() => {
  // console.log(props)
})

import AccountEmpty from '@/assets/images/accounts/account-empty.png'
const preferred = computed(() => {
  if (!props.image) return AccountEmpty
})
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
