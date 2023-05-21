<template>
  <v-img v-model="text" v-bind="properties" />
</template>

<script setup>
const properties = {
  width: 150,
  aspectRatio: 1
}
</script>
