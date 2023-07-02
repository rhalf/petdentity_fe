<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col>
          <Label title class="text-primary"> Profile </Label>
        </v-col>
      </v-row>

      <v-slide-x-transition hide-on-leave>
        <v-row dense class="mt-5">
          <v-col>
            <FormUser v-model="user" />
          </v-col>
        </v-row>
      </v-slide-x-transition>

      <v-row dense class="mt-5">
        <v-col cols="auto">
          <Button @click="updateHandler" :loading="isLoading">Update</Button>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <Button variant="outlined">Cancel</Button>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";

import FormUser from "@/components/forms/user/FormUser.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useUserStore } from "@/store/user";
const userStore = useUserStore();

import { storeToRefs } from "pinia";
const { user } = storeToRefs(userStore);

import { update } from "@/api/user";

const isLoading = ref(false);

const updateHandler = async () => {
  try {
    isLoading.value = true;
    await update(user.value);
    show("success", "Saved successfully!");
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
