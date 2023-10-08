<template>
  <v-btn @click="emit('click')" variant="elevated" color="primary">
    <slot />
  </v-btn>
</template>

<script setup>
const emit = defineEmits(["click"]);
</script>
