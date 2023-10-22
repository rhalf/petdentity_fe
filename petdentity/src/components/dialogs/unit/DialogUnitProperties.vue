<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Properties Unit </Label>
      </v-card-title>
      <v-card-text>
        <FormUnit
          v-model="unit"
          :disabled="disabled"
          :option="[
            'unitType',
            'formType',
            'status',
            'applicationDate',
            'owner',
            'veterinarian',
            'government',
          ]"
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

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
  unit: Object,
  readOnly: Boolean,
});
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:unit", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const unit = computed(useModel(propsRef, emit, "unit"));
const disabled = ref(true);

const submitHandler = async () => {
  if (disabled.value) {
    disabled.value = false;
  } else {
    disabled.value = true;
    closeHandler();
  }
};

const closeHandler = () => {
  dialog.value = false;
};

const buttonLabel = computed(() => {
  return disabled.value ? "Update" : "Save";
});
</script>

<style></style>
