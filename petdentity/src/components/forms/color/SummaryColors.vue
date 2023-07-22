<template>
  <v-row dense>
    <v-col cols="auto">
      <Label header class="text-primary"> Colors ({{ totalCount }}) </Label>
    </v-col>
    <v-spacer />
    <v-col cols="12" md="3">
      <TextField
        v-model="params.searchText"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        @keypress.enter="loadItems"
      />
    </v-col>
  </v-row>

  <DataTable
    hover
    :loading="isLoading"
    :headers="headers"
    :items="colors"
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

  <DialogColorAdd
    v-model="dialogColorAdd"
    v-model:animal="animal"
    @done="loadItems"
  />
  <DialogColorUpdate
    v-model="dialogColorUpdate"
    v-model:color="color"
    @done="loadItems"
  />
  <DialogColorRemove
    v-model="dialogColorRemove"
    v-model:color="color"
    @done="loadItems"
  />
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogColorAdd from "@/components/dialogs/color/DialogColorAdd.vue";
import DialogColorUpdate from "@/components/dialogs/color/DialogColorUpdate.vue";
import DialogColorRemove from "@/components/dialogs/color/DialogColorRemove.vue";

import { countByAnimal, search, next, prev } from "@/api/color";

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
const dialogColorAdd = ref(false);
const dialogColorUpdate = ref(false);
const dialogColorRemove = ref(false);

const colors = ref();
const color = ref();
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
    colors.value = await search(animal.value.id, params.value);
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
    colors.value = await next(animal.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    colors.value = await prev(animal.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = async () => {
  dialogColorAdd.value = true;
};

const updateHandler = async (item) => {
  color.value = item;
  dialogColorUpdate.value = true;
};

const removeHandler = async (item) => {
  color.value = item;
  dialogColorRemove.value = true;
};
</script>

<style></style>
