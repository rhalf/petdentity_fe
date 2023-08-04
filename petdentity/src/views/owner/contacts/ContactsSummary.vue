<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Contacts </Label>
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
            :items="contacts"
            :items-per-pageNumber="params.limitNumber"
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
    <DialogContactAdd v-model="dialogContactAdd" @done="loadItems" />
    <DialogContactView
      v-model="dialogContactView"
      v-model:contact="contact"
      @done="loadItems"
    />
    <DialogContactRemove
      v-model="dialogContactRemove"
      v-model:contact="contact"
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

import DialogContactAdd from "@/components/dialogs/contact/DialogContactAdd.vue";
import DialogContactView from "@/components/dialogs/contact/DialogContactView.vue";
import DialogContactRemove from "@/components/dialogs/contact/DialogContactRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/contact";

import { ref, onMounted } from "vue";

const dialogContactAdd = ref(false);
const dialogContactView = ref(false);
const dialogContactRemove = ref(false);

const isLoading = ref(false);
const contacts = ref([]);
const contact = ref({});
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  dialogContactAdd.value = true;
};

const viewHandler = (item) => {
  contact.value = item;
  dialogContactView.value = true;
};

const removeHandler = async (item) => {
  contact.value = item;
  dialogContactRemove.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    contacts.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    contacts.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    contacts.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
