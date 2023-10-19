<template>
  <v-container v-if="government">
    <Sheet>
      <Label header class="text-primary">{{ government.name }}</Label>
      <Label text>{{ government.description }}</Label>
    </Sheet>
  </v-container>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import { inject } from "vue";

const government = inject("government");
</script>
