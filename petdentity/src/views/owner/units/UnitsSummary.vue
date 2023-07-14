<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Units</Label>
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
            :items="units"
            :items-per-page="params.limitNumber"
            hide-default-footer
            withRemove
            withUpdate
            withAdd
            @remove="removeHandler"
            @update="updateHandler"
            @add="dialogUnitOwnerAdd = true"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogUnitOwnerAdd v-model="dialogUnitOwnerAdd" @add="loadItems" />
    <DialogUnitOwnerUpdate
      v-model="dialogUnitOwnerUpdate"
      v-model:unit="unit"
      @update="loadItems"
    />
    <DialogUnitOwnerRemove
      v-model="dialogUnitOwnerRemove"
      v-model:unit="unit"
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

import DialogUnitOwnerAdd from "@/components/dialogs/unit/DialogUnitOwnerAdd.vue";
import DialogUnitOwnerUpdate from "@/components/dialogs/unit/DialogUnitOwnerUpdate.vue";
import DialogUnitOwnerRemove from "@/components/dialogs/unit/DialogUnitOwnerRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/unit-owner";

import { ref, onMounted } from "vue";

const dialogUnitOwnerAdd = ref(false);
const dialogUnitOwnerUpdate = ref(false);
const dialogUnitOwnerRemove = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
  firstItem: "",
  lastItem: "",
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    const items = await search(params.value);

    if (!items.length) return;

    setIndexes(items);

    units.value = items;
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItems();
});

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitOwnerRemove.value = true;
};

const updateHandler = (item) => {
  unit.value = item;
  dialogUnitOwnerUpdate.value = true;
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    const items = await next(params.value);

    if (!items.length) throw new Error("Last page!");

    setIndexes(items);

    units.value = items;
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

    units.value = items;
  } catch ({ message }) {
    console.log("error", message);
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
