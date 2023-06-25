<template>
  <Dialog :width="1024">
    <Card>
      <v-card-title class="bg-primary pa-3">
        <Label header class="text-black">Name</Label>
      </v-card-title>
      <v-card-text>
        <FormName v-model="props.name" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-2 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="closeHandler">Ok</Button>
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
import FormName from "@/components/forms/name/FormName.vue";

const props = defineProps({ name: Object });
const emit = defineEmits(["update:modelValue"]);

const closeHandler = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
