<template>
  <v-progress-linear
    v-if="props.visible"
    color="primary"
    :indeterminate="props.indeterminate"
    absolute
  ></v-progress-linear>
</template>

<script setup>
import { onMounted } from 'vue'

import { baseProps } from '@/mixins/props'

const props = defineProps({ ...baseProps, indeterminate: Boolean })

const emit = defineEmits(['click'])

onMounted(() => {
  // console.log(props)
})
</script>
