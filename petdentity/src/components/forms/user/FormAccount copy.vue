<template>
  <v-row v-if="user" class="mt-5">
    <v-col cols="12" md="6">
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

      <Label text class="text-primary mt-5">
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

      <Label text class="text-primary mt-5">
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
            ({{ getAge(user.profile.birthDate) }} years)
          </Label>
        </v-col>
      </v-row>
      <DialogDate v-model="dialogDate" v-model:date="user.profile.birthDate" />

      <Label text class="text-primary mt-5">
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
        {{ user.profile.address.province }}, {{ user.profile.address.region }},
        {{ user.profile.address.country }},
        {{ user.profile.address.zipcode }}
      </Label>

      <DialogAddress v-model="dialogAddress" :address="user.profile.address" />
    </v-col>
    <v-col cols="12" md="6">
      <div class="text-center">
        <FileInput
          id="fileUpload"
          ref="file"
          v-show="false"
          v-model="imagePath"
        />
        <Avatar :src="user.profile.photoUrl" @click="photoHandler" size="150" />
      </div>

      <v-row dense class="mt-5">
        <v-col cols="12" md="">
          <Label text class="text-primary">ID</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text>{{ user.id }}</Label>
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" md="">
          <Label text class="text-primary">Email</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text>{{ user.email }}</Label>
        </v-col>
      </v-row>

      <!-- <v-row dense class="mt-2">
        <v-col cols="12" md="">
          <Label text class="text-primary">Verified</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text> {{ user.emailVerified ? "Yes" : "No" }}</Label>
        </v-col>
      </v-row> -->

      <v-row dense class="mt-2">
        <v-col cols="12" md="">
          <Label text class="text-primary">Status</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text> {{ user.status }} </Label>
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" md="">
          <Label text class="text-primary">Roles</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Chip
            class="ma-1"
            color="green"
            variant="flat"
            v-for="(role, index) in user.roles"
            :key="index"
          >
            <Label text medium> {{ role }}</Label>
          </Chip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <Button @click="saveHandler" :loading="isLoading" block class="mt-5">
    Save
  </Button>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";
import Label from "@/components/common/Label.vue";
import Chip from "@/components/common/Chip.vue";
import FileInput from "@/components/common/FileInput.vue";
import Avatar from "@/components/common/Avatar.vue";

import DialogAddress from "@/components/dialogs/address/DialogAddress.vue";
import DialogName from "@/components/dialogs/name/DialogName.vue";
import DialogDate from "@/components/dialogs/date/DialogDate.vue";
import DialogGender from "@/components/dialogs/gender/DialogGender.vue";

import { toStringDate, getAge } from "@/utils/vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { update } from "@/api/user";

import { uploadOwnerProfile } from "@/api/photo";
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
    const result = await uploadOwnerProfile(user.value.uid, current);
    emit("upload", result);
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
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
