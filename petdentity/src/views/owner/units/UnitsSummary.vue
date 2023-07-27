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
            withView
            withAdd
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogUnitOwnerAdd v-model="dialogUnitOwnerAdd" @done="loadItems" />
    <DialogUnitViewFromOwner
      v-model="dialogUnitViewFromOwner"
      v-model:unit="unit"
      read-only
      @done="loadItems"
    />
    <DialogUnitOwnerRemove
      v-model="dialogUnitOwnerRemove"
      v-model:unit="unit"
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

import DialogUnitOwnerAdd from "@/components/dialogs/unit/DialogUnitOwnerAdd.vue";
import DialogUnitViewFromOwner from "@/components/dialogs/unit/DialogUnitViewFromOwner.vue";
import DialogUnitOwnerRemove from "@/components/dialogs/unit/DialogUnitOwnerRemove.vue";

import { search, next, prev } from "@/api/unit";

import { ref, onMounted } from "vue";

const dialogUnitOwnerAdd = ref(false);
const dialogUnitViewFromOwner = ref(false);
const dialogUnitOwnerRemove = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = () => {
  dialogUnitOwnerAdd.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitOwnerRemove.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitViewFromOwner.value = true;
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    units.value = await search(params.value);
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
