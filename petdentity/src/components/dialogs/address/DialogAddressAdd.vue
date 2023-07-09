<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4" expand>
        <Label header medium class="text-black">Add Address</Label>
      </v-card-title>
      <v-card-text>
        <FormAddress v-model="address" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-3 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
          </v-col>
          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">Cancel</Button>
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

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { create } from "@/api/address";
import { ref, toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const props = defineProps({ modelValue: Boolean, address: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const address = ref({});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const result = await create(address.value);
    show("success", "Added an address!");
    emit("done");
    dialog.value = false;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};
const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
