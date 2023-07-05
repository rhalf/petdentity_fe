<template>
  <v-container>
    <v-row dense class="mt-8">
      <v-col class="d-flex align-center justify-center">
        <Card link @click="loginHandler" color="primary">
          <v-img :src="img01" />

          <div class="pa-2 bg-black">
            <Logo
              :width="480"
              :aspect-ratio="10 / 2"
              position="horizontal"
              class="text-center"
            />
          </div>
          <div class="mt-10"></div>
        </Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Card from "@/components/common/Card.vue";
import Logo from "@/components/common/Logo.vue";

import img01 from "@/assets/images/pets/01.jpg";

import { useRouter } from "vue-router";
const router = useRouter();

const loginHandler = () => {
  router.push({ name: "SessionLogin" });
};
</script>
