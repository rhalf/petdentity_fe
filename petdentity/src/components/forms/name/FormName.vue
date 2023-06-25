<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="">
        <Label class="text-primary"> Prefix </Label>

        <TextField v-model="name.prefix" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4">
        <Label class="text-primary"> First </Label>
        <TextField v-model="name.first" />
      </v-col>

      <v-col cols="12" md="4">
        <Label class="text-primary"> Middle </Label>
        <TextField v-model="name.middle" />
      </v-col>

      <v-col cols="12" md="4">
        <Label class="text-primary"> Last </Label>

        <TextField v-model="name.last" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="">
        <Label class="text-primary"> Suffix </Label>

        <TextField v-model="name.suffix" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from '@/components/common/Label.vue'
import TextField from '@/components/common/TextField.vue'

import { computed, onMounted, reactive, ref, watch } from 'vue'

const emit = defineEmits(['upload'])
const props = defineProps({
  modelValue: Object
})

const name = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style></style>
