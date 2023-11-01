<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add Partner </Label>
      </v-card-title>
      <v-card-text>
        <FormPartner v-model="partner" v-model:form="form" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!partner.name || !form"
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

import FormPartner from "@/components/forms/partner/FormPartner.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { cloneDeep } from "lodash";

import { create } from "@/api/partner";

import { useModel } from "@/utils/vue";

import { Partner } from "@/constants";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "added"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const form = ref(false);

const partner = ref(cloneDeep(Partner));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await create(partner.value);
    show("success", "Added a partner!");
    emit("added");

    partner.value = cloneDeep(Partner);
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
