<template>
  <div>
    <v-virtual-scroll
      :height="240"
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
            <Label text>{{ index + 1 }}. {{ item }}</Label>
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
    </v-virtual-scroll>

    <v-row dense class="mt-3">
      <v-col>
        <TextField v-model="breed" placeholder="Enter breed here!" />
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col>
        <Button block @click="addHandler">
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

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { computed, toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Array,
});

const propsRef = toRefs(props);

const breed = ref();

const breeds = computed(useModel(propsRef, emit, "modelValue"));

const removeHandler = (index) => {
  breeds.value?.splice(index, 1);
};

const addHandler = () => {
  if (!breed.value) return;
  if (breeds.value?.includes(breed.value)) {
    show("error", `${breed.value} already exists!`);
    return;
  }

  breeds.value?.push(breed.value);
  breed.value = null;
};
</script>

<style></style>
