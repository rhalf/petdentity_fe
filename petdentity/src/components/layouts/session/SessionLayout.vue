<template>
  <v-app>
    <v-main>
      <ProgressLine
        :indeterminate="progressLine.status"
        :visible="progressLine.status"
      />
      <router-view v-slot="{ Component }">
        <v-layout full-height>
          <v-row dense>
            <v-col align="center" align-self="center">
              <Card>
                <v-row dense>
                  <v-col v-if="!xs">
                    <Image />
                  </v-col>
                  <v-col :cols="xs ? 12 : 4">
                    <Sheet :min-height="700">
                      <v-row dense class="mt-3">
                        <v-col align="center">
                          <Logo
                            :width="150"
                            :aspect-ratio="7 / 9"
                            position="vertical"
                          />
                        </v-col>
                      </v-row>
                      <v-fade-transition leave-absolute :mode="'out-in'">
                        <component :is="Component" />
                      </v-fade-transition>
                    </Sheet>
                  </v-col>
                </v-row>
              </Card>
            </v-col>
          </v-row>
        </v-layout>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { xs, sm } = useDisplay();

import ProgressLine from "@/components/common/ProgressLine.vue";
import { useProgressLineStore } from "@/store/progress-line";
const progressLine = useProgressLineStore();
const { start, stop } = useProgressLineStore();

import Sheet from "@/components/common/Sheet.vue";
import Card from "@/components/common/Card.vue";
import Image from "@/components/images/Image01.vue";
import Logo from "@/components/common/Logo.vue";

import { onMounted } from "vue";

onMounted(() => {
  start();

  stop();
});
</script>
