<template>
  <Dialog v-model="dialog" :width="480" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Change Password </Label>
      </v-card-title>
      <v-card-text>
        <FormUserChangePassword v-model="password" v-model:form="form" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!form"
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
import FormUserChangePassword from "@/components/forms/user/FormUserChangePassword.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { updatePassword } from "@/api/session";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "changed"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const password = ref(null);
const form = ref(false);

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await updatePassword(password.value);
    emit("changed");
    show("success", "Changed a password!");
    password.value = null;
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
