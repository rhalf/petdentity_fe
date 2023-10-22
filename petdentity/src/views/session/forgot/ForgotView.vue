<template>
  <v-container>
    <v-row dense class="mt-5">
      <v-col align="start">
        <Label title class="text-primary"> Forgot </Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Label text>
          Don't have an account?
          <Anchor @click="loginHandler">Login</Anchor>
          or
          <Anchor @click="signupHandler">Signup?</Anchor>
        </Label>
      </v-col>
    </v-row>

    <v-form v-model="form" @submit.prevent="onSubmitHandler" validate-on="input">

      <v-row dense>
        <v-col align="start">
          <v-row dense class="mt-3">
            <v-col>
              <TextField name="email" v-model="email" placeholder="Email" prependInnerIcon="mdi-account" type="email"
                :rules="[validation.required, validation.email]" />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block type="submit" size="large">Forgot</Button>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <Button block variant="outlined" size="large" @click="searchHandler">
            Search Pet
          </Button>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import Logo from "@/components/common/Logo.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import Anchor from "@/components/common/Anchor.vue";

import { ref } from "vue";
import validation from "@/utils/validation";

import { useDisplay } from "vuetify";
const { xs } = useDisplay();

import { passwordResetEmail } from "@/api/session";

const email = ref();
const form = ref();

//router
import { useRouter } from "vue-router";
const router = useRouter();

const loginHandler = () => {
  router.push({ name: "SessionLogin" });
};
const signupHandler = () => {
  router.push({ name: "SessionSignup" });
};

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

//onSubmitHandler
const onSubmitHandler = async (event) => {
  if (!form.value) return;
  try {
    start();
    const result = await passwordResetEmail(email.value);
    show("success", `Password recovery has been sent to this email: ${result}`);
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
};

const searchHandler = () => {
  router.push({ name: "SearchPetsDashboard" });
};
</script>
