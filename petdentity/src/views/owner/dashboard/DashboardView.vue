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
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import Counter from "@/components/views/counter/Counter.vue";

import Partners from "@/components/views/partners/Partners.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countUnits } from "@/api/owner/units";
import { count as countPets } from "@/api/owner/pets";
import { count as countContacts } from "@/api/owner/contacts";

import { ref, watchEffect, inject } from "vue";

import { dashboardItems } from "./data";

const user = inject("user");

const counters = ref(dashboardItems);

const loadCounters = async () => {
  try {
    start();
    counters.value[0].count = await countContacts(user.value);
    counters.value[1].count = await countUnits(user.value);
    counters.value[2].count = await countPets(user.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    stop();
  }
};

watchEffect(async () => {
  if (user.value) loadCounters();
});
</script>
