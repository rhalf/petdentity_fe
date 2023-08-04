<template>
  <v-container>
    <Sheet class="bg-transparent">
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
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Module from "./components/module/Module.vue";

import { UserGroups } from "@/constants";
const { OWNER, VETERINARIAN, ADMIN, GOVERNMENT } = UserGroups;

import { storeToRefs } from "pinia";
import { computed, watch, ref } from "vue";

import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

import { dashboardItems } from "./data";

const items = ref();

const load = ({ roles }) => {
  return dashboardItems.map((item) => {
    return {
      ...item,
      authorized: isAuthorized(roles, item.roles),
    };
  });
};

const isAuthorized = (userRoles, roles) => {
  let result = false;
  userRoles.forEach((role) => {
    if (roles.includes(role)) result = true;
  });
  return result;
};

watch(
  user,
  async (current) => {
    if (!current) return;

    items.value = await load(current);
  },
  { immediate: true, deep: true }
);
</script>
