<template>
  <v-container>
    <v-row class="mt-8">
      <v-col cols="12" sm="4" md="3" lg="2">
        <v-card>
          <v-row dense class="bg-primary">
            <v-col class="ma-2" align="center" justify="center">
              <Label header>Animals</Label>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="ma-1" align="center" justify="center">
              <Label title>{{ counter.animals }}</Label>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="2">
        <v-card>
          <v-row dense class="bg-primary">
            <v-col class="ma-2" align="center" justify="center">
              <Label header>Units</Label>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="ma-1" align="center" justify="center">
              <Label title>{{ counter.units }}</Label>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import _ from "lodash";
import Label from "@/components/common/Label.vue";

import { count as countAnimals } from "@/api/animal";
import { count as countUnits } from "@/api/unit";

import { ref, onMounted } from "vue";

const counter = ref({});

onMounted(async () => {
  counter.value.animals = _.padStart(await countAnimals(), 7, "0");
  counter.value.units = _.padStart(await countUnits(), 7, "0");
});
</script>
