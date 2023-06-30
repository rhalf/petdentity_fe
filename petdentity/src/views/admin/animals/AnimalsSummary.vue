<template>
  <v-container>
    <Sheet class="mt-5">
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Animals</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="pagination.searchText"
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
            :items="animals"
            :items-per-page="pagination.limit"
            hide-default-footer
            withRemove
            withUpdate
            @remove="removeHandler"
            @update="updateHandler"
            @add="dialogAnimalAdd = true"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogAnimalAdd v-model="dialogAnimalAdd" @add="loadItems" />
    <DialogAnimalUpdate
      v-model="dialogAnimalUpdate"
      v-model:animal="animal"
      @update="loadItems"
    />
    <DialogAnimalRemove
      v-model="dialogAnimalRemove"
      v-model:animal="animal"
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

import DialogAnimalAdd from "@/components/dialog/animal/DialogAnimalAdd.vue";
import DialogAnimalUpdate from "@/components/dialog/animal/DialogAnimalUpdate.vue";
import DialogAnimalRemove from "@/components/dialog/animal/DialogAnimalRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev, remove } from "@/api/animal";

import { ref, onMounted } from "vue";

const dialogAnimalAdd = ref(false);
const dialogAnimalUpdate = ref(false);
const dialogAnimalRemove = ref(false);

const isLoading = ref(false);
const animals = ref();
const animal = ref();
const pagination = ref({
  searchText: "",
  column: "name",
  direction: "asc",
  limit: 5,
  first: "",
  last: "",
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(
      pagination.value?.searchText,
      pagination.value?.column,
      pagination.value?.direction,
      pagination.value?.limit
    );

    const firstIndex = 0;
    const lastIndex = items.length - 1;
    pagination.value.first = items[firstIndex][pagination.value.column];
    pagination.value.last = items[lastIndex][pagination.value.column];

    animals.value = items;
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
  animal.value = item;
  dialogAnimalRemove.value = true;
};

const updateHandler = (item) => {
  animal.value = item;
  dialogAnimalUpdate.value = true;
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    const result = await next(
      pagination.value?.last,
      pagination.value?.column,
      pagination.value?.direction,
      pagination.value?.limit
    );

    if (result.length === 0) throw new Error("Last page!");

    const firstIndex = 0;
    const lastIndex = result.length - 1;
    pagination.value.first = result[firstIndex][pagination.value.column];
    pagination.value.last = result[lastIndex][pagination.value.column];

    animals.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    const result = await prev(
      pagination.value?.first,
      pagination.value?.column,
      pagination.value?.direction,
      pagination.value?.limit
    );

    if (result.length === 0) throw new Error("Last page!");

    const firstIndex = 0;
    const lastIndex = result.length - 1;
    pagination.value.first = result[firstIndex][pagination.value.column];
    pagination.value.last = result[lastIndex][pagination.value.column];

    animals.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
