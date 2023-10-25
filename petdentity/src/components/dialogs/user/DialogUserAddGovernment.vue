<template>
  <Dialog v-model="dialog" :width="640" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add User To Government </Label>
      </v-card-title>
      <v-card-text>
        <Email v-model="user" />
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
import Email from "@/components/pickers/Email.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { add } from "@/api/government/users";

import { useModel } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({
  modelValue: Boolean,
  government: Object,
});
const propRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:government", "added"]);

const isLoading = ref(false);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const government = computed(useModel(propRef, emit, "government"));
const user = ref();

const submitHandler = async () => {
  try {
    isLoading.value = true;

    await add(government.value, user.value);
    emit("added");
    show("success", "Added a user!");
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
