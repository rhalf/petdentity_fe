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
            placeholder="UID"
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
            hide-default-footer
            :items-per-page="units.length"
            withRemove
            withView
            withAdd
            withMore
            @refresh="loadItems"
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @more="moreHandler"
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

    <DialogUnitAddToOwner v-model="dialogUnitAddToOwner" @added="loadItems" />
    <DialogUnitViewFromOwner
      v-model="dialogUnitViewFromOwner"
      v-model:unit="unit"
      @updated="loadItems"
    />
    <DialogUnitRemoveFromOwner
      v-model="dialogUnitRemoveFromOwner"
      v-model:unit="unit"
      @removed="loadItems"
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

import { search, more } from "@/api/owner/units";

import { ref, watchEffect, inject } from "vue";

const dialogUnitAddToOwner = ref(false);
const dialogUnitViewFromOwner = ref(false);
const dialogUnitRemoveFromOwner = ref(false);

const user = inject("user");

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

const loadItems = async () => {
  try {
    isLoading.value = true;

    units.value = await search(user.value, params.value);
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    isLoading.value = true;
    const result = await more(user.value, params.value);
    units.value = [...units.value, ...result];
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
