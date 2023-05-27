<template>
  <v-container>
    <v-row dense class="mt-3">
      <v-col align="center">
        <Logo :width="150" :aspect-ratio="7 / 9" position="vertical" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Title class="text-primary text-left mt-5"> Sign up </Title>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <SubTitle>
          Already have an account?
          <Anchor @click="loginHandler">Log in</Anchor>
          or
          <Anchor @click="forgotHandler">Forgot?</Anchor>
        </SubTitle>
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
              <Button :disabled="!isValid" type="submit" size="large">Sign Up</Button>
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

import { signUp, emailVerification } from '@/api/session'

import { ref, watch, computed } from 'vue'

import { useField, useForm } from 'vee-validate'
import { schema } from './validationSchema'
const { handleSubmit } = useForm({
  validationSchema: schema
})
const email = useField('email')
const password1 = useField('password1')
const password2 = useField('password2')

const isValid = computed(() => {
  if (password1.value.value == null) return false
  if (password1.value.value.length < 6) return false
  if (password1.value.value === password2.value.value) return true
  return false
})

import { useSnackbarStore } from '@/stores/snackbar'
const { show } = useSnackbarStore()

//router
import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = () => {
  router.push({ name: 'SessionLogin' })
}

const signUpHandler = () => {}

const forgotHandler = () => {
  router.push({ name: 'SessionForgot' })
}

import { useProgressLineStore } from '@/stores/progress-line'
const { on, off } = useProgressLineStore()

//onSubmitHandler
const onSubmitHandler = handleSubmit((values) => {
  on()
  signUp(values.email, values.password1)
    .then((userCredential) => {
      // Signed in
      emailVerification()
      show('success', 'Successful! Email verification will has been sent!')
      const user = userCredential.user
      console.log(user)
    })
    .catch(({ message }) => {
      show('error', message)
    })
    .finally(() => {
      off()
    })
})
</script>
