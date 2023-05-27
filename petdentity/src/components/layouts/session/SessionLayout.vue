<template>
  <v-app>
    <v-main>
      <ProgressLine :indeterminate="progressLine.status" :visible="progressLine.status" />

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
import { useDisplay } from 'vuetify'
const { xs, sm } = useDisplay()

import ProgressLine from '@/components/common/ProgressLine.vue'

import Sheet from '@/components/common/Sheet.vue'
import Card from '@/components/common/Card.vue'
import Image from '@/components/images/Image01.vue'

import { useProgressLineStore } from '@/stores/progress-line'
const progressLine = useProgressLineStore()

import { onMounted } from 'vue'

onMounted(() => {
  progressLine.on()
  progressLine.off()
})
</script>
