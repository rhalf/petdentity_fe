<template>
  <div>
    <v-row dense>
      <v-col align="end">
        <Button
          v-if="label || icon"
          variant="flat"
          class="rounded-0 rounded-t-lg"
          width="150"
          @click="emit('click')"
        >
          <v-icon v-if="icon">{{ icon }}</v-icon>
          <div v-if="label" class="px-2">{{ label }}</div>
        </Button>
      </v-col>
    </v-row>
    <div class="bg-primary pt-1" />
    <Sheet class="rounded-0 bg-grey-darken-4 text-left" :min-height="minHeight">
      <slot />
    </Sheet>
  </div>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import Sheet from "@/components/common/Sheet.vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  title: String,
  label: String,
  icon: String,
  minHeight: {
    type: [Number, String],
    default: 100,
  },
});
</script>

<style scoped></style>
