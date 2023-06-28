<template>
  <v-dialog v-bind="properties" :fullscreen="fullscreen">
    <slot></slot>
  </v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();

import { computed } from "vue";
import { toRefs } from "vue";

const props = defineProps({ expand: Boolean });
const { expand } = toRefs(props);

const properties = {
  class: "text-primary",
  persistent: true,
};

const fullscreen = computed(() => {
  return expand.value && mobile.value;
});
</script>
