<template>
  <teleport to="#progress-line">
    <v-progress-linear
      :visible="status"
      :indeterminate="status"
      color="primary"
      height="3"
    />
  </teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProgressLineStore } from "@/store/progress-line";
const { status } = storeToRefs(useProgressLineStore());
</script>
