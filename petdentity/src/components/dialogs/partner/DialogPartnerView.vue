<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> View Partner </Label>
      </v-card-title>
      <v-card-text>
        <FormPartner v-model="partner" :disabled="disabled" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :loading="isLoading"
              v-if="!readOnly"
            >
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
import FormPartner from "@/components/forms/partner/FormPartner.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { cloneDeep } from "lodash";
import { update } from "@/api/partner";
import { useModel } from "@/utils/vue";

import { ref, computed, toRefs, watchEffect } from "vue";
const props = defineProps({
  modelValue: Boolean,
  partner: Object,
  readOnly: Boolean,
});
const propRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:partner", "updated"]);

const isLoading = ref(false);
const disabled = ref(true);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const item = computed(useModel(propRef, emit, "partner"));

const partner = ref();

watchEffect(() => {
  if (dialog.value) partner.value = cloneDeep(item.value);
});

const submitHandler = async () => {
  if (disabled.value) {
    disabled.value = false;
    return;
  }

  try {
    isLoading.value = true;
    await update(partner.value);
    show("success", "Updated a partner!");
    dialog.value = false;
    emit("updated");
    disabled.value = true;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
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
