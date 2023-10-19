<template>
  <v-container>
    <v-row dense class="mt-5">
      <v-col align="start">
        <Label title class="text-primary"> Log In </Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Label>
          Don't have an account?
          <Anchor @click="signupHandler">Sign up</Anchor>
          or
          <Anchor @click="forgotHandler">Forgot?</Anchor>
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
          <v-row dense class="mt-3">
            <v-col>
              <TextField
                name="password"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                placeholder="Password"
                prependInnerIcon="mdi-lock"
                type="password"
              />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block type="submit" size="large">Login</Button>
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

import { signIn, signOut } from "@/api/session";
import { getDescription } from "@/plugins/firebase/error-codes";

import { useField, useForm } from "vee-validate";
import { schema } from "./validationSchema";
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const email = useField("email");
const password = useField("password");

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

//router
import { useRouter } from "vue-router";
const router = useRouter();

const signupHandler = () => {
  router.push({ name: "SessionSignup" });
};
const forgotHandler = () => {
  router.push({ name: "SessionForgot" });
};

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

//onSubmitHandler
const onSubmitHandler = handleSubmit(async (values) => {
  try {
    start();
    const result = await signIn(values.email, values.password);

    if (!result.user.emailVerified) {
      await signOut();
      show("error", "You must verify your email first!");
    } else {
      await router.push({ name: "UserDashboard" });
    }
  } catch (error) {
    const description = await getDescription(error.code);
    show("error", description);
  } finally {
    stop();
  }
});

const searchHandler = () => {
  router.push({ name: "SearchPetsDashboard" });
};
</script>
