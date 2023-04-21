<template>
  <v-row dense :class="xs ? null : 'mt-10'">
    <v-col class="d-flex align-center justify-center">
      <Card :width="420" class="pa-3" :height="xs ? '100vh' : null">
        <v-row class="mt-8">
          <v-col class="d-flex align-center justify-center">
            <Logo :width="100" :aspect-ratio="7 / 9" position="vertical" class="text-center" />
          </v-col>
        </v-row>

        <v-card-title class="text-primary mt-5"> Sign up </v-card-title>

        <v-card-subtitle>
          Already have an account?
          <Anchor class="text-primary" @click="loginHandler">Log in</Anchor>
          or
          <Anchor class="text-primary" @click="forgotHandler">Forgot?</Anchor>
        </v-card-subtitle>

        <v-card-text class="text-primary mt-5">
          <v-row>
            <v-col>
              <TextField v-model="email" placeholder="Email" prependInnerIcon="mdi-account" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <TextField
                v-model="password1"
                placeholder="Password"
                density="comfortable"
                prependInnerIcon="mdi-lock"
                type="password"
                :rules="[required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <TextField
                v-model="password2"
                placeholder="Reenter password"
                density="comfortable"
                prependInnerIcon="mdi-lock"
                type="password"
                :rules="[required]"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="text-primary pa-0 ma-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <Button block color="primary" @click="signUpHandler" :disabled="!isValid">
                  Sign Up
                </Button>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <Button block variant="outlined">Scan Now</Button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </Card>
    </v-col>
  </v-row>
</template>

<script setup>
import Card from '@/components/common/Card.vue'
import Logo from '@/components/common/Logo.vue'
import TextField from '@/components/common/TextField.vue'
import Button from '@/components/common/Button.vue'
import Anchor from '@/components/common/Anchor.vue'

import { required } from '@/mixins/validator'

import { signUp, emailVerification } from '@/api/session'

import { ref, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'

const email = ref('rhalfcaacbay@gmail.com')
const password1 = ref('12345678')
const password2 = ref('12345678')

const { xs } = useDisplay()
watch(xs, (current) => {
  console.log(current)
})

const isValid = computed(() => {
  if (password1.value == null) return false
  if (password1.value.length < 6) return false
  if (password1.value === password2.value) return true
  return false
})

import { useSnackbarStore } from '@/stores/snackbar'
const { show } = useSnackbarStore()

import { useProgressLineStore } from '@/stores/progress-line'
const { on, off } = useProgressLineStore()
const signUpHandler = () => {
  on()
  signUp(email.value, password1.value)
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
}

//router
import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = () => {
  router.push({ name: 'SessionLogin' })
}
const forgotHandler = () => {
  router.push({ name: 'SessionForgot' })
}
</script>
