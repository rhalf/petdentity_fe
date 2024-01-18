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
            :items-per-page="pets.length"
            hide-default-footer
            withRemove
            withView
            withMore
            @refresh="loadItems"
            @remove="removeHandler"
            @view="viewHandler"
            @more="moreHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
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

import DialogPetView from "@/components/dialogs/pet/DialogPetView.vue";
import DialogPetRemove from "@/components/dialogs/pet/DialogPetRemove.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { search, more } from "@/api/government/pets";

import { ref, watchEffect, inject } from "vue";

const dialogPetView = ref(false);
const dialogPetRemove = ref(false);

const isLoading = ref(false);
const government = inject("government");

const pets = ref([]);
const pet = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const removeHandler = async (item) => {
  pet.value = item;
  dialogPetRemove.value = true;
};

const viewHandler = async (item) => {
  router.push({
    name: "GovernmentPetView",
    params: {
      id: government.id,
      petId: item.id,
    },
  });
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    pets.value = await search(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    isLoading.value = true;
    const result = await more(government.value, params.value);
    pets.value = [...pets.value, ...result];
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(async () => {
  if (government.value) loadItems();
});
</script>
