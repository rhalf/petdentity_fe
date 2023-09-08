<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Governments</Label>
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
            :items="governments"
            :items-per-page="params.limit"
            hide-default-footer
            withView
            withRemove
            withAdd
            @remove="removeHandler"
            @add="addHandler"
            @view="viewHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <DialogGovernmentAdd v-model="dialogGovernmentAdd" @remove="loadItems" />

    <DialogGovernmentRemove
      v-model="dialogGovernmentRemove"
      v-model:government="government"
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

import DialogGovernmentRemove from "@/components/dialogs/government/DialogGovernmentRemove.vue";
import DialogGovernmentAdd from "@/components/dialogs/government/DialogGovernmentAdd.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import { search, next, prev } from "@/api/government";

import { ref, onMounted } from "vue";

const dialogGovernmentAdd = ref(false);
const dialogGovernmentView = ref(false);
const dialogGovernmentRemove = ref(false);

const isLoading = ref(false);
const governments = ref();
const government = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = ({ id }) => {
  console.log(id);
  router.push({
    name: "AdminGovernmentsView",
    params: { id: id },
  });
};

const addHandler = async () => {
  dialogGovernmentAdd.value = true;
};

const removeHandler = async (item) => {
  government.value = item;
  dialogGovernmentRemove.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    governments.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    governments.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    governments.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
