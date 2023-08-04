<template>
  <v-avatar :size="size" class="elevation-5">
    <v-img :src="src" cover :lazy-src="lazy" />
  </v-avatar>
</template>

<script setup>
import AccountEmptyOwner from "@/assets/images/accounts/account-empty.png";
import AccountEmptyPet from "@/assets/images/pets/account-empty.png";

import { toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  size: { type: [String, Number], default: 50 },
  type: { type: String, default: "OWNER" },
});

const propsRef = toRefs(props);

const { type, size } = propsRef;

const src = computed(useModel(propsRef, emit, "modelValue"));

const lazy = computed(() => {
  if (type.value === "OWNER") return AccountEmptyOwner;
  if (type.value === "PET") return AccountEmptyPet;
});
</script>
