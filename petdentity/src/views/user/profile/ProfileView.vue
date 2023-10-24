<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col>
          <Label title class="text-primary"> Profile </Label>
        </v-col>
      </v-row>
    </Sheet>

    <v-row dense class="mt-4">
      <v-col>
        <FormUserView v-model="user" />
      </v-col>
    </v-row>

    <v-row dense class="mt-4">
      <v-col class="text-right">
        <Button @click="dialogUserUpdate = true"> Update </Button>
      </v-col>
    </v-row>

    <DialogUserUpdate v-model="dialogUserUpdate" v-model:user="user" />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import FormUserView from "@/components/forms/user/FormUserView.vue";
import DialogUserUpdate from "@/components/dialogs/user/DialogUserUpdate.vue";

import { ref, inject } from "vue";
const dialogUserUpdate = ref(false);

// import { useUserStore } from "@/store/user";
// const userStore = useUserStore();

// import { storeToRefs } from "pinia";
// const { user } = storeToRefs(userStore);

const user = inject("user");
</script>

<style></style>
