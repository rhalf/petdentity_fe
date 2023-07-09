<template>
  <v-virtual-scroll>
    <template v-slot:default="{ item, index }">
      <slot name="default" :item="item" :index="index" />
    </template>
  </v-virtual-scroll>
</template>

<script setup></script>
