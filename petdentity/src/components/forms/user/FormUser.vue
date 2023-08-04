<template>
  <div v-if="user">
    <FileInput
      id="fileUpload"
      v-show="false"
      @update:modelValue="updateHandler"
    />

    <v-row dense class="mt-4">
      <v-col cols="12" class="text-center">
        <Avatar v-model="user.profile.photoUrl" :size="200" />
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
          <Label header>Mobile</Label>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <FormMobile v-model="user.profile.mobileNumber" />
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
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import FormName from "@/components/forms/name/FormName.vue";
import FormGender from "@/components/forms/gender/FormGender.vue";
import FormDate from "@/components/forms/date/FormDate.vue";
import FormMobile from "@/components/forms/mobile/FormMobile.vue";
import FormAddress from "@/components/forms/address/FormAddress.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { uploadOwnerProfile } from "@/api/photo";

import { useModel } from "@/utils/vue";
import { computed, toRefs, ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const isLoading = ref(false);
const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));

const clickHandler = async () => {
  let fileUpload = document.getElementById("fileUpload");
  if (fileUpload != null) await fileUpload.click();
};

const updateHandler = async (files) => {
  try {
    isLoading.value = true;

    const photoUrl = await uploadOwnerProfile(user.value.id, files);
    user.value.profile.photoUrl = photoUrl;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
