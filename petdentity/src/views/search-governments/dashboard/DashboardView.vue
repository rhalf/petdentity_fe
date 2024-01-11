<template>
  <v-container>
    <Sheet>
      <v-row>
        <v-col cols="12" md="" align="start">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            @keypress="keypressHandler"
            placeholder="Search"
            uppercase
          />
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          align="start"
          v-for="(government, index) in governments"
          :key="index"
        >
          <GovernmentItem v-model="governments[index]" />
        </v-col>
      </v-row>

      <v-row dense class="mt-4">
        <v-col cols="3" md="auto">
          <Button @click="prevHandler" block>
            <v-icon>mdi-skip-previous</v-icon>
          </Button>
        </v-col>
        <v-col cols="3" md="auto">
          <Button @click="submitHandler" block>
            <v-icon>mdi-refresh</v-icon>
          </Button>
        </v-col>
        <v-col cols="3" md="auto">
          <Button @click="nextHandler" block>
            <v-icon>mdi-skip-next</v-icon>
          </Button>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import Button from "@/components/common/Button.vue";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import GovernmentItem from "./components/GovernmentItem.vue";

import { debounce } from "lodash";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { search, next, prev } from "@/api/government";

import { ref, onMounted } from "vue";

const governments = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 6,
});

const keypressHandler = debounce(() => {
  submitHandler();
}, 1000);

const getItems = async () => {
  try {
    start();
    governments.value = await search(params.value);
  } catch ({ message }) {
    console.log(message);
  } finally {
    stop();
  }
};

onMounted(() => {
  getItems();
});

const submitHandler = async () => {
  try {
    start();
    governments.value = await search(params.value);
  } catch ({ message }) {
    console.log(message);
  } finally {
    stop();
  }
};

const nextHandler = async () => {
  try {
    start();
    governments.value = await next(params.value);
  } catch ({ message }) {
    console.log(message);
  } finally {
    stop();
  }
};

const prevHandler = async () => {
  try {
    start();
    governments.value = await prev(params.value);
  } catch ({ message }) {
    console.log(message);
  } finally {
    stop();
  }
};
</script>
