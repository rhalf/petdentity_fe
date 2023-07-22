<template>
  <Panel
    title="Profile"
    label="profile"
    icon="mdi-paw"
    min-height="320"
    v-if="pet"
  >
    <Sheet>
      <v-row>
        <v-col align="start">
          <Label text class="text-primary"> Privacy </Label>
          <Label text> {{ pet.privacy || "-" }}</Label>
        </v-col>

        <v-col align="start">
          <Label text class="text-primary"> Condition </Label>
          <Label text> {{ pet.condition || "-" }}</Label>
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
          <Label text class="text-primary"> Coat </Label>
          <Label text> {{ pet.coat || "-" }} </Label>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col align="end" cols="0" md=""></v-col>
        <v-col align="end" cols="12" md="auto">
          <Button text block @click="updateHandler"> Update </Button>
        </v-col>
      </v-row>
    </Sheet>

    <DialogPetView v-model="dialogPetView" :pet="pet" @done="emit('done')" />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import Sheet from "@/components/common/Sheet.vue";

import DialogPetView from "@/components/dialogs/pet/DialogPetView.vue";

const dialogPetView = ref(false);

import { getAge, toStringAge } from "@/utils/vue";

import { toRefs, ref } from "vue";

const emit = defineEmits(["done"]);
const props = defineProps({ modelValue: Object });

const propsRef = toRefs(props);

const pet = propsRef.modelValue;

const updateHandler = () => {
  dialogPetView.value = true;
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
