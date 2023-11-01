<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Partners</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
            uppercase
          />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="partners"
            :items-per-page="params.limit"
            hide-default-footer
            withView
            withRemove
            withAdd
            @refresh="loadItems"
            @remove="removeHandler"
            @add="addHandler"
            @view="viewHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <DialogPartnerAdd v-model="dialogPartnerAdd" @added="loadItems" />
    <DialogPartnerView
      v-model="dialogPartnerView"
      v-model:partner="partner"
      @updated="loadItems"
    />
    <DialogPartnerRemove
      v-model="dialogPartnerRemove"
      v-model:partner="partner"
      @removed="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogPartnerRemove from "@/components/dialogs/partner/DialogPartnerRemove.vue";
import DialogPartnerView from "@/components/dialogs/partner/DialogPartnerView.vue";
import DialogPartnerAdd from "@/components/dialogs/partner/DialogPartnerAdd.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { search, next, prev } from "@/api/partner";

import { ref, onMounted } from "vue";

const dialogPartnerAdd = ref(false);
const dialogPartnerView = ref(false);
const dialogPartnerRemove = ref(false);

const isLoading = ref(false);
const partners = ref();
const partner = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = (item) => {
  partner.value = item;
  dialogPartnerView.value = true;
};

const addHandler = async () => {
  dialogPartnerAdd.value = true;
};

const removeHandler = async (item) => {
  partner.value = item;
  dialogPartnerRemove.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    partners.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    partners.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    partners.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
