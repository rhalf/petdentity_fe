<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Units : {{ unitsCount }}</Label>
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
            @home="loadItems"
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <v-alert type="info" class="mt-5">
      <Label text medium> Cant add unit? </Label>
      <Label caption> REASONS </Label>
      <Label caption> • Unit(Microchip/Tag) is not from PETDENTITY </Label>
      <Label caption> • Unit needs to be registered </Label>
      <Label caption>
        • Please contact us on Facebook Page
        <Anchor @click="clickHandler"> Petdentity </Anchor> if u dont have unit
        yet!
      </Label>
      <Label caption>
        • For more details you may call us on PLDT(8711-4975),
        Globe(0945-455-2018), Smart( 0939-649-3217).
      </Label>
    </v-alert>

    <DialogUnitAddToGovernment
      v-model="dialogUnitAddToGovernment"
      v-model:government="government"
      @done="loadItems"
    />
    <DialogUnitViewFromGovernment
      v-model="dialogUnitViewFromGovernment"
      v-model:unit="unit"
      @done="loadItems"
    />
    <DialogUnitRemoveFromGovernment
      v-model="dialogUnitRemoveFromGovernment"
      v-model:unit="unit"
      @done="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Anchor from "@/components/common/Anchor.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUnitAddToGovernment from "@/components/dialogs/unit/DialogUnitAddToGovernment.vue";
import DialogUnitViewFromGovernment from "@/components/dialogs/unit/DialogUnitViewFromGovernment.vue";
import DialogUnitRemoveFromGovernment from "@/components/dialogs/unit/DialogUnitRemoveFromGovernment.vue";

import { search, next, prev, count } from "@/api/government/units";

import { ref, watch, inject } from "vue";

const dialogUnitAddToGovernment = ref(false);
const dialogUnitViewFromGovernment = ref(false);
const dialogUnitRemoveFromGovernment = ref(false);

const isLoading = ref(false);
const government = inject("government");

const unitsCount = ref(0);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = () => {
  dialogUnitAddToGovernment.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemoveFromGovernment.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitViewFromGovernment.value = true;
};

const clickHandler = () => {
  window.open("https://www.facebook.com/Petdentity");
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    units.value = await search(government.value, params.value);
    unitsCount.value = await count(government.value);
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

    units.value = await next(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await prev(government.value, params.value);
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
