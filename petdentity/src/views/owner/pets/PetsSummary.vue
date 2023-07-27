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
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogPetAdd v-model="dialogPetAdd" @done="loadItems" />
    <DialogPetView
      v-model="dialogPetView"
      v-model:pet="pet"
      @done="loadItems"
    />
    <DialogPetRemove
      v-model="dialogPetRemove"
      v-model:pet="pet"
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

import DialogPetAdd from "@/components/dialogs/pet/DialogPetAdd.vue";
import DialogPetView from "@/components/dialogs/pet/DialogPetView.vue";
import DialogPetRemove from "@/components/dialogs/pet/DialogPetRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();

import { search, next, prev, countByOwner as countPet } from "@/api/pet";
import { countByOwner as countUnit } from "@/api/unit";

import { ref, onMounted } from "vue";

const dialogPetAdd = ref(false);
const dialogPetView = ref(false);
const dialogPetRemove = ref(false);

const isLoading = ref(false);
const pets = ref();
const pet = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  try {
    isLoading.value = true;

    const unitCount = await countUnit();
    const petCount = await countPet();

    if (unitCount <= petCount)
      throw new Error("Please add more units to continue!");

    dialogPetAdd.value = true;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const updateHandler = (item) => {
  pet.value = item;
  dialogPetView.value = true;
};

const removeHandler = async (item) => {
  pet.value = item;
  dialogPetRemove.value = true;
};

const viewHandler = async (item) => {
  router.push({
    name: "OwnerPetView",
    params: {
      id: item.id,
    },
  });
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    pets.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    pets.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    pets.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
