<template>
  <v-row dense class="mt-2">
    <v-col cols="12" class="text-center">
      <Header v-model:pet="pet" :readOnly="readOnly" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" class="text-center">
      <Profile v-model:pet="pet" :readOnly="readOnly" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" class="text-center">
      <Contacts v-model:pet="pet" :readOnly="readOnly" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" class="text-center">
      <Vaccines v-model:pet="pet" :readOnly="readOnly" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" class="text-center">
      <Units v-model:pet="pet" :readOnly="readOnly" />
    </v-col>
  </v-row>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Profile from "./components/profile/Profile.vue";
import Contacts from "./components/contacts/Summary.vue";
import Vaccines from "./components/vaccines/Summary.vue";
import Units from "./components/units/Summary.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/pet";

import { computed, onMounted, ref } from "vue";

const isLoading = ref(false);
const pet = ref();

const readOnly = computed(() => {
  return route.meta.mode === "VIEW" || false;
});

onMounted(() => {
  loadItem();
});

const loadItem = async () => {
  try {
    isLoading.value = true;
    pet.value = await get(route.params.id);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
