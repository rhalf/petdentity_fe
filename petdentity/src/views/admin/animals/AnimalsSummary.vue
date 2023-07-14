<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Animals</Label>
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
            :items="animals"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withUpdate
            withAdd
            withView
            @remove="removeHandler"
            @update="updateHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogAnimalAdd v-model="dialogAnimalAdd" @add="loadItems" />
    <DialogAnimalView
      v-model="dialogAnimalView"
      v-model:animal="animal"
      @view="loadItems"
    />
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

import DialogAnimalAdd from "@/components/dialogs/animal/DialogAnimalAdd.vue";
import DialogAnimalUpdate from "@/components/dialogs/animal/DialogAnimalUpdate.vue";
import DialogAnimalRemove from "@/components/dialogs/animal/DialogAnimalRemove.vue";
import DialogAnimalView from "@/components/dialogs/animal/DialogAnimalView.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/animal";

import { ref, onMounted } from "vue";

const dialogAnimalAdd = ref(false);
const dialogAnimalUpdate = ref(false);
const dialogAnimalRemove = ref(false);
const dialogAnimalView = ref(false);

const isLoading = ref(false);
const animals = ref();
const animal = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
  firstItem: "",
  lastItem: "",
});

const addHandler = async () => {
  dialogAnimalAdd.value = true;
};

const removeHandler = async (item) => {
  animal.value = item;
  dialogAnimalRemove.value = true;
};

const updateHandler = (item) => {
  animal.value = item;
  dialogAnimalUpdate.value = true;
};

const viewHandler = (item) => {
  animal.value = item;
  dialogAnimalView.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(params.value);

    if (!items.length) return;

    setIndexes(items);

    animals.value = items;
  } catch ({ message }) {
    console.log("error", message);
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

    animals.value = items;
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

    animals.value = items;
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
