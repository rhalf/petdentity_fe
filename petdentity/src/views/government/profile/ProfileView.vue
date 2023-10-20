<template>
  <v-container v-if="government">
    <Sheet>
      <Header v-model:government="government" :readOnly="readOnly" />
    </Sheet>

    <v-divider class="my-2"></v-divider>

    <Sheet>
      <Profile v-model:government="government" :readOnly="readOnly" />
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";

import Header from "./components/header/Header.vue";
import Profile from "./components/profile/Profile.vue";

import { inject, ref } from "vue";

const government = inject("government");
const readOnly = ref(false);
</script>

<!-- 900252003008818 -->
