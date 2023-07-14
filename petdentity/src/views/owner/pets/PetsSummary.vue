<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Pets</Label>
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

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="pets"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withUpdate
            withAdd
            @remove="removeHandler"
            @update="updateHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogPetAdd v-model="dialogPetAdd" @done="loadItems" />
    <DialogPetUpdate
      v-model="dialogPetUpdate"
      v-model:pet="pet"
      @done="loadItems"
    />
    <DialogPetRemove
      v-model="dialogPetRemove"
      v-model:pet="pet"
      @done="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogPetAdd from "@/components/dialogs/pet/DialogPetAdd.vue";
import DialogPetUpdate from "@/components/dialogs/pet/DialogPetUpdate.vue";
import DialogPetRemove from "@/components/dialogs/pet/DialogPetRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/pet";

import { ref, onMounted } from "vue";

const dialogPetAdd = ref(false);
const dialogPetUpdate = ref(false);
const dialogPetRemove = ref(false);

const isLoading = ref(false);
const pets = ref();
const pet = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
  firstItem: null,
  lastItem: null,
});

const addHandler = () => {
  dialogPetAdd.value = true;
};

const updateHandler = (item) => {
  pet.value = item;
  dialogPetUpdate.value = true;
};

const removeHandler = async (item) => {
  pet.value = item;
  dialogPetRemove.value = true;
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(params.value);

    if (!items.length) return;

    setIndexes(items);

    pets.value = items;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    const items = await next(params.value);

    if (!items.length) throw new Error("Last page!");

    setIndexes(items);

    pets.value = items;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    const items = await prev(params.value);

    if (!items.length) throw new Error("First page!");

    setIndexes(items);

    pets.value = items;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const setIndexes = (items) => {
  const firstItem = 0;
  const lastItem = items.length - 1;
  params.value.firstItem = items[firstItem][params.value.columnName];
  params.value.lastItem = items[lastItem][params.value.columnName];
};
</script>
