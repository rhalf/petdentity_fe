<template>
  <v-sheet v-if="government">
    <div>
      <Image :src="image" :lazy-src="image" cover :aspectRatio="18 / 6">
        <div class="overlapButton">
          <ButtonIcon
            icon="mdi-pencil"
            variant="flat"
            color="primary"
            @click="updatePhotoHandler"
            class="elevation-10"
            :loading="isLoading"
            v-if="!readOnly"
          />

          <FileInput
            id="fileUpload"
            v-show="false"
            @update:modelValue="uploadPhotoHandler"
          />
        </div>
      </Image>
    </div>

    <div class="bg-primary pa-4">
      <v-row dense>
        <v-col class="text-left">
          <Label medium header>{{ government.name }}</Label>
          <Label medium>{{ government.description }}</Label>
          <Label caption>1M Likes</Label>
        </v-col>

        <v-col cols="auto">
          <Button variant="outlined" color="black" readonly>
            <v-icon class="mr-2">mdi-thumb-up</v-icon>
            Like
          </Button>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script setup>
import Label from "@/components/common/Label.vue";

import Image from "@/components/common/Image.vue";
import FileInput from "@/components/common/FileInput.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import Button from "@/components/common/Button.vue";

import Wave from "./wave.svg";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { uploadGovernmentProfile } from "@/api/photo";
import { update } from "@/api/government";

import { toRefs, ref, computed } from "vue";

const emit = defineEmits(["done"]);
const props = defineProps({ readOnly: Boolean, government: Object });

const propsRef = toRefs(props);
const { readOnly, government } = propsRef;

const isLoading = ref(false);

const updatePhotoHandler = async () => {
  let fileUpload = document.getElementById("fileUpload");
  if (fileUpload != null) await fileUpload.click();
};

const uploadPhotoHandler = async (file) => {
  try {
    isLoading.value = true;
    government.value.photoUrl = await uploadGovernmentProfile(
      government.value.id,
      file
    );
    const docRef = await update(government.value);
    emit("done");
    show("success", "Uploaded a photo!");
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const image = computed(() => {
  if (government.value.photoUrl) return government.value.photoUrl;
  else return Wave;
});
</script>

<style scoped>
/* .overlapPhoto {
  position: absolute;
  top: 20px;
  left: 20px;
} */

.overlapButton {
  position: absolute;
  bottom: 20px;
  right: 20px;
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
