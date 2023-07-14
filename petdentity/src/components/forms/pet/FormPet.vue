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

    <v-row dense>
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
    <v-col cols="12" md="6">
      <Label class="text-primary"> Color1 </Label>
      <Sheet
        class="mt-2 py-6"
        :color="pet.color1 || '#FFFFFF'"
        @click="dialogColor1 = true"
      />
    </v-col>
    <v-col cols="12" md="6">
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

import Avatar from "@/components/common/Avatar.vue";
import FileInput from "@/components/common/FileInput.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import Gender from "@/components/pickers/Gender.vue";
import Date from "@/components/pickers/Date.vue";
import Animal from "@/components/pickers/Animal.vue";
import Breed from "@/components/pickers/Breed.vue";

import DialogColor from "@/components/dialogs/color/DialogColor.vue";

import { uploadPetProfile } from "@/api/photo";

import { useModel } from "@/utils/vue";
import { ref, toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
  withPhoto: Boolean,
});

const isLoading = ref(false);
const propsRef = toRefs(props);
const { withPhoto } = propsRef;
const pet = computed(useModel(propsRef, emit, "modelValue"));

const dialogColor1 = ref(false);
const dialogColor2 = ref(false);

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
