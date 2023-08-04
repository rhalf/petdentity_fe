<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Coats</Label>
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
            :items="coats"
            :items-per-page="params.limitNumber"
            hide-default-footer
            withRemove
            withUpdate
            withAdd
            @remove="removeHandler"
            @update="updateHandler"
            @add="dialogCoatAdd = true"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogCoatAdd v-model="dialogCoatAdd" @done="loadItems" />
    <DialogCoatUpdate
      v-model="dialogCoatUpdate"
      v-model:coat="coat"
      @done="loadItems"
    />
    <DialogCoatRemove
      v-model="dialogCoatRemove"
      v-model:coat="coat"
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

import DialogCoatAdd from "@/components/dialogs/coat/DialogCoatAdd.vue";
import DialogCoatUpdate from "@/components/dialogs/coat/DialogCoatUpdate.vue";
import DialogCoatRemove from "@/components/dialogs/coat/DialogCoatRemove.vue";

// import { useSnackbarStore } from "@/store/snackbar";
// const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/coat";

import { ref, onMounted } from "vue";

const dialogCoatAdd = ref(false);
const dialogCoatUpdate = ref(false);
const dialogCoatRemove = ref(false);

const isLoading = ref(false);
const coats = ref();
const coat = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

onMounted(async () => {
  loadItems();
});

const updateHandler = (item) => {
  coat.value = item;
  dialogCoatUpdate.value = true;
};

const removeHandler = async (item) => {
  coat.value = item;
  dialogCoatRemove.value = true;
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    coats.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    coats.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    coats.value = await prev(params.value);
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
