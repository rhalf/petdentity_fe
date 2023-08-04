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

    <DialogUserRemove
      v-model="dialogUserRemove"
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

import DialogUserRemove from "@/components/dialogs/user/DialogUserRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { search, next, prev } from "@/api/user";

import { ref, onMounted } from "vue";

const dialogUserRemove = ref(false);

const isLoading = ref(false);
const users = ref();
const user = ref();
const params = ref({
  searchText: "",
  columnName: "email",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = ({ id }) => {
  console.log(id);
  router.push({
    name: "AdminUsersView",
    params: { id: id },
  });
};

const removeHandler = async (item) => {
  user.value = item;
  dialogUserRemove.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    users.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    users.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    users.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
