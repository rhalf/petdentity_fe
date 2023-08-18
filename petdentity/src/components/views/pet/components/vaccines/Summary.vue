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
      @add="addHandler"
      @remove="removeHandler"
      @view="viewHandler"
      @next="next"
      @prev="prev"
    />

    <DialogVaccineAdd
      v-model="dialogVaccineAdd"
      v-model:pet="pet"
      @done="loadItems"
    />

    <DialogVaccineView
      v-model="dialogVaccineView"
      v-model:vaccine="vaccine"
      :read-only="readOnly"
      @done="loadItems"
    />

    <DialogVaccineRemove
      v-model="dialogVaccineRemove"
      v-model:vaccine="vaccine"
      @done="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogVaccineAdd from "@/components/dialogs/vaccine/DialogVaccineAdd.vue";
import DialogVaccineView from "@/components/dialogs/vaccine/DialogVaccineView.vue";
import DialogVaccineRemove from "@/components/dialogs/vaccine/DialogVaccineRemove.vue";

import { headers } from "./data";
import { getAllByPet, getAllByPetNext, getAllByPetPrev } from "@/api/vaccine";

import { toRefs, ref, computed, watch } from "vue";
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
const vaccine = ref({});

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
    vaccines.value = await getAllByPet(pet.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const next = async () => {
  try {
    isLoading.value = true;
    vaccines.value = await getAllByPetNext(pet.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prev = async () => {
  try {
    isLoading.value = true;
    vaccines.value = await getAllByPetPrev(pet.value.id, params.value);
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
