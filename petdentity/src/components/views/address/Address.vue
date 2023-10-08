<template>
  <Label text>
    {{ address.exact || "-" }}
    {{ address.division || "-" }}
  </Label>
  <Label caption class="text-grey">
    {{ address.barangay || "-" }}, {{ address.city || "-" }},
    {{ address.province || "-" }}, {{ address.region || "-" }},
    {{ address.state || "-" }}, {{ address.country || "-" }},
    {{ address.zipcode || "-" }}
  </Label>
</template>
<script setup>
import Label from "@/components/common/Label.vue";

import { toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});
const propsRef = toRefs(props);
const address = computed(useModel(propsRef, emit, "modelValue"));
</script>
