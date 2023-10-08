<template>
  <v-container>
    <FormGovernmentView v-model="government" />
  </v-container>
</template>

<script setup>
import FormGovernmentView from "@/components/forms/government/FormGovernmentView.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/government";

import { ref, onMounted } from "vue";

const isLoading = ref(false);
const government = ref({});

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

onMounted(async () => {
  await loadItem();
});
</script>
