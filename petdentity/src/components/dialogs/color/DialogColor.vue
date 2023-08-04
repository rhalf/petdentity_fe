<template>
  <Dialog v-model="dialog" :width="420" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black">Color</Label>
      </v-card-title>
      <v-card-text>
        <Color v-model="color" />
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
import Color from "@/components/pickers/Color.vue";
import { computed, toRefs } from "vue";
import { useModel, syncProp } from "@/utils/vue";

const emit = defineEmits(["update:modelValue", "update:color"]);
const props = defineProps({ modelValue: Boolean, color: String });
const propsRef = toRefs(props);

const dialog = computed(useModel(propsRef, emit, "modelValue"));
const color = computed(syncProp(propsRef, emit, "color"));

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
