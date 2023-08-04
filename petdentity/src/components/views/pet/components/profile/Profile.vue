<template>
  <Panel
    title="Profile"
    label="profile"
    icon="mdi-paw"
    min-height="320"
    v-if="pet"
  >
    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> BirthDate </Label>
        <Label text> {{ pet.birthDate || "-" }}</Label>
      </v-col>

      <v-col align="start">
        <Label text class="text-primary"> Age </Label>
        <Label text> {{ toStringAge(getAge(pet.birthDate)) || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Weight </Label>
        <Label text> {{ pet.weight || "-" }} kg(s)</Label>
      </v-col>
      <v-col align="start">
        <Label text class="text-primary"> Height </Label>
        <Label text> {{ pet.height || "-" }} cm(s)</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Animal </Label>
        <Label text> {{ pet.animal?.name || "-" }}</Label>
      </v-col>

      <v-col align="start">
        <Label text class="text-primary"> Type </Label>
        <Label text> {{ pet.animal?.type || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Breed </Label>
        <Label text> {{ pet.breed || "-" }}</Label>
      </v-col>
      <v-col align="start">
        <Label text class="text-primary"> Gender </Label>
        <Label text> {{ pet.gender || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start" cols="12" md="6">
        <Label text class="text-primary"> Coat(Color) </Label>
        <Label text> {{ pet.coat || "-" }} </Label>
      </v-col>
      <v-col align="start" cols="12" md="6">
        <Label text class="text-primary"> Coat Remarks </Label>
        <Label text> {{ pet.coatRemarks || "-" }} </Label>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="start">
        <Label text class="text-primary"> Privacy </Label>
        <Label text> {{ pet.privacy || "-" }}</Label>
      </v-col>

      <v-col align="start">
        <Label text class="text-primary"> Pet Status </Label>
        <Label text> {{ pet.petStatus || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2" v-if="!readOnly">
      <v-spacer />
      <v-col class="d-flex align-center justify-end" cols="auto">
        <Button text @click="updateHandler"> Update </Button>
      </v-col>
    </v-row>

    <DialogPetView v-model="dialogPetView" :pet="pet" />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import Sheet from "@/components/common/Sheet.vue";

import DialogPetView from "@/components/dialogs/pet/DialogPetView.vue";
const dialogPetView = ref(false);

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { getAge, toStringAge } from "@/utils/vue";

import { toRefs, ref } from "vue";

const emit = defineEmits(["done"]);
const props = defineProps({ pet: Object, readOnly: Boolean });

const propsRef = toRefs(props);

const { readOnly, pet } = propsRef;

const updateHandler = () => {
  dialogPetView.value = true;
};
</script>

<style scoped></style>
