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
      count: await countAnimals(),
    });

    array.push({
      title: "Breeds",
      count: await countBreeds(),
    });

    array.push({
      title: "Coats",
      count: await countCoats(),
    });

    array.push({
      title: "Units",
      count: await countUnits(),
    });

    array.push({
      title: "Users",
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
