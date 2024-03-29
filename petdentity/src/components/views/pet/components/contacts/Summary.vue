<template>
  <Panel label="Contacts" icon="mdi-needle" min-height="320">
    <DataTable
      hover
      :loading="isLoading"
      :headers="headers"
      :items="contacts"
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

    <DialogContactView
      v-model="dialogContactView"
      :contact="contact"
      readOnly
    />

    <DialogContactAddToPet
      v-model="dialogContactAddToPet"
      :pet="pet"
      @done="loadItems"
    />

    <DialogContactRemoveFromPet
      v-model="dialogContactRemoveFromPet"
      :contact="contact"
      @done="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogContactView from "@/components/dialogs/contact/DialogContactView.vue";
import DialogContactAddToPet from "@/components/dialogs/contact/DialogContactAddToPet.vue";
import DialogContactRemoveFromPet from "@/components/dialogs/contact/DialogContactRemoveFromPet.vue";

import { headers } from "./data";
import { getAllByPet, getAllByPetNext, getAllByPetPrev } from "@/api/contact";

import { toRefs, ref, computed, onMounted, watch } from "vue";
// import { useModel } from "@/utils/vue";

// const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ pet: Object, readOnly: Boolean });

const propsRef = toRefs(props);
const { readOnly, pet } = propsRef;

const dialogContactView = ref(false);
const dialogContactAddToPet = ref(false);
const dialogContactRemoveFromPet = ref(false);

const isLoading = ref(false);

const contacts = ref();
const contact = ref();

const params = ref({
  searchText: "",
  columnName: "name",
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
  try {
    isLoading.value = true;
    contacts.value = await getAllByPet(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const next = async () => {
  try {
    isLoading.value = true;
    contacts.value = await getAllByPetNext(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prev = async () => {
  try {
    isLoading.value = true;
    contacts.value = await getAllByPetPrev(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = (item) => {
  dialogContactAddToPet.value = true;
};

const viewHandler = (item) => {
  contact.value = item;
  dialogContactView.value = true;
};

const removeHandler = (item) => {
  contact.value = item;
  dialogContactRemoveFromPet.value = true;
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
