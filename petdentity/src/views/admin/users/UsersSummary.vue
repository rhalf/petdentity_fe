<template>
  <v-container>
    <Sheet class="mt-5">
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Units</Label>
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
            :items="units"
            :items-per-page="pagination.limit"
            hide-default-footer
            withRemove
            withUpdate
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

import DialogUnitAdd from "@/components/dialog/unit/DialogUnitAdd.vue";
import DialogUnitUpdate from "@/components/dialog/unit/DialogUnitUpdate.vue";
import DialogUnitRemove from "@/components/dialog/unit/DialogUnitRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/user";

import { ref, onMounted } from "vue";

const dialogUnitAdd = ref(false);
const dialogUnitUpdate = ref(false);
const dialogUnitRemove = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const pagination = ref({
  searchText: "",
  column: "uid",
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

    units.value = items;
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
  unit.value = item;
  dialogUnitRemove.value = true;
};

const updateHandler = (item) => {
  unit.value = item;
  dialogUnitUpdate.value = true;
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

    units.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
