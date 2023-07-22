<template>
  <v-container>
    <Sheet>
      <Label>
        <v-row>
          <v-col align="start"> Unit Unique Identifier (UUID) </v-col>
          <v-col align="end">
            <span v-if="units"> Unit Found: {{ units.length }}</span>
          </v-col>
        </v-row>
      </Label>
      <TextField
        v-model="searchText"
        class="mt-2"
        append-inner-icon="mdi-magnify"
        @keypress.enter="submitHandler"
      />
    </Sheet>

    {{ units }}
    {{ pet }}
  </v-container>
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import _ from "lodash";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { getByUid } from "@/api/unit";
import { get } from "@/api/pet";
import { ref } from "vue";

const searchText = ref();

const units = ref();
const pet = ref();

const submitHandler = async () => {
  try {
    units.value = await getByUid(searchText.value);

    const unit = units.value[0];

    pet.value = await get(unit.pet);
  } catch ({ message }) {
    show("error", message);
  }
};
</script>
