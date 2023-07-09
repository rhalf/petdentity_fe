<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4" expand>
        <Label header medium class="text-black"> Update Address </Label>
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

import { update } from "@/api/address";
import { useModel, syncProp } from "@/utils/vue";
import { ref, toRefs, computed } from "vue";

const props = defineProps({ modelValue: Boolean, address: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const address = computed(syncProp(propsRef, emit, "address"));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const result = await update(address.value);
    show("success", "Updated an address!");
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
