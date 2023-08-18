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
      @next="nextHandler"
      @prev="prevHandler"
    />

    <DialogContactView
      v-model="dialogContactView"
      :contact="contact"
      readOnly
    />

    <DialogPetContactAdd
      v-model="dialogPetContactAdd"
      :pet="pet"
      @done="loadItems"
    />

    <DialogPetContactRemove
      v-model="dialogPetContactRemove"
      :contact="contact"
      @done="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";

import DataTable from "@/components/tables/DataTable.vue";

import DialogContactView from "@/components/dialogs/contact/DialogContactView.vue";
import DialogPetContactAdd from "@/components/dialogs/pet-contact/DialogPetContactAdd.vue";
import DialogPetContactRemove from "@/components/dialogs/pet-contact/DialogPetContactRemove.vue";

import { headers } from "./data";
import { search, next, prev } from "@/api/pet-contacts";

import { toRefs, ref, watch } from "vue";

const props = defineProps({ pet: Object, readOnly: Boolean });

const propsRef = toRefs(props);
const { readOnly, pet } = propsRef;

const dialogContactView = ref(false);
const dialogPetContactAdd = ref(false);
const dialogPetContactRemove = ref(false);

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
    contacts.value = await search(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    contacts.value = await next(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    contacts.value = await prev(pet.value, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = (item) => {
  dialogPetContactAdd.value = true;
};

const viewHandler = (item) => {
  contact.value = item;
  dialogContactView.value = true;
};

const removeHandler = (item) => {
  contact.value = item;
  dialogPetContactRemove.value = true;
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
