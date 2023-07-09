<template>
  <Dialog :width="640">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black">Gender</Label>
      </v-card-title>
      <v-card-text>
        <Gender v-model="gender" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-3 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="closeHandler">Okay</Button>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
  </Dialog>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import Label from "@/components/common/Label.vue";
import Dialog from "@/components/common/Dialog.vue";
import Card from "@/components/common/Card.vue";

import Gender from "@/components/pickers/Gender.vue";

import { computed, toRefs } from "vue";
import { syncProp } from "@/utils/vue";

const props = defineProps({ gender: Boolean });
const emit = defineEmits(["update:modelValue", "update:gender"]);
const propsRef = toRefs(props);

const gender = computed(syncProp(propsRef, emit, "gender"));

const closeHandler = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
