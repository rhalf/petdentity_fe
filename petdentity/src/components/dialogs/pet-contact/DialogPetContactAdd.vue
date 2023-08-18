<template>
  <Dialog v-model="dialog" :width="640">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add Contact</Label>
      </v-card-title>
      <v-card-text>
        <Contact v-model="contact" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
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
import Contact from "@/components/pickers/Contact.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useModel } from "@/utils/vue";

import { create } from "@/api/pet-contacts";

import _ from "lodash";
import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean, pet: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const contact = ref();
const { pet } = propsRef;

const submitHandler = async () => {
  try {
    isLoading.value = true;

    const newContact = { ...contact.value, pet: pet.value.id };
    await create(newContact);

    emit("done");
    show("success", "Added a contact!");
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
