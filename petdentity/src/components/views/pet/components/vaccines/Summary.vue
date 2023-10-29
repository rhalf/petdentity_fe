<template>
  <Panel label="Vaccines" icon="mdi-needle" min-height="320">
    <DataTable
      class="pa-4"
      hover
      :loading="isLoading"
      :headers="headers"
      :items="vaccines"
      :items-per-pageNumber="params.limitNumber"
      hide-default-footer
      withView
      :withAdd="!readOnly"
      :withRemove="!readOnly"
      @refresh="loadItems"
      @add="addHandler"
      @remove="removeHandler"
      @view="viewHandler"
      @next="nextHandler"
      @prev="prevHandler"
    />

    <DialogVaccineAdd
      v-model="dialogVaccineAdd"
      v-model:pet="pet"
      @added="loadItems"
    />

    <DialogVaccineView
      v-model="dialogVaccineView"
      v-model:vaccine="vaccine"
      :read-only="readOnly"
      @updated="loadItems"
    />

    <DialogVaccineRemove
      v-model="dialogVaccineRemove"
      v-model:vaccine="vaccine"
      @removed="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogVaccineAdd from "@/components/dialogs/vaccine/DialogVaccineAdd.vue";
import DialogVaccineView from "@/components/dialogs/vaccine/DialogVaccineView.vue";
import DialogVaccineRemove from "@/components/dialogs/vaccine/DialogVaccineRemove.vue";

import { cloneDeep } from "lodash";
import { headers } from "./data";
import { search, next, prev } from "@/api/pet/vaccines";

import { toRefs, ref, computed, watch } from "vue";
import { Vaccine } from "@/constants";
// import { useModel } from "@/utils/vue";
// const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  pet: Object,
  readOnly: Boolean,
});

const propsRef = toRefs(props);
const { readOnly, pet } = propsRef;

const dialogVaccineAdd = ref(false);
const dialogVaccineRemove = ref(false);
const dialogVaccineView = ref(false);

const isLoading = ref(false);

const params = ref({
  searchText: "",
  columnName: "applicationDate",
  orderDirection: "desc",
  limitNumber: 5,
});

const vaccines = ref();
const vaccine = ref(cloneDeep(Vaccine));

watch(
  pet,
  async (current) => {
    await loadItems();
  },
  { deep: true }
);

const loadItems = async () => {
  try {
    isLoading.value = true;
    vaccines.value = await search(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    vaccines.value = await next(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    vaccines.value = await prev(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = (item) => {
  dialogVaccineAdd.value = true;
};

const removeHandler = (item) => {
  vaccine.value = item;
  dialogVaccineRemove.value = true;
};

const viewHandler = (item) => {
  vaccine.value = item;
  dialogVaccineView.value = true;
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
