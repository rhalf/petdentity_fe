<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col>
          <Label title class="text-primary"> Profile </Label>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <ButtonIcon
            class="text-primary"
            icon="mdi-pencil"
            size="large"
            @click="dialogUserUpdate = true"
          />
        </v-col>
      </v-row>
    </Sheet>

    <v-slide-x-transition hide-on-leave>
      <v-row dense class="mt-5">
        <v-col>
          <FormUserView v-model="user" />
        </v-col>
      </v-row>
    </v-slide-x-transition>

    <DialogUserUpdate v-model="dialogUserUpdate" v-model:user="user" />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import FormUserView from "@/components/forms/user/FormUserView.vue";
import DialogUserUpdate from "@/components/dialogs/user/DialogUserUpdate.vue";

import { ref } from "vue";
const dialogUserUpdate = ref(false);

import { useUserStore } from "@/store/user";
const userStore = useUserStore();

import { storeToRefs } from "pinia";
const { user } = storeToRefs(userStore);
</script>

<style></style>
