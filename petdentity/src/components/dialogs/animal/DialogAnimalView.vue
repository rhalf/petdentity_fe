<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> View Animal</Label>
      </v-card-title>
      <v-card-text>
        <FormAnimalView v-model="animal" />

        <Card class="mt-4 pa-4" variant="tonal">
          <SummaryBreeds v-model="animal" />
        </Card>
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />

          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">Close</Button>
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

import FormAnimalView from "@/components/forms/animal/FormAnimalView.vue";
import SummaryBreeds from "@/components/forms/breed/SummaryBreeds.vue";

import { useModel, syncProp } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean, animal: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:animal", "view"]);

const dialog = computed(useModel(propsRef, emit, "modelValue"));
const animal = computed(syncProp(propsRef, emit, "animal"));

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
