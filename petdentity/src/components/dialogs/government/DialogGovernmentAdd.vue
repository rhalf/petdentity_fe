<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add Government </Label>
      </v-card-title>
      <v-card-text>
        <FormGovernment v-model="government" v-model:form="form" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!government.name || !form"
              :loading="isLoading"
              >Submit</Button
            >
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

import FormGovernment from "@/components/forms/government/FormGovernment.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { cloneDeep } from "lodash";

import { Address } from "@/constants";

import { create } from "@/api/government";

import { useModel } from "@/utils/vue";

import { Government } from "@/constants";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "remove"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const form = ref(false);

const government = ref(cloneDeep(Government));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await create(government.value);
    show("success", "Added a government!");
    emit("remove");
    government.value = {};
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
