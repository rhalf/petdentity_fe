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

import { count as countAnimals } from "@/api/animal";
import { count as countUnits } from "@/api/unit";
import { count as countUsers } from "@/api/unit";

import { ref, onMounted } from "vue";

const counters = ref([]);

onMounted(async () => {
  const array = [
    {
      title: "Animals",
      count: await countAnimals(),
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
});

const format = (number) => {
  return number.toLocaleString("en-US");
};
</script>
