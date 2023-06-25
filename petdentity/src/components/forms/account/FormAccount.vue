<template>
  <v-row v-if="user" class="mt-5">
    <v-col cols="12" md="5">
      <div class="text-center">
        <FileInput
          id="fileUpload"
          ref="file"
          v-show="false"
          v-model="imagePath"
        />
        <Avatar :src="user.profile.photoUrl" @click="photoHandler" size="200" />
      </div>

      <v-row dense class="mt-5">
        <v-col cols="12" md="">
          <Label text class="text-primary">UID</Label>
        </v-col>
        <v-col cols="12" md="9"> {{ user.uid }} </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="">
          <Label text class="text-primary">Email</Label>
        </v-col>
        <v-col cols="12" md="9"> {{ user.email }} </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="">
          <Label text class="text-primary">Verified</Label>
        </v-col>
        <v-col cols="12" md="9">
          {{ user.emailVerified ? "Yes" : "No" }}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="">
          <Label text class="text-primary">Status</Label>
        </v-col>
        <v-col cols="12" md="9"> {{ user.status }} </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="">
          <Label text class="text-primary">Roles</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Chip
            color="primary mr-1"
            v-for="(role, index) in user.roles"
            :key="index"
          >
            {{ role }}
          </Chip>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="7">
      <Label text class="text-primary">
        Name
        <ButtonIcon
          icon="mdi-pencil"
          class="text-primary"
          @click="dialogName = true"
        />
      </Label>

      <Label text class="text-grey"> {{ user.profile.name.prefix }} </Label>
      <Label header>
        {{ user.profile.name.first }}
        {{ user.profile.name.middle }}
        {{ user.profile.name.last }},
        {{ user.profile.name.suffix }}
      </Label>

      <DialogName v-model="dialogName" :name="user.profile.name" />

      <div class="mt-5">
        <Label text class="text-primary">
          Gender
          <ButtonIcon
            icon="mdi-pencil"
            class="text-primary"
            @click="dialogGender = true"
          />
        </Label>

        <v-row dense>
          <v-col>
            <Label text> {{ user.profile.gender ? "Male" : "Female" }} </Label>
          </v-col>
        </v-row>

        <DialogGender
          v-model="dialogGender"
          v-model:gender="user.profile.gender"
        />
      </div>

      <div class="mt-5">
        <Label text class="text-primary">
          Birth Date
          <ButtonIcon
            icon="mdi-pencil"
            class="text-primary"
            @click="dialogDate = true"
          />
        </Label>

        <v-row dense>
          <v-col>
            <Label text>
              {{ toStringDate(user.profile.birthDate) }}
              ({{ getBirthDate(user.profile.birthDate) }} years)
            </Label>
          </v-col>
        </v-row>
        <DialogDate
          v-model="dialogDate"
          v-model:date="user.profile.birthDate"
        />
      </div>

      <div class="mt-5">
        <Label text class="text-primary">
          Address
          <ButtonIcon
            icon="mdi-pencil"
            class="text-primary"
            @click="dialogAddress = true"
          />
        </Label>

        <Label text>
          {{ user.profile.address.exact }}
          {{ user.profile.address.division }}
        </Label>
        <Label caption class="text-grey">
          {{ user.profile.address.barangay }}, {{ user.profile.address.city }},
          {{ user.profile.address.province }},
          {{ user.profile.address.region }}, {{ user.profile.address.country }},
          {{ user.profile.address.zipcode }}
        </Label>
      </div>

      <DialogAddress v-model="dialogAddress" :address="user.profile.address" />

      <div class="mt-5">
        <Button @click="saveHandler" :loading="isLoading" block>Save</Button>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import Label from "@/components/common/Label.vue";
import Chip from "@/components/common/Chip.vue";
import FileInput from "@/components/common/FileInput.vue";
import Avatar from "@/components/common/Avatar.vue";

import DialogAddress from "@/components/dialog/address/DialogAddress.vue";
import DialogName from "@/components/dialog/name/DialogName.vue";
import DialogDate from "@/components/dialog/date/DialogDate.vue";
import DialogGender from "@/components/dialog/gender/DialogGender.vue";

import { toStringDate, getBirthDate } from "@/utils/vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { update } from "@/api/user";

import { uploadProfilePhoto } from "@/api/photo";
import { toRefs } from "vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));

const dialogAddress = ref(false);
const dialogName = ref(false);
const dialogGender = ref(false);
const dialogDate = ref(false);

const isLoading = ref(false);

onMounted(() => {});

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
    const result = await uploadProfilePhoto(user.value.uid, current);
    emit("upload", result);
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading = false;
  }
});

const saveHandler = async () => {
  try {
    isLoading.value = true;
    await update(user.value);
    show("success", "Saved successfully!");
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
