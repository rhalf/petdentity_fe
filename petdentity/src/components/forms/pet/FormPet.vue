<template>
  <div>
    <Label class="text-primary"> Name </Label>
  </div>

  <div class="mt-2">
    <TextField v-model="pet.name" placeholder="Name" :disabled="disabled" />
  </div>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Gender </Label>
      <Gender class="mt-2" v-model="pet.gender" :disabled="disabled" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> BirthDate </Label>
      <Date class="mt-2" v-model="pet.birthDate" :disabled="disabled" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Weight </Label>
      <TextField
        class="mt-2 text-end"
        type="number"
        v-model="pet.weight"
        placeholder="Weight"
        suffix="kg(s)"
        withDecimal
        :disabled="disabled"
      />
      <!-- prepend-inner-icon="mdi-weight-kilogram" -->
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Height </Label>
      <TextField
        class="mt-2"
        type="number"
        v-model="pet.height"
        placeholder="Height"
        suffix="cm(s)"
        withDecimal
        :disabled="disabled"
      />
      <!-- prepend-inner-icon="mdi-human-male-height" -->
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col md="6">
      <Label class="text-primary"> Animal </Label>
      <Animal class="mt-2" v-model="pet.animal" :disabled="disabled" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Breed </Label>
      <Breed
        class="mt-2"
        v-model="pet.breed"
        :animal="pet.animal"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Coat / Color </Label>
      <Coat class="mt-2" v-model="pet.coat" :disabled="disabled" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Coat Remarks </Label>
      <TextField
        class="mt-2"
        v-model="pet.coatRemarks"
        placeholder="Coat Remarks"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Privacy </Label>
      <Privacy class="mt-2" v-model="pet.privacy" :disabled="disabled" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Pet Status </Label>
      <PetStatus class="mt-2" v-model="pet.petStatus" :disabled="disabled" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import Gender from "@/components/pickers/Gender.vue";
import Date from "@/components/pickers/Date.vue";
import Animal from "@/components/pickers/Animal.vue";
import Breed from "@/components/pickers/Breed.vue";
import Coat from "@/components/pickers/Coat.vue";
import Privacy from "@/components/pickers/Privacy.vue";
import PetStatus from "@/components/pickers/PetStatus.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);
const pet = computed(useModel(propsRef, emit, "modelValue"));

// const clickHandler = async () => {
//   let fileUpload = document.getElementById("fileUpload");
//   if (fileUpload != null) await fileUpload.click();
// };

// const updateHandler = async (file) => {
//   console.log(file);
//   emit("uploadPhoto", file);
// };
</script>

<style></style>
