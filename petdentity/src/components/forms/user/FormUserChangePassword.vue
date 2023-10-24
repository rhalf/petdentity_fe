<template>
  <v-form v-model="form" @submit.prevent validate-on="input">
    <v-row dense>
      <v-col>
        <Label class="text-primary"> Enter Password </Label>
        <TextField
          class="mt-2"
          v-model="passwordA"
          :type="visibleA ? 'text' : 'password'"
          :rules="[validation.minimum(passwordA, 8, 'password')]"
          :append-inner-icon="visibleA ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visibleA = !visibleA"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <Label class="text-primary"> Re-enter Password </Label>
        <TextField
          class="mt-2"
          v-model="passwordB"
          :type="visibleB ? 'text' : 'password'"
          :rules="[validation.match(passwordA, passwordB, 'password')]"
          :append-inner-icon="visibleB ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visibleB = !visibleB"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import validation from "@/utils/validation";

import { toRefs, computed, ref } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue", "update:form"]);
const props = defineProps({
  modelValue: String,
  form: Boolean,
});

const propsRef = toRefs(props);
const form = computed(useModel(propsRef, emit, "form"));
const passwordA = computed(useModel(propsRef, emit, "modelValue"));
const passwordB = ref();

const visibleA = ref(false);
const visibleB = ref(false);
</script>

<style></style>
