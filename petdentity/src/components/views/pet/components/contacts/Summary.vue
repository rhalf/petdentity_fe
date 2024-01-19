<template>
  <Panel label="Contacts" icon="mdi-needle" min-height="320">
    <DataTable
      hover
      :loading="isLoading"
      :headers="headers"
      :items="contacts"
      :items-per-pageNumber="contacts.length"
      hide-default-footer
      withView
      :withAdd="!readOnly"
      :withRemove="!readOnly"
      withMore
      @refresh="loadItems"
      @add="addHandler"
      @remove="removeHandler"
      @view="viewHandler"
      @more="moreHandler"
    />

    <DialogContactView
      v-model="dialogContactView"
      :contact="contact"
      readOnly
    />

    <DialogPetContactAdd
      v-model="dialogPetContactAdd"
      :pet="pet"
      @added="loadItems"
    />

    <DialogPetContactRemove
      v-model="dialogPetContactRemove"
      :contact="contact"
      @removed="loadItems"
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
import { search, more } from "@/api/pet/contacts";

import { toRefs, ref, watch } from "vue";

const props = defineProps({ pet: Object, readOnly: Boolean });

const propsRef = toRefs(props);
const { readOnly, pet } = propsRef;

const dialogContactView = ref(false);
const dialogPetContactAdd = ref(false);
const dialogPetContactRemove = ref(false);

const isLoading = ref(false);

const contacts = ref([]);
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

const moreHandler = async () => {
  try {
    isLoading.value = true;
    const result = await more(pet.value, params.value);
    contacts.value = [...contacts.value, ...result];
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
