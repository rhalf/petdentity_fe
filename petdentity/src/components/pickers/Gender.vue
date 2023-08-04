<template>
  <RadioGroup v-model="gender" inline>
    <Radio value="MALE" label="Male" />
    <Radio value="FEMALE" label="Female" />
  </RadioGroup>
</template>

<script setup>
import Radio from "@/components/common/Radio.vue";
import RadioGroup from "@/components/common/RadioGroup.vue";
import { computed, toRefs } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const gender = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
