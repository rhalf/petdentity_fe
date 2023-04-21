<template>
  <div>
    <v-img :src="source" :lazy-src="source" cover :width="width" :aspect-ratio="aspectRatio">
    </v-img>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import vertical from '@/assets/logo/vertical_1.png'
import horizontal from '@/assets/logo/horizontal_1.png'

const props = defineProps({
  width: {
    default: null
  },
  aspectRatio: {
    default: null
  },
  position: {
    type: String
  }
})

const source = computed(() => {
  if (props.position == 'vertical') return vertical
  else return horizontal
})
import { onMounted } from 'vue'

onMounted(() => {})
</script>
