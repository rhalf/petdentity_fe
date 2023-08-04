<template>
  <Form class="mt-4" ref="form">
    <Label text class="text-primary"> Name </Label>
    <TextField
      v-model="color.name"
      class="mt-2"
      placeholder="Enter color name here!"
      required
    />

    <Label text class="text-primary mt-4"> Color Combination </Label>

    <v-row
      dense
      class="mt-2"
      v-for="(item, index) in color.colors"
      :key="index"
    >
      <v-col>
        <Color v-model="color.colors[index]" />
      </v-col>
      <v-col cols="auto">
        <ButtonIcon
          icon="mdi-trash-can"
          color="red"
          @click="removeHandler(index)"
        />
      </v-col>
    </v-row>

    <Button class="mt-4" block @click="addHandler"> + Add </Button>
  </Form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import Color from "@/components/common/Color.vue";
import TextField from "@/components/common/TextField.vue";
import Form from "@/components/common/Form.vue";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const color = computed(useModel(propsRef, emit, "modelValue"));

const animal = computed(useModel(propsRef, emit, "animal"));

const form = ref();

const addHandler = () => {
  if (!color.value.colors) color.value.colors = [];

  color.value.colors.push("#FFFFFF");
};

const removeHandler = (index) => {
  if (!color.value.colors) return;
  if (!color.value.colors.length) return;

  color.value.colors.splice(index, 1);
};
</script>

<style></style>
