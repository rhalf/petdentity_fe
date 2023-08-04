<template>
  <div class="mt-2">
    <VirtualScroll
      :height="250"
      :items="breeds"
      class="bg-grey-darken-4 px-1 py-1"
    >
      <template v-slot:default="{ item, index }">
        <v-row
          dense
          :class="[
            index % 2 === 0 ? 'bg-amber-lighten-5' : 'bg-amber-lighten-4',
            'px-1',
          ]"
        >
          <v-col class="d-flex align-center">
            <Label text>{{ index + 1 }}. {{ item.name }}</Label>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <ButtonIcon
              icon="mdi-trash-can"
              class="text-red"
              @click="removeHandler(index)"
            />
          </v-col>
        </v-row>
      </template>
    </VirtualScroll>

    <v-row dense class="mt-3">
      <v-col>
        <TextField v-model="breed.name" placeholder="Enter breed here!" />
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col>
        <Button block @click="addHandler" :loading="isLoading">
          <v-icon>mdi-plus</v-icon>
          Add Breed
        </Button>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import TextField from "@/components/common/TextField.vue";
import VirtualScroll from "@/components/tables/VirtualScroll.vue";

import { search, create } from "@/api/breed";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { computed, toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const animal = computed(useModel(propsRef, emit, "modelValue"));

const isLoading = ref(false);
const breed = ref({});
const breeds = ref([]);

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 300,
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    breeds.value = await search(animal.value.id, params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const addHandler = async () => {
  try {
    isLoading.value = true;

    breed.value.animal = animal.value.id;

    const item = await create(breed.value);
    show("success", "Added a breed!");

    await loadItems();
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadItems();
});
</script>

<style></style>
