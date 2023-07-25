<template>
  <v-container>
    <Sheet class="bg-transparent">
      <Label header>Counters</Label>

      <v-row class="mt-2">
        <v-col
          cols="12"
          sm="4"
          md="3"
          lg="2"
          v-for="(counter, index) in counters"
          :key="index"
        >
          <v-card>
            <v-row dense class="bg-primary">
              <v-col class="ma-2" align="center" justify="center">
                <Label header>{{ counter.title }}</Label>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="ma-1" align="center" justify="center">
                <Label title>{{ format(counter.count) }}</Label>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <Label header class="mt-12"> Partners </Label>
      <v-row class="mt-2">
        <v-col>
          <Partners />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import _ from "lodash";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import Partners from "@/components/views/partners/Partners.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countUnits } from "@/api/unit-owner";
import { count as countPets } from "@/api/pet";
import { count as countContacts } from "@/api/contact";

import { ref, onMounted } from "vue";

const counters = ref();

onMounted(async () => {
  try {
    start();

    const array = [];

    array.push({
      title: "Contacts",
      count: await countContacts(),
    });

    array.push({
      title: "Pets",
      count: await countPets(),
    });

    array.push({
      title: "Units",
      count: await countUnits(),
    });

    counters.value = array;
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});

const format = (number) => {
  return number.toLocaleString("en-US");
};

const pad = (value) => {
  return _.padStart(value, 7, "0");
};
</script>
