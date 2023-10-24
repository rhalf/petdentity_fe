<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Update Coat </Label>
      </v-card-title>
      <v-card-text>
        <Label text class="text-primary">Coat</Label>

        <TextField
          v-model="coat.name"
          class="mt-3"
          placeholder="Enter coat here!"
          uppercase
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!coat.name"
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
import { update } from "@/api/coat";
import { useModel } from "@/utils/vue";

import { ref, toRefs, computed, watchEffect } from "vue";

const props = defineProps({
  modelValue: Boolean,
  coat: Object,
});

const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "updated"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const item = computed(useModel(propsRef, emit, "coat"));

const coat = ref();

watchEffect(() => {
  if (dialog.value) coat.value = cloneDeep(item.value);
});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await update(coat.value);
    emit("updated");
    show("success", "Added an coat!");
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
