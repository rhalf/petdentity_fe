<template>
  <v-layout full-height>
    <v-row dense>
      <v-col align="center" align-self="center">
        <Label title class="text-primary">Forbidden</Label>
        <Button class="mt-4" @click="router.push({ name: 'UserDashboard' })">
          Go back
        </Button>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";

import { useRouter } from "vue-router";
const router = useRouter();
</script>
