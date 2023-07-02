<template>
  <div v-if="user">
    <v-row dense class="mt-4">
      <v-col cols="12" class="text-center">
        <FileInput
          id="fileUpload"
          ref="file"
          v-show="false"
          v-model="imagePath"
        />
        <Avatar
          :src="user.profile.photoUrl"
          @click="photoHandler"
          size="200"
          :loading="isLoading"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-8">
      <v-col cols="12">
        <div class="bg-primary rounded pa-2">
          <Label header>Name</Label>
        </div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <FormName v-model="user.profile.name" />
      </v-col>
    </v-row>

    <v-row dense class="mt-4">
      <v-col cols="12">
        <div class="bg-primary rounded pa-2">
          <Label header>Gender</Label>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <FormGender v-model="user.profile.gender" />
      </v-col>
    </v-row>

    <v-row dense class="mt-4">
      <v-col cols="12">
        <div class="bg-primary rounded pa-2">
          <Label header>Birthdate</Label>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <FormDate v-model="user.profile.birthDate" />
      </v-col>
    </v-row>

    <v-row dense class="mt-4">
      <v-col cols="12">
        <div class="bg-primary rounded pa-2">
          <Label header>Address</Label>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <FormAddress v-model="user.profile.address" />
      </v-col>
    </v-row>

    <v-row dense class="mt-4">
      <v-col cols="12">
        <div class="bg-primary rounded pa-2">
          <Label header>Headline</Label>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <FormHeadline
          v-model="user.profile.headline"
          placeholder="Tell something!"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import FormHeadline from "@/components/forms/headline/FormHeadline.vue";
import Avatar from "@/components/common/Avatar.vue";
import FileInput from "@/components/common/FileInput.vue";
import FormName from "@/components/forms/name/FormName.vue";
import FormGender from "@/components/forms/gender/FormGender.vue";
import FormDate from "@/components/forms/date/FormDate.vue";
import FormAddress from "@/components/forms/address/FormAddress.vue";

import { computed, ref, toRefs, watch } from "vue";

import { uploadProfilePhoto } from "@/api/photo";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));

const isLoading = ref(false);
const file = ref();
const imagePath = ref();

const photoHandler = async () => {
  let fileUpload = document.getElementById("fileUpload");
  if (fileUpload != null) {
    await fileUpload.click();
  }
};

watch(imagePath, async (current) => {
  if (!current) return;
  try {
    isLoading.value = true;
    const photoUrl = await uploadProfilePhoto(user.value.id, current);
    user.value.profile.photoUrl = photoUrl;
  } catch (error) {
    show("error", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style></style>
