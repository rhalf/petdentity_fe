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

    <v-row dense>
      <v-col align="start">
        <v-form @submit.prevent="onSubmitHandler">
          <v-row dense class="mt-3">
            <v-col>
              <TextField
                name="email"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                placeholder="Email"
                prependInnerIcon="mdi-account"
                type="email"
              />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block type="submit" size="large">Forgot</Button>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Button block variant="outlined" size="large" @click="searchHandler">
          Search Pet
        </Button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Logo from "@/components/common/Logo.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import Anchor from "@/components/common/Anchor.vue";

import { useDisplay } from "vuetify";
const { xs } = useDisplay();

import { passwordResetEmail } from "@/api/session";

import { useField, useForm } from "vee-validate";
import { schema } from "./validationSchema";
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const email = useField("email");

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
const onSubmitHandler = handleSubmit(async (values) => {
  try {
    start();
    const result = await passwordResetEmail(values.email);
    show("success", `Password recovery has been sent to this email: ${result}`);
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});

const searchHandler = () => {
  router.push({ name: "SearchPetsDashboard" });
};
</script>
