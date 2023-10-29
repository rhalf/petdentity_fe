<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Users </Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            placeholder="Email"
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
            withAdd
            @add="addHandler"
            @refresh="loadItems"
            @remove="removeHandler"
            @view="viewHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <DialogUserRemoveGovernment
      v-model="dialogUserRemoveGovernment"
      v-model:user="user"
      v-model:government="government"
      @removed="loadItems"
    />

    <DialogUserAddGovernment
      v-model="dialogUserAddGovernment"
      v-model:user="user"
      v-model:government="government"
      @added="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUserRemoveGovernment from "@/components/dialogs/user/DialogUserRemoveGovernment.vue";
import DialogUserAddGovernment from "@/components/dialogs/user/DialogUserAddGovernment.vue";

import { search, next, prev, count } from "@/api/government/users";

import { ref, watch, inject } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const dialogUserRemoveGovernment = ref(false);
const dialogUserAddGovernment = ref(false);

const isLoading = ref(false);
const government = inject("government");

const users = ref();
const user = ref();

const params = ref({
  searchText: "",
  columnName: "email",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = ({ id }) => {
  router.push({
    name: "GovernmentUserView",
    params: { id: government.value.id, userId: id },
  });
};

const removeHandler = async (item) => {
  user.value = item;
  dialogUserRemoveGovernment.value = true;
};

const addHandler = async (item) => {
  user.value = item;
  dialogUserAddGovernment.value = true;
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    users.value = await search(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    users.value = await next(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    users.value = await prev(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watch(
  government,
  () => {
    if (government.value) loadItems();
  },
  { immediate: true }
);
</script>
