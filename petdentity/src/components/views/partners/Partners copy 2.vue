<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="(partner, index) in partners"
      :key="index"
    >
      <Card
        color="transparent"
        class="mx-2"
        height="200"
        @click="clickHandler(partner.url)"
      >
        <div class="d-flex fill-height align-center justify-center">
          <v-scale-transition>
            <Image :src="partner.src" cover />
          </v-scale-transition>
        </div>
      </Card>
    </v-col>
  </v-row>
</template>

<script setup>
import { partners } from "./data";

import Card from "@/components/common/Card.vue";
import Image from "@/components/common/Image.vue";

const clickHandler = (url) => {
  window.open(url);
};
</script>

<style scoped></style>
