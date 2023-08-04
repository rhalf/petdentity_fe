<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Properties Unit </Label>
      </v-card-title>
      <v-card-text>
        <FormUnit v-model="unit" :disabled-option="['uid', 'pet']" disabled />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
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
const props = defineProps({ modelValue: Boolean, unit: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:unit", "done"]);

const dialog = computed(useModel(propsRef, emit, "modelValue"));
const unit = computed(useModel(propsRef, emit, "unit"));

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
