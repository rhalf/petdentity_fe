<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary"> Units Bulk Upload</Label>
          <Label subtitle class="text-grey">
            Maximum of {{ MAX_UNIT }} units
          </Label>
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
            hover
            :loading="isLoading"
            :headers="headers"
            :items="units"
            :items-per-page="params.itemsPerPage"
            show-current-page
            withRemove
            withView
            withMore
            @view="viewHandler"
            @remove="removeHandler"
            @more="moreHandler"
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
      @generated="generateItems"
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

const dialogUnitProperties = ref(false);
const dialogUnitGenerate = ref(false);
const dialogUnitViewFromUpload = ref(false);

const MAX_UNIT = 500;
const isLoading = ref(false);
const units = ref([]);
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
  itemsPerPage: 5,
});

const propertiesHandler = () => {
  dialogUnitProperties.value = true;
};

const generateHandler = () => {
  dialogUnitGenerate.value = true;
};

const generateItems = (items) => {
  units.value = items.value;
  params.value.itemsPerPage = 5;
};

const viewHandler = async (item, index) => {
  unit.value = item;
  dialogUnitViewFromUpload.value = true;
};

const removeHandler = async (item, index) => {
  units.value.splice(index, 1);
};

const moreHandler = async () => {
  params.value.itemsPerPage += 5;
};

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
