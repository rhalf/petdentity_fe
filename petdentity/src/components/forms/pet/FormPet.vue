<template>
  <div>
    <Label class="text-primary"> Name </Label>
  </div>

  <div class="mt-2">
    <TextField v-model="pet.name" placeholder="Name" />
  </div>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Animal </Label>
      <Animal class="mt-2" v-model="pet.animal" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Breed </Label>
      <Breed class="mt-2" v-model="pet.breed" :animal="pet.animal" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Gender </Label>
      <Gender class="mt-2" v-model="pet.gender" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> BirthDate </Label>
      <Date class="mt-2" v-model="pet.birthDate" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Weight </Label>
      <TextField
        class="mt-2 text-end"
        type="number"
        v-model="pet.weight"
        suffix="kg(s)"
        withDecimal
      />
      <!-- prepend-inner-icon="mdi-weight-kilogram" -->
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Height </Label>
      <TextField
        class="mt-2"
        type="number"
        v-model="pet.height"
        suffix="cm(s)"
        withDecimal
      />
      <!-- prepend-inner-icon="mdi-human-male-height" -->
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Color1 </Label>
      <Sheet
        class="mt-2 py-6"
        :color="pet.color1 || '#FFFFFF'"
        @click="dialogColor1 = true"
      />
    </v-col>
    <v-col md="6">
      <Label class="text-primary"> Color2 </Label>
      <Sheet
        class="mt-2 py-6"
        :color="pet.color2 || '#FFFFFF'"
        @click="dialogColor2 = true"
      />
    </v-col>
  </v-row>

  <DialogColor v-model="dialogColor1" v-model:color="pet.color1" />
  <DialogColor v-model="dialogColor2" v-model:color="pet.color2" />
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import Gender from "@/components/pickers/Gender.vue";
import Date from "@/components/pickers/Date.vue";
import Animal from "@/components/pickers/Animal.vue";
import Breed from "@/components/pickers/Breed.vue";

import DialogColor from "@/components/dialogs/color/DialogColor.vue";

import { useModel } from "@/utils/vue";
import { ref, toRefs, computed, watch } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const pet = computed(useModel(propsRef, emit, "modelValue"));

const dialogColor1 = ref(false);
const dialogColor2 = ref(false);
</script>

<style></style>
