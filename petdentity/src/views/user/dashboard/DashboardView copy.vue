<template>
  <v-container class="mt-5">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
        v-for="(item, index) in items"
        :key="index"
      >
        <Module v-model="items[index]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Module from "./components/module/Module.vue";

import { UserGroups } from "@/constants";
const { OWNER, VETERINARIAN, ADMIN, GOVERNMENT } = UserGroups;

import { useUserStore } from "@/store/user";
const user = useUserStore();

import { dashboardItems } from "./data";

import { computed, ref } from "vue";

const dashboardItemsRef = ref(dashboardItems);

const items = computed(() => {
  return dashboardItemsRef.value.map((item) => {
    item.unauthorized = true;

    user.getRoles?.forEach((role) => {
      const state = item.roles.includes(role);
      if (state) item.unauthorized = false;
    });

    return item;
  });
});
</script>
