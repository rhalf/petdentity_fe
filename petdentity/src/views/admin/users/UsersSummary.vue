<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Users</Label>
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
            :items="users"
            :items-per-page="params.limit"
            hide-default-footer
            withView
            withRemove
            @remove="removeHandler"
            @view="viewHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <DialogUnitRemove
      v-model="dialogUnitRemove"
      v-model:user="user"
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

import DialogUnitRemove from "@/components/dialogs/user/DialogUnitRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { search, next, prev } from "@/api/user";

import { ref, onMounted } from "vue";

const dialogUnitRemove = ref(false);

const isLoading = ref(false);
const users = ref();
const user = ref();
const params = ref({
  searchText: "",
  columnName: "id",
  orderDirection: "asc",
  limitNumber: 5,
  firstItem: "",
  lastItem: "",
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    const items = await search(params.value);

    const firstIndex = 0;
    const lastIndex = items.length - 1;
    params.value.firstItem = items[firstIndex][params.value.columnName];
    params.value.lastItem = items[lastIndex][params.value.columnName];

    users.value = items;
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
  user.value = item;
  dialogUnitRemove.value = true;
};

const viewHandler = ({ id }) => {
  console.log(id);
  router.push({
    name: "AdminUsersView",
    params: { id: id },
  });
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

    users.value = result;
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

    users.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
