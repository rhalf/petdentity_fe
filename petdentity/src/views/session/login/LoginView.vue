<template>
  <v-container>
    <v-row dense class="mt-3">
      <v-col align="center">
        <Logo :width="150" :aspect-ratio="7 / 9" position="vertical" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Title class="text-primary text-left mt-5"> Log In </Title>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <SubTitle>
          Don't have an account?
          <Anchor @click="signupHandler">Sign up</Anchor>
          or
          <Anchor @click="forgotHandler">Forgot?</Anchor>
        </SubTitle>
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
              <Button type="submit" size="large">Login</Button>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Button variant="outlined" size="large">Scan Now</Button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Logo from '@/components/common/Logo.vue'

import Title from '@/components/common/Title.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import Button from '@/components/common/Button.vue'
import TextField from '@/components/common/TextField.vue'
import Anchor from '@/components/common/Anchor.vue'

import { signIn } from '@/api/session'

import { useField, useForm } from 'vee-validate'
import { schema } from './validationSchema'
const { handleSubmit } = useForm({
  validationSchema: schema
})

const email = useField('email')
const password = useField('password')

import { useSnackbarStore } from '@/stores/snackbar'
const { show } = useSnackbarStore()

//router
import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = async () => {}

const signupHandler = () => {
  router.push({ name: 'SessionSignup' })
}
const forgotHandler = () => {
  router.push({ name: 'SessionForgot' })
}

import { useProgressLineStore } from '@/stores/progress-line'
const { on, off } = useProgressLineStore()

//onSubmitHandler
const onSubmitHandler = handleSubmit((values) => {
  on()
  signIn(values.email, values.password)
    .then(() => {
      router.push({ name: 'UserDashboard' })
    })
    .catch(({ message }) => {
      show('error', message)
    })
    .finally(() => {
      off()
    })
})
</script>
