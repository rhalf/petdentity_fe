<template>
  <div id="progress-line" />
  <v-app>
    <router-view v-slot="{ Component }">
      <!-- <v-fade-transition> -->
      <component :is="Component" />
      <!-- </v-fade-transition> -->
    </router-view>

    <ProgressLine />
    <Snackbar />
  </v-app>
</template>

<script setup>
import Snackbar from "@/components/common/Snackbar.vue";

import ProgressLine from "@/components/common/ProgressLine.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { User } from "@/constants";

import { getCurrentUser } from "@/utils/firebase";

import { get, create } from "@/api/user";

import { useRouter } from "vue-router";
const router = useRouter();

import { useUserStore } from "@/store/user";
const user = useUserStore();

const loadUser = async () => {
  try {
    start();
    const authUser = await getCurrentUser();

    if (!authUser) return;

    const result = await get(authUser.uid);

    if (result === null) {
      const user = _.cloneDeep(User);
      user.id = authUser.uid;
      user.email = authUser.email;
      user.emailVerified = authUser.emailVerified;

      await create(user);
      show("success", "created a user");

      setTimeout(() => {
        router.go();
      }, 1000);
    } else {
      user.set(result);
    }
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
};

import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await loadUser();
    console.log("signedIn");
  } else {
    console.log("signedOut");
  }
});
</script>
