<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Update Breed </Label>
      </v-card-title>
      <v-card-text>
        <Label text class="text-primary">Breed</Label>

        <TextField
          v-model="model.name"
          class="mt-3"
          placeholder="Enter breed here!"
          uppercase
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!model.name"
              :loading="isLoading"
            >
              Submit
            </Button>
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
import TextField from "@/components/common/TextField.vue";
import Dialog from "@/components/common/Dialog.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { update } from "@/api/animal/breeds";
import { useModel } from "@/utils/vue";

import { ref, toRefs, computed, watchEffect } from "vue";
const props = defineProps({
  modelValue: Boolean,
  breed: Object,
  animal: Object,
});

const propsRef = toRefs(props);

const isLoading = ref(false);

const emit = defineEmits(["update:modelValue", "updated"]);
const dialog = computed(useModel(propsRef, emit, "modelValue"));

const { breed, animal } = propsRef;

const model = ref();

watchEffect(() => {
  model.value = breed.value;
});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await update(animal.value, model.value);
    emit("updated");
    show("success", "Added an breed!");
    closeHandler();
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
