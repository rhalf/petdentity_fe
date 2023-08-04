<template>
  <div>
    <Card
      class="pa-2"
      :color="color"
      @click="clickHandler"
      variant="flat"
      color="primary "
    >
      <Label text>{{ color }}</Label>
    </Card>
    <DialogColor v-model="dialogColor" v-model:color="color" />
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Card from "@/components/common/Card.vue";
import DialogColor from "@/components/dialogs/color/DialogColor.vue";

import { toRefs, computed, ref } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: String, default: "#FFFFFF" },
  disabled: Boolean,
});
const propsRef = toRefs(props);
const color = computed(useModel(propsRef, emit, "modelValue"));

const { disabled } = propsRef;
const dialogColor = ref(false);

const clickHandler = () => {
  if (disabled.value) return;
  dialogColor.value = true;
};
</script>
