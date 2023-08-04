<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> View Contact </Label>
      </v-card-title>
      <v-card-text>
        <FormContact v-model="contact" :disabled="disabled" />
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
import FormContact from "@/components/forms/contact/FormContact.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { update } from "@/api/contact";

import { useModel, syncProp } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({
  modelValue: Boolean,
  contact: Object,
  readOnly: Boolean,
});
const emit = defineEmits(["update:modelValue", "update:contact", "done"]);

const propRef = toRefs(props);

const { readOnly } = propRef;

const isLoading = ref(false);
const disabled = ref(true);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const contact = computed(syncProp(propRef, emit, "contact"));

const submitHandler = async () => {
  if (disabled.value) {
    disabled.value = false;
    return;
  } else {
    try {
      isLoading.value = true;
      const docRef = await update(contact.value);
      emit("done");
      show("success", "Updated an contact!");
      dialog.value = false;
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
