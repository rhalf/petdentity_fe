<template>
  <v-row dense>
    <v-col cols="auto">
      <Label header class="text-primary"> Breeds ({{ totalCount }}) </Label>
    </v-col>
    <v-spacer />
    <v-col cols="12" md="3">
      <TextField
        v-model="params.searchText"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        @keypress.enter="loadItems"
        @update:modelValue="updateModelHandler"
      />
    </v-col>
  </v-row>

  <DataTable
    hover
    :loading="isLoading"
    :headers="headers"
    :items="breeds"
    :items-per-pageNumber="params.limitNumber"
    hide-default-footer
    withRemove
    withUpdate
    withAdd
    @add="addHandler"
    @update="updateHandler"
    @remove="removeHandler"
    @next="nextHandler"
    @prev="prevHandler"
  />

  <DialogBreedAdd
    v-model="dialogBreedAdd"
    v-model:animal="animal"
    @done="loadItems"
  />
  <DialogBreedUpdate
    v-model="dialogBreedUpdate"
    v-model:breed="breed"
    @done="loadItems"
  />
  <DialogBreedRemove
    v-model="dialogBreedRemove"
    v-model:breed="breed"
    @done="loadItems"
  />
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogBreedAdd from "@/components/dialogs/breed/DialogBreedAdd.vue";
import DialogBreedUpdate from "@/components/dialogs/breed/DialogBreedUpdate.vue";
import DialogBreedRemove from "@/components/dialogs/breed/DialogBreedRemove.vue";

import { countByAnimal, search, next, prev } from "@/api/breed";

// import { useSnackbarStore } from "@/store/snackbar";
// const { show } = useSnackbarStore();

import { computed, toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const animal = computed(useModel(propsRef, emit, "modelValue"));

const isLoading = ref(false);
const dialogBreedAdd = ref(false);
const dialogBreedUpdate = ref(false);
const dialogBreedRemove = ref(false);

const breeds = ref();
const breed = ref();
const totalCount = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

onMounted(() => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    breeds.value = await search(animal.value.id, params.value);
    totalCount.value = await countByAnimal(animal.value.id);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    breeds.value = await next(animal.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    breeds.value = await prev(animal.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = async () => {
  dialogBreedAdd.value = true;
};

const updateHandler = async (item) => {
  breed.value = item;
  dialogBreedUpdate.value = true;
};

const removeHandler = async (item) => {
  breed.value = item;
  dialogBreedRemove.value = true;
};

const updateModelHandler = () => {
  if (typeof params.value.searchText != "string") return;
  params.value.searchText = params.value.searchText.toUpperCase();
};
</script>

<style></style>
