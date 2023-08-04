<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Units Bulk Upload</Label>
          <Label subtitle class="text-grey"> Maximum of 100 units </Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <!-- <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
          /> -->
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-spacer />
        <v-col cols="auto">
          <Button @click="propertiesHandler">Properties</Button>
        </v-col>
        <v-col cols="auto">
          <Button @click="generateHandler">Generate</Button>
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            v-model:page="params.pageNumber"
            hover
            :loading="isLoading"
            :headers="headers"
            :items="units"
            :items-per-page="params.limitNumber"
            show-current-page
            withRemove
            withView
            @view="viewHandler"
            @remove="removeHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-spacer />
        <v-col cols="12" md="auto">
          <Button
            @click="uploadHandler"
            :loading="isLoading"
            :disabled="!units || !units.length"
            block
          >
            Upload
          </Button>
        </v-col>
      </v-row>
    </Sheet>
    <DialogUnitViewFromUpload
      v-model="dialogUnitViewFromUpload"
      v-model:unit="unit"
      disabled
    />
    <DialogUnitProperties v-model="dialogUnitProperties" v-model:unit="unit" />
    <DialogUnitGenerate
      v-model="dialogUnitGenerate"
      v-model:unit="unit"
      v-model:options="options"
      @generate="generateItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUnitProperties from "@/components/dialogs/unit/DialogUnitProperties.vue";
import DialogUnitGenerate from "@/components/dialogs/unit/DialogUnitGenerate.vue";
import DialogUnitViewFromUpload from "@/components/dialogs/unit/DialogUnitViewFromUpload.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { batchAdd } from "@/api/unit";

import { ref } from "vue";
import { computed } from "vue";

const dialogUnitProperties = ref(false);
const dialogUnitGenerate = ref(false);
const dialogUnitViewFromUpload = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref({
  unitType: "RFID",
  formType: "Microchip",
  status: "ENABLED",
});

const options = ref({
  uidStart: 990000000000000,
  uidEnd: 990000000000000,
});

const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
  pageNumber: 1,
});

const propertiesHandler = () => {
  dialogUnitProperties.value = true;
};

const generateHandler = () => {
  dialogUnitGenerate.value = true;
};

const generateItems = (items) => {
  units.value = items.value;
};

const viewHandler = async (item, index) => {
  unit.value = item;
  dialogUnitViewFromUpload.value = true;
};

const removeHandler = async (item, index) => {
  units.value.splice(index, 1);
};

const nextHandler = async () => {
  if (params.value.pageNumber < totalPage.value) params.value.pageNumber++;
};

const prevHandler = async () => {
  if (params.value.pageNumber > 1) params.value.pageNumber--;
};

const totalPage = computed(() => {
  if (!units.value) return 0;
  const result = units.value.length / params.value.limitNumber;
  return Math.ceil(result);
});

const uploadHandler = async () => {
  try {
    isLoading.value = true;
    const docRef = await batchAdd(units.value);
    show("success", "Added multple units!");
    units.value = [];
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
