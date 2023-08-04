<template>
  <v-sheet height="200" class="bg-amber-lighten-3">
    <v-img :src="Wave" cover :aspectRatio="14 / 9"></v-img>
  </v-sheet>
  <v-row dense v-if="pet">
    <v-col class="text-center">
      <div class="overlapPhoto">
        <Avatar v-model="pet.photoUrl" :size="200" type="PET" />

        <ButtonIcon
          icon="mdi-pencil"
          variant="flat"
          color="primary"
          @click="updatePhotoHandler"
          class="overlapButton elevation-10"
          :loading="isLoading"
          v-if="!readOnly"
        />

        <FileInput
          id="fileUpload"
          v-show="false"
          @update:modelValue="uploadPhotoHandler"
        />
        <Label class="mt-4" header>{{ pet.name }}</Label>
        <Label class="text-grey" text>{{ pet.id }}</Label>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";

import Avatar from "@/components/common/Avatar.vue";
import FileInput from "@/components/common/FileInput.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import Wave from "./wave.svg";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { uploadPetProfile } from "@/api/photo";
import { update } from "@/api/pet";

import { toRefs, ref } from "vue";

const emit = defineEmits(["done"]);
const props = defineProps({ readOnly: Boolean, pet: Object });

const propsRef = toRefs(props);
const { readOnly, pet } = propsRef;

const isLoading = ref(false);

const updatePhotoHandler = async () => {
  let fileUpload = document.getElementById("fileUpload");
  if (fileUpload != null) await fileUpload.click();
};

const uploadPhotoHandler = async (file) => {
  try {
    isLoading.value = true;
    pet.value.photoUrl = await uploadPetProfile(pet.value.id, file);
    const docRef = await update(pet.value);
    emit("done");
    show("success", "Uploaded a photo!");
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -120px;
  height: 160px;
}
.overlapButton {
  position: absolute;
  top: 160px;
  margin-left: -50px;
}

/* .gradient {
    background: rgb(255, 193, 7);
    background: linear-gradient(
      180deg,
      rgba(255, 193, 7, 1) 10%,
      rgba(139, 104, 0, 1) 50%,
      rgba(255, 193, 7, 1) 90%
    );
  } */
</style>
