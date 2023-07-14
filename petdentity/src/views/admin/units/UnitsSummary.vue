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
            @add="dialogUnitAdd = true"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogUnitAdd v-model="dialogUnitAdd" @add="loadItems" />
    <DialogUnitUpdate
      v-model="dialogUnitUpdate"
      v-model:unit="unit"
      @update="loadItems"
    />
    <DialogUnitRemove
      v-model="dialogUnitRemove"
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

import DialogUnitAdd from "@/components/dialogs/unit/DialogUnitAdd.vue";
import DialogUnitUpdate from "@/components/dialogs/unit/DialogUnitUpdate.vue";
import DialogUnitRemove from "@/components/dialogs/unit/DialogUnitRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/unit";

import { ref, onMounted } from "vue";

const dialogUnitAdd = ref(false);
const dialogUnitUpdate = ref(false);
const dialogUnitRemove = ref(false);

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

onMounted(async () => {
  loadItems();
});

const updateHandler = (item) => {
  unit.value = item;
  dialogUnitUpdate.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemove.value = true;
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(params.value);

    if (!items.length) return;

    setIndexes(items);

    units.value = items;
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
