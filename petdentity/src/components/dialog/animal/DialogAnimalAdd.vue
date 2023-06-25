<template>
  <Dialog :width="1024">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black">
          <v-icon>mdi-plus</v-icon>
          Add
        </Label>
      </v-card-title>
      <v-card-text>
        <FormAnimal v-model="animal" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler">Submit</Button>
          </v-col>
          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">Close</Button>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
  </Dialog>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import Label from "@/components/common/Label.vue";
import Dialog from "@/components/common/Dialog.vue";
import FormAnimal from "@/components/forms/animal/FormAnimal.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { create } from "@/api/animal";

const props = defineProps({ name: Object });
const emit = defineEmits(["update:modelValue"]);

import { ref } from "vue";
const animal = ref({
  name: "Dog",
  type: "Mammal",
  breeds: [
    "Dobermann",
    "Shih Tzu ",
    "German Shepherd",
    "Siberian Husky",
    "Golden Retriever",
    "Labrador Retriever",
  ],
});

const submitHandler = async () => {
  try {
    const docRef = await create(animal.value);
    show("success", "Added an animal!");
  } catch ({ message }) {
    show("error", message);
  } finally {
    emit("update:modelValue", false);
  }
};

const closeHandler = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
