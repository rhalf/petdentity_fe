<template>
  <Panel label="Units" icon="mdi-access-point" min-height="320">
    <DataTable
      class="pa-4"
      hover
      :loading="isLoading"
      :headers="headers"
      :items="units"
      :items-per-pageNumber="params.limitNumber"
      hide-default-footer
      withView
      :withAdd="!readOnly"
      :withRemove="!readOnly"
      @add="addHandler"
      @remove="removeHandler"
      @view="viewHandler"
      @next="nextHandler"
      @prev="prevHandler"
    />

    <DialogUnitView v-model="dialogUnitView" :unit="unit" readOnly />

    <DialogUnitAddToPet
      v-model="dialogUnitAddToPet"
      :government="government"
      @added="loadItems"
    />

    <DialogUnitRemoveFromPet
      v-model="dialogUnitRemoveFromPet"
      :unit="unit"
      @removed="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogUnitAddToPet from "@/components/dialogs/unit/DialogUnitAddToPet.vue";
import DialogUnitRemoveFromPet from "@/components/dialogs/unit/DialogUnitRemoveFromPet.vue";
import DialogUnitView from "@/components/dialogs/unit/DialogUnitView.vue";

import { headers } from "./data";
import { search, next, prev } from "@/api/government/units";

import { toRefs, ref, watch } from "vue";
// import { useModel } from "@/utils/vue";
// const emit = defineEmits(["update:government"]);
const props = defineProps({ government: Object, readOnly: Boolean });

const propsRef = toRefs(props);
const { readOnly, government } = propsRef;

const dialogUnitView = ref(false);
const dialogUnitAddToPet = ref(false);
const dialogUnitRemoveFromPet = ref(false);

const isLoading = ref(false);

const units = ref();
const unit = ref();

const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

watch(
  government,
  async (current) => {
    await loadItems();
  },
  { deep: true }
);

const loadItems = async () => {
  try {
    isLoading.value = true;
    units.value = await search(government.value.id);
  } catch ({ message }) {
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

const addHandler = (item) => {
  dialogUnitAddToPet.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitView.value = true;
};

const removeHandler = (item) => {
  unit.value = item;
  dialogUnitRemoveFromPet.value = true;
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
