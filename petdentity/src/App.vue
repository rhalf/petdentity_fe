<template>
  <v-app>
    <ProgressLine
      :indeterminate="progressLine.status"
      :visible="progressLine.status"
    />
    <router-view />
    <Snackbar />
  </v-app>
</template>

<script setup>
import Snackbar from "@/components/common/Snackbar.vue";

import ProgressLine from "@/components/common/ProgressLine.vue";

import { useProgressLineStore } from "@/store/progress-line";
const progressLine = useProgressLineStore();
const { start, stop } = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { User } from "@/constants";

import { getCurrentUser } from "@/utils/firebase";
import { onMounted } from "vue";

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

onMounted(() => {
  loadUser();
});
</script>
