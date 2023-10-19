<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> View Unit </Label>
      </v-card-title>
      <v-card-text>
        <FormUnit
          v-model="unit"
          :disabled="disabled"
          :option="['applicationDate']"
        />
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
import FormUnit from "@/components/forms/unit/FormUnit.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { update } from "@/api/unit";

import { useModel } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({
  modelValue: Boolean,
  unit: Object,
  readOnly: Boolean,
});
const propRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:unit", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const unit = computed(useModel(propRef, emit, "unit"));
const disabled = ref(false);

const submitHandler = async () => {
  if (disabled.value) {
    disabled.value = false;
    return;
  }

  try {
    isLoading.value = true;
    const docRef = await update(unit.value);
    emit("done");
    show("success", "Updated an unit!");
    dialog.value = false;
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
