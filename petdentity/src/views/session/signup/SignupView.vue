<template>
  <v-container>
    <v-row dense class="mt-5">
      <v-col align="start">
        <Label title class="text-primary"> Sign up </Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Label text>
          Already have an account?
          <Anchor @click="loginHandler">Log in</Anchor>
          or
          <Anchor @click="forgotHandler">Forgot?</Anchor>
        </Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <v-form @submit.prevent="onSubmitHandler">
          <v-row dense class="mt-3">
            <v-col align="start">
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
          <v-row dense class="mt-3">
            <v-col>
              <TextField
                name="password1"
                v-model="password1.value.value"
                :error-messages="password1.errorMessage.value"
                placeholder="Password"
                prependInnerIcon="mdi-lock"
                type="password"
              />
            </v-col>
          </v-row>
          <v-row dense class="mt-3">
            <v-col>
              <TextField
                name="password2"
                v-model="password2.value.value"
                :error-messages="password2.errorMessage.value"
                placeholder="Retype password"
                prependInnerIcon="mdi-lock"
                type="password"
              />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block :disabled="!isValid" type="submit" size="large"
                >Sign Up</Button
              >
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
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import Anchor from "@/components/common/Anchor.vue";

import { signUp, emailVerification } from "@/api/session";

import { computed } from "vue";

import { useField, useForm } from "vee-validate";
import { schema } from "./validationSchema";
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const email = useField("email");
const password1 = useField("password1");
const password2 = useField("password2");

const isValid = computed(() => {
  if (password1.value.value == null) return false;
  if (password1.value.value.length < 6) return false;
  if (password1.value.value === password2.value.value) return true;
  return false;
});

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

//router
import { useRouter } from "vue-router";
const router = useRouter();

const loginHandler = () => {
  router.push({ name: "SessionLogin" });
};

const signUpHandler = () => {};

const forgotHandler = () => {
  router.push({ name: "SessionForgot" });
};

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

//onSubmitHandler
const onSubmitHandler = handleSubmit(async (values) => {
  try {
    start();
    // Signed up
    const result = await signUp(values.email, values.password1);
    // Email verification
    await emailVerification();
    show("success", "Successful! Email verification has been sent!");
    const user = result.user;
    console.log(user);
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});

const searchHandler = () => {
  router.push({ name: "SearchDashboard" });
};
</script>
