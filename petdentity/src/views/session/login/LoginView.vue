<template>
  <v-layout full-height>
    <v-row dense>
      <v-col align="center" align-self="center">
        <Card>
          <v-row dense>
            <v-col cols="8" v-if="!xs"> <Image /> </v-col>
            <v-col>
              <v-form @submit.prevent="onSubmitHandler">
                <v-row dense class="mt-5">
                  <v-col align="center">
                    <Logo :width="150" :aspect-ratio="7 / 9" position="vertical" />
                  </v-col>
                </v-row>

                <v-card-title class="text-primary mt-5"> Log in </v-card-title>

                <v-card-subtitle>
                  Don't have an account?
                  <Anchor @click="signupHandler">Sign up</Anchor>
                  or
                  <Anchor @click="forgotHandler">Forgot?</Anchor>
                </v-card-subtitle>

                <v-card-text class="text-primary mt-5">
                  <v-row>
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
                  <v-row>
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
                </v-card-text>

                <v-card-actions class="text-primary pa-0 ma-0">
                  <v-container>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <Button type="submit">Login</Button>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <Button variant="outlined">Scan Now</Button>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </Card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script setup>
import Image from '@/components/images/Image01.vue'
import Logo from '@/components/common/Logo.vue'

import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import TextField from '@/components/common/TextField.vue'
import Anchor from '@/components/common/Anchor.vue'

import { useDisplay } from 'vuetify'
const { xs } = useDisplay()
// import { ref, watch } from 'vue'

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
