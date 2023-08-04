<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Units</Label>
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

    <DialogUnitAddToOwner v-model="dialogUnitAddToOwner" @done="loadItems" />
    <DialogUnitViewFromOwner
      v-model="dialogUnitViewFromOwner"
      v-model:unit="unit"
      @done="loadItems"
    />
    <DialogUnitRemoveFromOwner
      v-model="dialogUnitRemoveFromOwner"
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

import DialogUnitAddToOwner from "@/components/dialogs/unit/DialogUnitAddToOwner.vue";
import DialogUnitViewFromOwner from "@/components/dialogs/unit/DialogUnitViewFromOwner.vue";
import DialogUnitRemoveFromOwner from "@/components/dialogs/unit/DialogUnitRemoveFromOwner.vue";

import { searchByOwner, nextByOwner, prevByOwner } from "@/api/unit";

import { ref, onMounted } from "vue";

const dialogUnitAddToOwner = ref(false);
const dialogUnitViewFromOwner = ref(false);
const dialogUnitRemoveFromOwner = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = () => {
  dialogUnitAddToOwner.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemoveFromOwner.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitViewFromOwner.value = true;
};

const clickHandler = () => {
  window.open("https://www.facebook.com/Petdentity");
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    units.value = await searchByOwner(params.value);
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

    units.value = await nextByOwner(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await prevByOwner(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
