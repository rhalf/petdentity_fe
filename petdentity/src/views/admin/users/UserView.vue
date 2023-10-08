<template>
  <v-container>
    <FormUserView v-model="user" />
  </v-container>
</template>

<script setup>
import FormUserView from "@/components/forms/user/FormUserView.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/user";

import { ref, onMounted } from "vue";

const isLoading = ref(false);
const user = ref();

const loadItem = async () => {
  try {
    isLoading.value = true;
    user.value = await get(route.params.id);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItem();
});
</script>
