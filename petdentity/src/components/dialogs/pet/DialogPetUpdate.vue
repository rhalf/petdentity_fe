<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Update Pet </Label>
      </v-card-title>
      <v-card-text>
        <FormPet v-model="pet" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
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
import FormPet from "@/components/forms/pet/FormPet.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { update } from "@/api/pet";

import { useModel, syncProp } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({ modelValue: Boolean, pet: Object });
const propRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:pet", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const pet = computed(syncProp(propRef, emit, "pet"));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const docRef = await update(pet.value);
    emit("done");
    show("success", "Updated a pet!");
    dialog.value = false;
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
