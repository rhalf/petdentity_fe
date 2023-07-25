<template>
  <v-slide-group v-model="model" selected-class="bg-success">
    <v-slide-group-item
      v-for="(partner, index) in partners"
      :key="index"
      v-slot="{ isSelected, toggle, selectedClass }"
    >
      <Card
        color="grey-lighten-1"
        :class="['ma-2', selectedClass]"
        height="120"
        width="240"
        @click="toggle"
      >
        <div class="d-flex fill-height align-center justify-center">
          <v-scale-transition>
            <Image :src="partner.src" cover />
          </v-scale-transition>
        </div>
      </Card>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script setup>
import { ref } from "vue";
import { partners } from "./data";

import Card from "@/components/common/Card.vue";
import Image from "@/components/common/Image.vue";

const model = ref();
</script>

<style scoped></style>
