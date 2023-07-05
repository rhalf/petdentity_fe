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
            @add="dialogPetAdd = true"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogPetAdd v-model="dialogPetAdd" @add="loadItems" />
    <DialogPetUpdate
      v-model="dialogPetUpdate"
      v-model:pet="pet"
      @update="loadItems"
    />
    <DialogPetRemove
      v-model="dialogPetRemove"
      v-model:pet="pet"
      @remove="loadItems"
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

import { search, next, prev, remove } from "@/api/pet";

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
  firstItem: "",
  lastItem: "",
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(params.value);

    const firstItemIndex = 0;
    const lastItemIndex = items.length - 1;
    params.value.firstItem = items[firstItemIndex][params.value.columnName];
    params.value.lastItem = items[lastItemIndex][params.value.columnName];

    pets.value = items;
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  loadItems();
});

const removeHandler = async (item) => {
  pet.value = item;
  dialogPetRemove.value = true;
};

const updateHandler = (item) => {
  pet.value = item;
  dialogPetUpdate.value = true;
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    const result = await next(params.value);

    if (result.length === 0) throw new Error("Last page!");

    const firstItemIndex = 0;
    const lastItemIndex = result.length - 1;
    params.value.firstItem = result[firstItemIndex][params.value.columnName];
    params.value.lastItem = result[lastItemIndex][params.value.columnName];

    pets.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    const result = await prev(params.value);

    if (result.length === 0) throw new Error("First page!");

    const firstItemIndex = 0;
    const lastItemIndex = result.length - 1;
    params.value.firstItem = result[firstItemIndex][params.value.columnName];
    params.value.lastItem = result[lastItemIndex][params.value.columnName];

    pets.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
