<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <Logo :width="45" :aspect-ratio="1" position="solo" />
    </template>

    <template v-slot:title>
      <Label header medium> PETDENTITY </Label>
    </template>

    <template v-slot:append>
      <ButtonIcon icon="mdi-account" size="large" id="menu-account" />
      <v-menu activator="#menu-account">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="item.handler">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <ButtonIcon
        icon="mdi-home"
        size="large"
        :to="{ name: 'UserDashboard' }"
      />
    </template>
  </v-app-bar>

  <DialogUserPasswordChange />
</template>

<script setup>
import Logo from "@/components/common/Logo.vue";
import Label from "@/components/common/Label.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import DialogUserPasswordChange from "@/components/dialogs/user/DialogUserPasswordChange.vue";

import { signOut } from "@/api/session.js";

import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const dialogUserPasswordChange = ref(false);

const items = [
  {
    title: "Profile",
    handler: async () => {
      router.push({ name: "UserProfileView" });
    },
  },
  {
    title: "Change Password",
    handler: async () => {
      dialogUserPasswordChange.value = true;
    },
  },
  {
    title: "Logout",
    handler: async () => {
      await signOut();
      await router.go();
    },
  },
];
</script>

<style></style>
