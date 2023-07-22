<template>
  <v-container>
    <Sheet>
      <v-sheet height="200">
        <v-img :src="Wave" cover></v-img>
      </v-sheet>

      <v-row dense>
        <v-col class="text-center">
          <div class="overlapPhoto">
            <Avatar v-model="pet.photoUrl" :size="200" type="PET" />
            <Label class="mt-4" header>{{ pet.name }}</Label>
            <Label class="text-grey" text>{{ pet.id }}</Label>
          </div>
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" class="text-center">
          <Profile v-model="pet" />
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" class="text-center">
          <Contacts v-model="pet" />
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" class="text-center">
          <Vaccines v-model="pet" />
        </v-col>
      </v-row>

      <v-row dense class="mt-2">
        <v-col cols="12" class="text-center">
          <Units v-model="pet" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Avatar from "@/components/common/Avatar.vue";
import Label from "@/components/common/Label.vue";

import Contacts from "./components/contacts/Summary.vue";
import Profile from "./components/profile/Profile.vue";
import Vaccines from "./components/vaccines/Summary.vue";
import Units from "./components/units/Summary.vue";

import Wave from "./components/wave.svg";
// import { useSnackbarStore } from "@/store/snackbar";
// const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/pet";

import { ref, onMounted } from "vue";

const isLoading = ref(false);
const pet = ref({});

onMounted(async () => {
  await loadItem();
});

const loadItem = async () => {
  try {
    isLoading.value = true;
    pet.value = await get(route.params.id);
  } catch ({ message }) {
    console.log("error", message);
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
