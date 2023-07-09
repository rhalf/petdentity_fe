<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Addresses</Label>
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
            :items="addresses"
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
    <DialogAddressAdd v-model="dialogAddressAdd" @done="loadItems" />
    <DialogAddressUpdate
      v-model="dialogAddressUpdate"
      v-model:address="address"
      @done="loadItems"
    />
    <DialogAddressRemove
      v-model="dialogAddressRemove"
      v-model:address="address"
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

import DialogAddressAdd from "@/components/dialogs/address/DialogAddressAdd.vue";
import DialogAddressUpdate from "@/components/dialogs/address/DialogAddressUpdate.vue";
import DialogAddressRemove from "@/components/dialogs/address/DialogAddressRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev, remove } from "@/api/address";

import { ref, onMounted } from "vue";

const dialogAddressAdd = ref(false);
const dialogAddressUpdate = ref(false);
const dialogAddressRemove = ref(false);

const isLoading = ref(false);
const addresses = ref([]);
const address = ref({});
const params = ref({
  searchText: "",
  columnName: "createdAt",
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

    const firstItemIndex = 0;
    const lastItemIndex = items.length - 1;
    params.value.firstItem = items[firstItemIndex][params.value.columnName];
    params.value.lastItem = items[lastItemIndex][params.value.columnName];

    addresses.value = items;
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  loadItems();
});

const addHandler = async () => {
  dialogAddressAdd.value = true;
};

const updateHandler = (item) => {
  address.value = item;
  dialogAddressUpdate.value = true;
};

const removeHandler = async (item) => {
  address.value = item;
  dialogAddressRemove.value = true;
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

    addresses.value = result;
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

    addresses.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
