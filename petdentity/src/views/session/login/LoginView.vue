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

    <v-form v-model="form" @submit.prevent="onSubmitHandler" validate-on="input">

      <v-row dense>
        <v-col align="start">
          <v-row dense class="mt-3">
            <v-col>
              <TextField name="email" v-model="email" placeholder="Email" prependInnerIcon="mdi-account" type="email"
                :rules="[validation.required, validation.email]" />
            </v-col>
          </v-row>
          <v-row dense class="mt-3">
            <v-col>
              <TextField name="password" v-model="password" placeholder="Password" prependInnerIcon="mdi-lock"
                type="password" :rules="[validation.required]" />
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col>
              <Button block type="submit" size="large">Login</Button>
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

import { ref } from "vue";
import validation from "@/utils/validation";

import { signIn, signOut } from "@/api/session";
import { getDescription } from "@/plugins/firebase/error-codes";

const email = ref();
const password = ref();
const form = ref();

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

// onSubmitHandler;
const onSubmitHandler = async (event) => {
  if (!form.value) return;
  try {
    start();
    const result = await signIn(email.value, password.value);

    if (!result.user.emailVerified) {
      await signOut();
      show("error", "You must verify your email first!");
    } else {
      await router.push({ name: "UserDashboard" });
    }
  } catch ({ code }) {
    const description = await getDescription(code);
    show("error", description);
  } finally {
    stop();
  }
};

const searchHandler = () => {
  router.push({ name: "SearchPetsDashboard" });
};
</script>
