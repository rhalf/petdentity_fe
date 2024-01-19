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
            placeholder="Name"
            uppercase
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
            :items-per-page="coats.length"
            hide-default-footer
            withRemove
            withUpdate
            withAdd
            withMore
            @refresh="loadItems"
            @remove="removeHandler"
            @update="updateHandler"
            @add="dialogCoatAdd = true"
            @more="moreHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogCoatAdd v-model="dialogCoatAdd" @added="loadItems" />
    <DialogCoatUpdate
      v-model="dialogCoatUpdate"
      v-model:coat="coat"
      @updated="loadItems"
    />
    <DialogCoatRemove
      v-model="dialogCoatRemove"
      v-model:coat="coat"
      @removed="loadItems"
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

import { search, more } from "@/api/coat";

import { ref, onMounted } from "vue";

const dialogCoatAdd = ref(false);
const dialogCoatUpdate = ref(false);
const dialogCoatRemove = ref(false);

const isLoading = ref(false);
const coats = ref([]);
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

const moreHandler = async () => {
  try {
    isLoading.value = true;
    const result = await more(params.value);
    coats.value = [...coats.value, ...result];
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
