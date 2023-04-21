<template>
  <v-row dense :class="xs ? null : 'mt-10'">
    <v-col class="d-flex align-center justify-center">
      <Card :width="420" class="pa-3" :height="xs ? '100vh' : null">
        <v-row class="mt-8">
          <v-col class="d-flex align-center justify-center">
            <Logo :width="100" :aspect-ratio="7 / 9" position="vertical" class="text-center" />
          </v-col>
        </v-row>

        <v-card-title class="text-primary mt-5"> Forgot </v-card-title>

        <v-card-subtitle>
          Don't have an account?
          <Anchor class="text-primary" @click="loginHandler">Login</Anchor>
          or
          <Anchor class="text-primary" @click="signupHandler">Signup?</Anchor>
        </v-card-subtitle>

        <v-card-text class="text-primary mt-5">
          <v-row>
            <v-col>
              <TextField
                v-model="email"
                placeholder="Email"
                density="comfortable"
                prependInnerIcon="mdi-account"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="text-primary pa-0 ma-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <Button block color="primary" @click="loginHandler">Forgot</Button>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <Button block variant="outlined" @click="forgotHandler">Scan Now</Button>
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
import { useDisplay } from 'vuetify'

const email = ref('rhalf')
const password = ref('321321321')

const { xs } = useDisplay()

watch(xs, (current) => {
  console.log(current)
})

//router
import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = () => {
  router.push({ name: 'SessionLogin' })
}
const signupHandler = () => {
  router.push({ name: 'SessionSignup' })
}
</script>
