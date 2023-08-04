<template>
  <v-container>
    <Sheet>
      <Label class="text-primary">
        <v-row>
          <v-col align="start"> Unit UID </v-col>
          <v-col align="end">
            <span v-if="units"> Unit Found: {{ units.length }}</span>
          </v-col>
        </v-row>
      </Label>

      <v-row class="mt-4">
        <v-col cols="12" md="" align="start">
          <TextField
            v-model="searchText"
            append-inner-icon="mdi-magnify"
            @keypress="keypressHandler"
            placeholder="Search"
          />
        </v-col>
      </v-row>

      <v-row class="mt-4" v-for="(unit, index) in units" :key="index">
        <v-col cols="12" xs="6" sm="4" md="3" align="start">
          <PetItem v-model="units[index].pet" v-if="units[index].pet" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import PetItem from "./components/PetItem.vue";

import { debounce } from "lodash";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { getByUid } from "@/api/unit";

import { ref } from "vue";

const searchText = ref();

const units = ref();

const keypressHandler = debounce(() => {
  submitHandler();
}, 1000);

const submitHandler = async () => {
  try {
    if (!searchText.value) return;

    start();

    units.value = await getByUid(searchText.value);

    if (!units.value.length) throw new Error("Unit not found!");
  } catch {
    show("error", "Unit not found!");
  } finally {
    stop();
  }
};
</script>
