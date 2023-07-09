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

import { getCurrentUser } from "@/utils/firebase";

import { search, next, prev } from "@/api/owner-unit";

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

    const { uid } = await getCurrentUser();
    const items = await search(uid, params.value);

    const firstIndex = 0;
    const lastIndex = items.length - 1;
    params.value.firstItem = items[firstIndex][params.value.columnName];
    params.value.lastItem = items[lastIndex][params.value.columnName];

    units.value = items;
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  console.log("onMounted");

  loadItems();
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
    const result = await next(params.value);

    if (result.length === 0) throw new Error("Last page!");

    const firstIndex = 0;
    const lastIndex = result.length - 1;
    params.value.firstItem = result[firstIndex][params.value.columnName];
    params.value.lastItem = result[lastIndex][params.value.columnName];

    units.value = result;
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

    const firstIndex = 0;
    const lastIndex = result.length - 1;
    params.value.firstItem = result[firstIndex][params.value.columnName];
    params.value.lastItem = result[lastIndex][params.value.columnName];

    units.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
