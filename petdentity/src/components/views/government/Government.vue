<template>
  <div v-if="government">
    <v-row dense class="mt-2">
      <v-col cols="12" class="text-center">
        <Header v-model:government="government" :readOnly="readOnly" />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" class="text-center">
        <Profile v-model:government="government" :readOnly="readOnly" />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" class="text-center">
        <Users v-model:government="government" :readOnly="readOnly" />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" class="text-center">
        <Units v-model:government="government" :readOnly="readOnly" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Profile from "./components/profile/Profile.vue";
import Users from "./components/users/Users.vue";
// import Contacts from "./components/contacts/Summary.vue";
// import Vaccines from "./components/vaccines/Summary.vue";
import Units from "./components/units/Summary.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/government";

import { computed, onMounted, ref } from "vue";

const isLoading = ref(false);
const government = ref(null);

const readOnly = computed(() => {
  return route.meta.mode === "VIEW" || false;
});

onMounted(() => {
  loadItem();
});

const loadItem = async () => {
  try {
    isLoading.value = true;
    government.value = await get(route.params.id);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
