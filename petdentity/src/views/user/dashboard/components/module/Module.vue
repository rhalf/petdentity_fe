<template>
  <Card
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
          <Label v-if="item.unauthorized" text> Unathorized </Label>
          <Label v-if="!item.unauthorized" text> Click to proceed! </Label>
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
  const { disabled, soon, unauthorized } = item.value;
  if (disabled) return "disabled";
  if (unauthorized) return "secondary";
  return "primary";
});

const disabled = computed(() => {
  const { disabled, unauthorized } = item.value;
  const result = disabled || unauthorized;
  return result;
});
</script>
