<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add Unit </Label>
      </v-card-title>
      <v-card-text>
        <FormUnit
          v-model="unit"
          :option="[
            'uid',
            'unitType',
            'formType',
            'status',
            'applicationDate',
            'pet',
            'owner',
            'veterinarian',
            'government',
          ]"
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
          </v-col>
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
import FormUnit from "@/components/forms/unit/FormUnit.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { create } from "@/api/unit";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const unit = ref({
  // name: "Dog",
  // type: "Mammal",
  // breeds: [
  //   "Dobermann",
  //   "Shih Tzu ",
  //   "German Shepherd",
  //   "Siberian Husky",
  //   "Golden Retriever",
  //   "Labrador Retriever",
  // ],
});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const docRef = await create(unit.value);
    emit("done");
    show("success", "Added an unit!");
    unit.value = {};
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
