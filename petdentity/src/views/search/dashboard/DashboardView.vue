<template>
  <v-container>
    <Sheet>
      <Label class="text-primary">
        <v-row>
          <v-col align="start"> Unit Unique Identifier (UUID) </v-col>
          <v-col align="end">
            <span v-if="units"> Unit Found: {{ units.length }}</span>
          </v-col>
        </v-row>
      </Label>

      <TextField
        v-model="searchText"
        class="mt-4"
        append-inner-icon="mdi-magnify"
        @keypress.enter="submitHandler"
      />

      <v-row v-for="(unit, index) in units" :key="index">
        <v-col>
          <PetItem v-model="units[index].pet" />
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

import _ from "lodash";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { getByUid } from "@/api/unit";

import { ref } from "vue";

const searchText = ref();

const units = ref();

const submitHandler = async () => {
  try {
    if (!searchText.value) return;

    units.value = await getByUid(searchText.value);
  } catch {
    show("error", "No found UUID!");
  }
};
</script>
