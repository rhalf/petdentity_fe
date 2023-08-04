<template>
  <!-- variant="flat" -->
  <v-sheet class="bg-transparent" min-height="50">
    <v-row dense class="py-2">
      <v-col
        align="center"
        justify="center"
        cols="auto"
        v-for="(color, index) in colors"
        :key="index"
      >
        <Card :color="color" :height="35" :width="35" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import Card from "@/components/common/Card.vue";

import { toRefs } from "vue";

const props = defineProps({
  colors: Array,
  disabled: Boolean,
});

const { colors } = toRefs(props);
</script>

<style scoped></style>
