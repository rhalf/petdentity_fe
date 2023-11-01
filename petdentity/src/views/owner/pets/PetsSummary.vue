<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Pets</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
            placeholder="Name"
          />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="pets"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withAdd
            withView
            @refresh="loadItems"
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogPetAdd v-model="dialogPetAdd" @added="loadItems" />
    <DialogPetView
      v-model="dialogPetView"
      v-model:pet="pet"
      @updated="loadItems"
    />
    <DialogPetRemove
      v-model="dialogPetRemove"
      v-model:pet="pet"
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

import DialogPetAdd from "@/components/dialogs/pet/DialogPetAdd.vue";
import DialogPetView from "@/components/dialogs/pet/DialogPetView.vue";
import DialogPetRemove from "@/components/dialogs/pet/DialogPetRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();

import { search, next, prev, count as countPets } from "@/api/owner/pets";
import { count as countUnits } from "@/api/owner/units";

import { ref, watchEffect, inject } from "vue";

const dialogPetAdd = ref(false);
const dialogPetView = ref(false);
const dialogPetRemove = ref(false);

const isLoading = ref(false);
const pets = ref();
const pet = ref();

const user = inject("user");

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  try {
    isLoading.value = true;

    const unitCount = await countUnits(user.value);
    const petCount = await countPets(user.value);

    if (unitCount <= petCount)
      throw new Error("Please add more units to continue!");

    dialogPetAdd.value = true;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const removeHandler = async (item) => {
  pet.value = item;
  dialogPetRemove.value = true;
};

const viewHandler = async ({ id }) => {
  router.push({
    name: "OwnerPetView",
    params: {
      petId: id,
    },
  });
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    pets.value = await search(user.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    pets.value = await next(user.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    pets.value = await prev(user.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(async () => {
  if (user.value) loadItems();
});
</script>
