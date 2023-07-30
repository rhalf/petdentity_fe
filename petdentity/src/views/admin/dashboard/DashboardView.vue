<template>
  <v-container>
    <Sheet class="bg-transparent">
      <Label header>Counters</Label>

      <v-row class="mt-2">
        <v-col
          cols="12"
          sm="4"
          md="3"
          lg="3"
          xl="2"
          v-for="(counter, index) in counters"
          :key="index"
        >
          <v-card>
            <v-row dense class="pa-4 bg-primary">
              <v-col cols="auto" align="left" justify="center">
                <v-icon class="text-h2">{{ counter.icon }}</v-icon>
              </v-col>
              <v-col cols="" align="right" justify="center">
                <Label title medium>{{ format(counter.count) }}</Label>
                <Label text medium>{{ counter.title }}</Label>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import _ from "lodash";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countAnimals } from "@/api/animal";
import { count as countBreeds } from "@/api/breed";
import { count as countCoats } from "@/api/coat";
import { count as countUnits } from "@/api/unit";
import { count as countUsers } from "@/api/user";

import { ref, onMounted } from "vue";

const counters = ref();

onMounted(async () => {
  try {
    start();

    const array = [];

    array.push({
      title: "Animals",
      icon: "mdi-paw",
      count: await countAnimals(),
    });

    array.push({
      title: "Breeds",
      icon: "mdi-dna",
      count: await countBreeds(),
    });

    array.push({
      title: "Coats",
      icon: "mdi-sheep",
      count: await countCoats(),
    });

    array.push({
      title: "Units",
      icon: "mdi-access-point",
      count: await countUnits(),
    });

    array.push({
      title: "Users",
      icon: "mdi-account-multiple",
      count: await countUsers(),
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
