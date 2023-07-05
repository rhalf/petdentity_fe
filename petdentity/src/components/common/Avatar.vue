<template>
  <v-avatar v-bind="properties" @click="emit('click')">
    <v-img :src="image" cover :lazy-src="AccountEmpty" />
  </v-avatar>
</template>

<script setup>
import { computed } from "vue";

import AccountEmpty from "@/assets/images/accounts/account-empty.png";

const properties = {
  class: "text-body-1 text-primary pointer",
};

const emit = defineEmits(["click"]);
const props = defineProps({ src: String, alt: String, textClass: String });

const image = computed(() => {
  if (props.src === null) return AccountEmpty;
  else return props.src;
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
