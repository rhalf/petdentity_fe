<template>
  <v-infinite-scroll>
    <template v-slot:default="item">
      <slot name="default" :item="item" />
    </template>
  </v-infinite-scroll>
</template>

<script setup>
import { VInfiniteScroll } from "vuetify/labs/VInfiniteScroll";
</script>
