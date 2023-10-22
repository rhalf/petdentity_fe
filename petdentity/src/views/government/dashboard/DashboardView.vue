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
          <Counter v-model="counters[index]" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import Counter from "@/components/views/counter/Counter.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countLikes } from "@/api/government/likes";
import { count as countPets } from "@/api/government/pets";
import { count as countUnits } from "@/api/government/units";
import { count as countUsers } from "@/api/government/users";

import { ref, inject, watch } from "vue";

import { dashboardItems } from "./data";

const counters = ref(dashboardItems);

const government = inject("government");

const loadCounters = async () => {
  try {
    start();
    counters.value[0].count = await countLikes(government.value);
    counters.value[1].count = await countPets(government.value);
    counters.value[2].count = await countUnits(government.value);
    counters.value[3].count = await countUsers(government.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    stop();
  }
};

watch(
  government,
  () => {
    if (government.value) loadCounters();
  },
  { immediate: true }
);
</script>
