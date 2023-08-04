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

import { countByOwner as countUnits } from "@/api/unit";
import { countByOwner as countPets } from "@/api/pet";
import { count as countContacts } from "@/api/contact";

import { ref, onMounted } from "vue";

const counters = ref([
  { title: "Contacts", icon: "mdi-account-group", count: 0 },
  { title: "Units", icon: "mdi-access-point", count: 0 },
  { title: "Pets", icon: "mdi-paw", count: 0 },
]);

onMounted(async () => {
  try {
    start();
    counters.value[0].count = await countContacts();
    counters.value[1].count = await countUnits();
    counters.value[2].count = await countPets();
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
