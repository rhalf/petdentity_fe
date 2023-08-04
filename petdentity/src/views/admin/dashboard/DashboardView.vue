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

const counters = ref([
  { title: "Animals", icon: "mdi-paw", count: 0 },
  { title: "Breeds", icon: "mdi-dna", count: 0 },
  { title: "Coats", icon: "mdi-sheep", count: 0 },
  { title: "Units", icon: "mdi-access-point", count: 0 },
  { title: "Users", icon: "mdi-account-multiple", count: 0 },
]);

onMounted(async () => {
  try {
    start();
    counters.value[0].count = await countAnimals();
    counters.value[1].count = await countBreeds();
    counters.value[2].count = await countCoats();
    counters.value[3].count = await countUnits();
    counters.value[4].count = await countUsers();
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
