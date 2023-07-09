<template>
  <Dialog :width="640">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black">Date</Label>
      </v-card-title>
      <v-card-text>
        <v-row dense class="mt-3">
          <v-col> <Label text class="text-primary">Date</Label></v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <Date v-model="date" />
          </v-col>
        </v-row>
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
import Date from "@/components/pickers/Date.vue";
import { computed } from "vue";

const props = defineProps({ date: String });
const emit = defineEmits(["update:modelValue", "update:date"]);

const date = computed({
  get() {
    return props.date;
  },
  set(value) {
    emit("update:date", value);
  },
});

const closeHandler = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
