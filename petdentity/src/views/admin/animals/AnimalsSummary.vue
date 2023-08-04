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
            @update:modelValue="updateModelHandler"
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
            withAdd
            withView
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogAnimalAdd v-model="dialogAnimalAdd" @done="loadItems" />
    <DialogAnimalView
      v-model="dialogAnimalView"
      v-model:animal="animal"
      @done="loadItems"
    />
    <DialogAnimalRemove
      v-model="dialogAnimalRemove"
      v-model:animal="animal"
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

import DialogAnimalAdd from "@/components/dialogs/animal/DialogAnimalAdd.vue";
import DialogAnimalRemove from "@/components/dialogs/animal/DialogAnimalRemove.vue";
import DialogAnimalView from "@/components/dialogs/animal/DialogAnimalView.vue";

// import { useSnackbarStore } from "@/store/snackbar";
// const { show } = useSnackbarStore();

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
});

const addHandler = async () => {
  dialogAnimalAdd.value = true;
};

const removeHandler = async (item) => {
  animal.value = item;
  dialogAnimalRemove.value = true;
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
    animals.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    animals.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    animals.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const updateModelHandler = () => {
  if (typeof params.value.searchText != "string") return;
  params.value.searchText = params.value.searchText.toUpperCase();
};
</script>
