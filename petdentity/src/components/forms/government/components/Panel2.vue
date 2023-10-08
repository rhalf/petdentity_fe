<template>
  <Sheet v-if="government">
    <v-row dense>
      <v-col>
        <div class="mt-2">
          <Label text class="text-primary">ID</Label>
          <Label text class="mt-2">{{ government.id }}</Label>
        </div>

        <div class="mt-2">
          <Label text class="text-primary">Level</Label>
          <Label text class="mt-2">{{ government.level }}</Label>
        </div>
      </v-col>
      <v-col>
        <div class="mt-2">
          <Label text class="text-primary">Email</Label>
          <Label text class="mt-2">{{ government.email }}</Label>
        </div>

        <div class="mt-2">
          <Label text class="text-primary">Mobile</Label>
          <Label text class="mt-2">{{ government.mobile }}</Label>
        </div>
      </v-col>
    </v-row>
  </Sheet>
</template>
<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
// import Chip from "@/components/common/Chip.vue";
import Avatar from "@/components/common/Avatar.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const government = computed(useModel(propsRef, emit, "modelValue"));
</script>
