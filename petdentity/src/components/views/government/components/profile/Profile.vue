<template>
  <Panel
    title="Profile"
    label="profile"
    icon="mdi-shield-star"
    min-height="300"
    v-if="government"
  >
    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> ID </Label>
        <Label text>{{ government.id }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Email </Label>
        <Label text> {{ government.email || "-" }}</Label>
      </v-col>

      <v-col align="start">
        <Label text class="text-primary"> Mobile </Label>
        <Label text> {{ government.mobile || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Level </Label>
        <Label text> {{ government.level || "-" }}</Label>
      </v-col>

      <v-col align="start">
        <Label text class="text-primary"> Privacy </Label>
        <Label text> {{ government.privacy || "-" }}</Label>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col align="start">
        <Label text class="text-primary"> Address </Label>
        <Address v-model="government.address" />
      </v-col>
    </v-row>

    <v-row class="mt-2" v-if="!readOnly">
      <v-spacer />
      <v-col class="d-flex align-center justify-end" cols="auto">
        <Button text @click="updateHandler"> Update </Button>
      </v-col>
    </v-row>

    <DialogGovernmentView
      v-model="dialogGovernmentView"
      :government="government"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import Address from "@/components/views/address/Address.vue";

import DialogGovernmentView from "@/components/dialogs/government/DialogGovernmentView.vue";
const dialogGovernmentView = ref(false);

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { toRefs, ref } from "vue";

const emit = defineEmits(["done"]);
const props = defineProps({ government: Object, readOnly: Boolean });

const propsRef = toRefs(props);

const { readOnly, government } = propsRef;

const updateHandler = () => {
  dialogGovernmentView.value = true;
};
</script>

<style scoped></style>
