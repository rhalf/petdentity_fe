<template>
  <Panel label="Units" icon="mdi-access-point" min-height="320">
    <DataTable
      class="pa-4"
      hover
      :loading="isLoading"
      :headers="headers"
      :items="units"
      withAdd
      :items-per-pageNumber="params.limitNumber"
      hide-default-footer
      withRemove
      @add="addHandler"
      @remove="removeHandler"
      @next="next"
      @prev="prev"
    />

    <DialogUnitAddToPet
      v-model="dialogUnitAddToPet"
      :pet="pet"
      @done="loadItems"
    />

    <DialogUnitRemoveFromPet
      v-model="dialogUnitRemoveFromPet"
      :unit="unit"
      @done="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogUnitAddToPet from "@/components/dialogs/unit/DialogUnitAddToPet.vue";
import DialogUnitRemoveFromPet from "@/components/dialogs/unit/DialogUnitRemoveFromPet.vue";

import { headers } from "./data";
import { getAllByPet, getAllByPetNext, getAllByPetPrev } from "@/api/unit";

import { toRefs, ref, computed, onMounted, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });

const propsRef = toRefs(props);

const dialogUnitAddToPet = ref(false);
const dialogUnitRemoveFromPet = ref(false);

const isLoading = ref(false);

const units = ref();
const unit = ref();

const pet = computed(useModel(propsRef, emit, "modelValue"));

const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

watch(
  pet,
  async (current) => {
    await loadItems();
  },
  { deep: true }
);

const loadItems = async () => {
  console.log("loadItems");
  try {
    isLoading.value = true;
    units.value = await getAllByPet(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const next = async () => {
  try {
    isLoading.value = true;
    units.value = await getAllByPetNext(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prev = async () => {
  try {
    isLoading.value = true;
    units.value = await getAllByPetPrev(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = (item) => {
  dialogUnitAddToPet.value = true;
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
