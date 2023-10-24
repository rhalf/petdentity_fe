<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Update Breed </Label>
      </v-card-title>
      <v-card-text>
        <Label text class="text-primary">Breed</Label>

        <TextField
          v-model="breed.name"
          class="mt-3"
          placeholder="Enter breed here!"
          @update:modelValue="updateModelHandler"
          uppercase
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!breed.name"
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

import { cloneDeep } from "lodash";
import { update } from "@/api/breed";
import { useModel } from "@/utils/vue";

import { ref, toRefs, computed, watchEffect } from "vue";
const props = defineProps({
  modelValue: Boolean,
  breed: Object,
});
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:breed", "updated"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const item = computed(useModel(propsRef, emit, "breed"));

const breed = ref();

watchEffect(() => {
  if (dialog.value) breed.value = cloneDeep(item.value);
});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await update(breed.value);
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

const updateModelHandler = () => {
  breed.value.name = breed.value.name.toUpperCase();
};
</script>

<style></style>
