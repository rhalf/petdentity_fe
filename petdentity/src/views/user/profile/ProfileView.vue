<template>
  <v-container>
    <Sheet class="pa-8">
      <v-row dense>
        <v-col>
          <Label title class="text-primary">Profile</Label>
        </v-col>
      </v-row>

      <v-slide-x-transition hide-on-leave>
        <v-row dense>
          <v-col>
            <FormAccount v-model="userStore.user" @upload="uploadHandler" />
          </v-col>
        </v-row>
      </v-slide-x-transition>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";

import FormAccount from "@/components/forms/account/FormAccount.vue";

import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const uploadHandler = (url) => {
  userStore.setProfilePhoto(url);
};
</script>

<style></style>
