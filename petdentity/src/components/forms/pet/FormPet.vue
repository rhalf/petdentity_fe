<template>
  <div v-if="withPhoto">
    <FileInput
      id="fileUpload"
      v-show="false"
      @update:modelValue="updateHandler"
    />

    <v-row dense class="mt-4">
      <v-col cols="12" class="text-center">
        <Avatar v-model="pet.photoUrl" :size="200" type="PET" />
      </v-col>
    </v-row>

    <v-row dense v-if="!disabled">
      <v-col cols="12" class="text-right">
        <ButtonIcon
          icon="mdi-pencil"
          variant="flat"
          color="primary"
          @click="clickHandler"
        />
      </v-col>
    </v-row>
  </div>
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
      <Label class="text-primary"> Coat </Label>
      <Coat class="mt-2" v-model="pet.coat" :disabled="disabled" />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Privacy </Label>
      <Privacy class="mt-2" v-model="pet.privacy" :disabled="disabled" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Condition </Label>
      <Condition class="mt-2" v-model="pet.condition" :disabled="disabled" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import Avatar from "@/components/common/Avatar.vue";
import FileInput from "@/components/common/FileInput.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import Gender from "@/components/pickers/Gender.vue";
import Date from "@/components/pickers/Date.vue";
import Animal from "@/components/pickers/Animal.vue";
import Breed from "@/components/pickers/Breed.vue";
import Coat from "@/components/pickers/Coat.vue";
import Privacy from "@/components/pickers/Privacy.vue";
import Condition from "@/components/pickers/Condition.vue";

import { uploadPetProfile } from "@/api/photo";

import { useModel } from "@/utils/vue";
import { ref, toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
  withPhoto: Boolean,
  disabled: Boolean,
});

const isLoading = ref(false);
const propsRef = toRefs(props);
const { withPhoto } = propsRef;
const pet = computed(useModel(propsRef, emit, "modelValue"));

const clickHandler = async () => {
  let fileUpload = document.getElementById("fileUpload");
  if (fileUpload != null) await fileUpload.click();
};

const updateHandler = async (file) => {
  try {
    isLoading.value = true;
    pet.value.photoUrl = await uploadPetProfile(pet.value.id, file);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
