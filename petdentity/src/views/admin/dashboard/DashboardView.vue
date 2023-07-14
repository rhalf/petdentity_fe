<template>
  <v-container>
    <Sheet class="bg-transparent">
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="3"
          lg="2"
          v-for="(counter, index) in counters"
          :key="index"
        >
          <v-slide-x-transition>
            <v-card v-if="counter">
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
          </v-slide-x-transition>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import _ from "lodash";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import { count as countAnimals } from "@/api/animal";
import { count as countBreeds } from "@/api/breed";
import { count as countUnits } from "@/api/unit";
import { count as countUsers } from "@/api/unit";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { ref, onMounted } from "vue";

const counters = ref();

onMounted(async () => {
  try {
    start();

    const array = [
      {
        title: "Animals",
        count: await countAnimals(),
        // count: _.padStart(await countAnimals(), 7, "0"),
      },
      {
        title: "Breeds",
        count: await countBreeds(),
        // count: _.padStart(await countAnimals(), 7, "0"),
      },
      {
        title: "Units",
        count: await countUnits(),
        // count: _.padStart(await countUnits(), 7, "0"),
      },
      {
        title: "Users",
        count: await countUsers(),
        // count: _.padStart(await countUsers(), 7, "0"),
      },
    ];

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
</script>
