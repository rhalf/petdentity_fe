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

    <v-form v-model="form" @submit.prevent="onSubmitHandler" validate-on="input">
      <v-row dense>
        <v-col align="start">
          <v-row dense class="mt-3">
            <v-col align="start">
              <TextField name="email" v-model="email" placeholder="Email" prependInnerIcon="mdi-account" type="email"
                :rules="[validation.required, validation.email]" />
            </v-col>
          </v-row>
          <v-row dense class="mt-3">
            <v-col>
              <TextField name="password1" v-model="password1" placeholder="Password" prependInnerIcon="mdi-lock"
                type="password" :rules="[validation.required]" />
            </v-col>
          </v-row>
          <v-row dense class="mt-3">
            <v-col>
              <TextField name="password2" v-model="password2" placeholder="Retype password" prependInnerIcon="mdi-lock"
                type="password" :rules="[
                  validation.required,
                  validation.match(password1, password2, 'password'),
                ]" />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block :disabled="!isValid" type="submit" size="large">Sign Up</Button>
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
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import Anchor from "@/components/common/Anchor.vue";

import { ref, computed } from "vue";
import validation from "@/utils/validation";

import { signUp, emailVerification } from "@/api/session";

const email = ref();
const password1 = ref();
const password2 = ref();
const form = ref();

const isValid = computed(() => {
  if (password1.value == null) return false;
  if (password1.value.length < 6) return false;
  if (password1.value === password2.value) return true;
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

const signUpHandler = () => { };

const forgotHandler = () => {
  router.push({ name: "SessionForgot" });
};

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

//onSubmitHandler
const onSubmitHandler = async (event) => {
  if (!form.value) return;
  try {
    start();
    // Signed up
    const result = await signUp(email.value, password1.value);
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
};

const searchHandler = () => {
  router.push({ name: "SearchPetsDashboard" });
};
</script>
