<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Profile</Label>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row dense class="mt-5">
        <v-col> </v-col>
      </v-row>
      <v-row dense class="mt-5">
        <v-col>
          <FormGovernment v-model="government" :disabled="true" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import FormGovernment from "@/components/forms/government/FormGovernment.vue";
import Label from "@/components/common/Label.vue";

import { search, next, prev, count } from "@/api/government/units";

import { ref, watch, inject } from "vue";

const dialogUnitAddToGovernment = ref(false);
const dialogUnitViewFromGovernment = ref(false);
const dialogUnitRemoveFromGovernment = ref(false);

const isLoading = ref(false);
const government = inject("government");

const unitsCount = ref(0);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = () => {
  dialogUnitAddToGovernment.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemoveFromGovernment.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitViewFromGovernment.value = true;
};

const clickHandler = () => {
  window.open("https://www.facebook.com/Petdentity");
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    units.value = await search(government.value, params.value);
    unitsCount.value = await count(government.value);
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await next(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await prev(government.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watch(
  government,
  () => {
    if (government.value) loadItems();
  },
  { immediate: true }
);
</script>
