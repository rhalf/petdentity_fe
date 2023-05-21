<template>
  <v-row dense class="mt-8">
    <v-col class="d-flex align-center justify-center">
      <Card min-width="640">
        <v-img :src="img01" />

        <div class="ma-2">
          <Logo :width="640" :aspect-ratio="10 / 2" position="horizontal" class="text-center" />
        </div>

        <div class="ma-4">
          <Button color="primary" variant="elevated" block @click="loginHandler"> Log In</Button>
        </div>
      </Card>
    </v-col>
  </v-row>
</template>

<script setup>
import Sheet from '@/components/common/Sheet.vue'
import Card from '@/components/common/Card.vue'
import Logo from '@/components/common/Logo.vue'
import Button from '@/components/common/Button.vue'

import img01 from '@/assets/images/pets/01.jpg'

import { useRouter } from 'vue-router'
const router = useRouter()

const loginHandler = () => {
  router.push({ name: 'SessionLogin' })
}
</script>
