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

import { count as countAnimals } from "@/api/animal";
import { count as countBreeds } from "@/api/breed";
import { count as countCoats } from "@/api/coat";
import { count as countUnits } from "@/api/unit";
import { count as countUsers } from "@/api/users";
import { count as countGovernments } from "@/api/government";

import { ref, onMounted } from "vue";

import { dashboardItems } from "./data";

const counters = ref(dashboardItems);

onMounted(async () => {
  try {
    start();
    counters.value[0].count = await countAnimals();
    counters.value[1].count = await countBreeds();
    counters.value[2].count = await countCoats();
    counters.value[3].count = await countUnits();
    counters.value[4].count = await countUsers();
    counters.value[5].count = await countGovernments();
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    stop();
  }
});
</script>
