<template>
  <teleport to="body">
    <v-snackbar
      :color="color"
      location="top right"
      v-model="visible"
      :timeout="timeout"
    >
      {{ message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </teleport>
</template>

<script setup>
import { onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useSnackbarStore } from "@/store/snackbar";
const { visible, color, message, timeout } = storeToRefs(useSnackbarStore());

onMounted(() => {
  // console.log(visible)
});
</script>

<style scoped></style>
