<template>
  <v-row dense :class="xs ? null : 'mt-10'">
    <v-col class="d-flex align-center justify-center">
      <Card :width="420" class="pa-3" :height="xs ? '100vh' : null">
        <v-row class="mt-8">
          <v-col class="d-flex align-center justify-center">
            <Logo :width="100" :aspect-ratio="7 / 9" position="vertical" class="text-center" />
          </v-col>
        </v-row>

        <v-card-title class="text-primary mt-5"> Log in </v-card-title>

        <v-card-subtitle>
          Don't have an account?
          <Anchor class="text-primary" @click="signupHandler">Sign up</Anchor>
          or
          <Anchor class="text-primary" @click="forgotHandler">Forgot?</Anchor>
        </v-card-subtitle>

        <v-card-text class="text-primary mt-5">
          <v-form @submit="onSubmitHandler">
            <v-row>
              <v-col>
                <TextField
                  name="email"
                  v-model="email"
                  placeholder="Email"
                  density="comfortable"
                  prependInnerIcon="mdi-account"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <TextField
                  name="password"
                  v-model="password"
                  placeholder="Password"
                  density="comfortable"
                  prependInnerIcon="mdi-lock"
                  type="password"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="text-primary pa-0 ma-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <Button block color="primary" @click="loginHandler">Login</Button>
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

import { ref, watch } from 'vue'

const email = ref()
const password = ref()

import { useForm } from 'vee-validate'

const { handleSubmit } = useForm()
const onSubmitHandler = handleSubmit((values) => {
  console.log(values)
  show('success', 'asw')
})

import { useDisplay } from 'vuetify'
const { xs } = useDisplay()
watch(xs, (current) => {
  console.log(current)
})

import { useSnackbarStore } from '@/stores/snackbar'
const { show } = useSnackbarStore()

//router
import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = () => {
  onSubmitHandler()
}
const signupHandler = () => {
  router.push({ name: 'SessionSignup' })
}
const forgotHandler = () => {
  router.push({ name: 'SessionForgot' })
}
</script>
