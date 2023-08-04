<template>
  <Card
    class="rounded-0"
    :color="color"
    :height="item.height"
    :disabled="disabled"
    :to="item.to"
    v-show="item.visible"
    link
  >
    <v-row dense class="mt-6">
      <v-col class="text-center">
        <div>
          <v-icon class="text-h1">{{ item.icon }}</v-icon>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col class="text-center">
        <Label header uppercase medium class="mt-2">{{ item.title }}</Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col class="text-center">
        <Chip class="white" v-if="item.soon"> Coming Soon! </Chip>
        <div class="white" v-else>
          <Label v-if="!item.authorized" text> Unathorized </Label>
          <Label v-if="item.authorized" text> Click to proceed! </Label>
        </div>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup>
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import Chip from "@/components/common/Chip.vue";

import { toRefs, computed } from "vue";

const props = defineProps({ modelValue: Object });

const propsRef = toRefs(props);

const item = propsRef.modelValue;

const color = computed(() => {
  const { disabled, soon, authorized } = item.value;
  if (disabled) return "disabled";
  if (!authorized) return "secondary";
  return "primary";
});

const disabled = computed(() => {
  const { disabled, authorized } = item.value;
  const result = disabled || !authorized;
  return result;
});
</script>
