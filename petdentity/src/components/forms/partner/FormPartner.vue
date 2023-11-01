<template>
  <v-form v-model="form" validate-on="input" v-if="partner">
    <v-row dense>
      <v-col>
        <Label class="text-primary"> Name </Label>
        <TextField
          class="mt-2"
          v-model="partner.name"
          placeholder="Name"
          :disabled="disabled"
          uppercase
          :rules="[validation.required]"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="6">
        <Label class="text-primary"> Link </Label>
        <TextField
          class="mt-2"
          v-model="partner.link"
          placeholder="Link"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="6">
        <Label class="text-primary"> Privacy </Label>
        <Privacy class="mt-2" v-model="partner.privacy" :disabled="disabled" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Image from "@/components/common/Image.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import FileInput from "@/components/common/FileInput.vue";

import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import Privacy from "@/components/pickers/Privacy.vue";

import ImageEmpty from "@/assets/images/pets/account-empty.png";

import validation from "@/utils/validation";

import { useModel } from "@/utils/vue";
import { toRefs, computed, ref } from "vue";

const emit = defineEmits(["update:modelValue", "update:form"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
  form: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;

const isLoading = ref(false);
const readOnly = ref(false);

const partner = computed(useModel(propsRef, emit, "modelValue"));
const form = computed(useModel(propsRef, emit, "form"));
</script>

<style scoped></style>
