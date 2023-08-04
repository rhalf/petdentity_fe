<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> View Animal</Label>
      </v-card-title>
      <v-card-text>
        <FormAnimal v-model="animal" :disabled="disabled" />

        <Card class="mt-4 pa-4" variant="tonal">
          <SummaryBreeds v-model="animal" />
        </Card>
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">
              {{ buttonLabel }}
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
import Dialog from "@/components/common/Dialog.vue";
import Card from "@/components/common/Card.vue";

import FormAnimal from "@/components/forms/animal/FormAnimal.vue";
import SummaryBreeds from "@/components/forms/breed/SummaryBreeds.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { update } from "@/api/animal";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean, animal: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:animal", "done"]);

const isLoading = ref(false);
const disabled = ref(true);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const animal = computed(useModel(propsRef, emit, "animal"));

const submitHandler = async () => {
  if (disabled.value) {
    disabled.value = false;
    return;
  } else {
    try {
      isLoading.value = true;
      const docRef = await update(animal.value);
      show("success", "Updated an animal!");
      dialog.value = false;
      emit("done");
      disabled.value = true;
    } catch ({ message }) {
      show("error", message);
    } finally {
      isLoading.value = false;
    }
  }
};

const buttonLabel = computed(() => {
  return disabled.value ? "Update" : "Save";
});

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
