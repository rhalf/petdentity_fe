<template>
  <v-container>
    <Sheet class="bg-transparent">
      <v-row>
        <v-col>
          <Card link @click="loginHandler" color="primary" :width="undefined">
            <Image
              :src="image"
              :width="undefined"
              :aspect-ratio="14 / 8"
              cover
            />

            <div class="pa-2 bg-black">
              <Logo
                :width="1024"
                :aspect-ratio="12 / 1"
                position="horizontal"
                class="text-center"
              />
            </div>
            <div class="mt-4"></div>
          </Card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <Label header> Partners </Label>
          <Partners />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Card from "@/components/common/Card.vue";
import Image from "@/components/common/Image.vue";
import Label from "@/components/common/Label.vue";
import Logo from "@/components/common/Logo.vue";

import Partners from "@/components/views/partners/Partners.vue";

import image from "@/assets/images/pets/01.jpg";

import { useRouter } from "vue-router";
const router = useRouter();

const loginHandler = () => {
  router.push({ name: "SessionLogin" });
};
</script>
