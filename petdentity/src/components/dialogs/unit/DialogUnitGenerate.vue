<template>
  <Dialog v-model="dialog" :width="480">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Generate </Label>
      </v-card-title>
      <v-card-text>
        <Label text class="text-primary"> UID (Starts At) </Label>
        <TextField
          v-model="options.uidStart"
          class="mt-2"
          type="number"
          counter
        />
        <!-- 990000010586524 -->
        <Label class="text-primary"> UID (Ends At) </Label>
        <TextField
          v-model="options.uidEnd"
          class="mt-2"
          type="number"
          counter
        />

        <Label class="text-primary text-center"> Total ({{ total }})</Label>
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="generateHandler"
              :loading="isLoading"
              :disabled="!(total > 0 && total <= 100)"
            >
              Generate
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
import TextField from "@/components/common/TextField.vue";
import Card from "@/components/common/Card.vue";

import { cloneDeep } from "lodash";
import { useModel } from "@/utils/vue";
import { ref, toRefs, computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  unit: Object,
  options: Object,
});
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "generate"]);

const dialog = computed(useModel(propsRef, emit, "modelValue"));
const unit = computed(useModel(propsRef, emit, "unit"));
const options = computed(useModel(propsRef, emit, "options"));

const units = ref([]);
const isLoading = ref(false);

const total = computed(() => {
  const start = Number(options.value.uidStart);
  const end = Number(options.value.uidEnd);

  const result = end - start + 1;
  return result;
});

function clamp(value, min, max) {
  return value > max ? max : value < min ? min : value;
}

const generateHandler = () => {
  const start = Number(options.value.uidStart);
  const end = Number(options.value.uidEnd);

  units.value = [];
  let uid;

  for (uid = start; uid <= end; uid++) {
    const item = cloneDeep(unit.value);
    units.value.push({ uid: String(uid), ...item });
  }

  emit("generate", units);
  dialog.value = false;
};

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
