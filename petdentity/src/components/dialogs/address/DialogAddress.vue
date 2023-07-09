<template>
  <Dialog :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4" expand>
        <Label header medium class="text-black">Address</Label>
      </v-card-title>
      <v-card-text>
        <FormAddress v-model="props.address" />
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
import FormAddress from "@/components/forms/address/FormAddress.vue";

const props = defineProps({ address: Object });
const emit = defineEmits(["update:modelValue"]);

const closeHandler = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
